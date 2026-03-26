'use strict';
/**
 * 宜搭 ER 图数据采集脚本
 *
 * 用法：
 *   node skills/yida-er-diagram/scripts/fetch-forms.js <appType>
 *   例：node skills/yida-er-diagram/scripts/fetch-forms.js APP_O7104UDII29RRRIKYBIO
 *
 * 输出到 .cache/new-er-graph-data.json
 */

const { httpGet } = require('/usr/local/lib/node_modules/openyida/lib/core/utils');
const fs = require('fs');
const path = require('path');

// 从命令行参数读取 appType，不再硬编码
const appType = process.argv[2];
if (!appType) {
  console.error('❌ 请传入 appType 参数，例：node fetch-forms.js APP_O7104UDII29RRRIKYBIO');
  process.exit(1);
}

const cache = JSON.parse(fs.readFileSync('.cache/cookies.json', 'utf8'));

// 从 cookies 中提取 CSRF Token
let csrfToken = '';
for (const c of cache.cookies) {
  if (c.name === 'tianshu_csrf_token') { csrfToken = c.value; break; }
}

// baseUrl 必须带 https:// 前缀
const baseUrl = 'https://' + (cache.domain || 'www.aliwork.com');

// i18n 对象取中文名（表单名、字段名均为 i18n 对象）
function getName(val) {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') return val.zh_CN || val.value || val.en_US || '';
  return String(val);
}

// 从 V5 schema 的 componentsTree 中递归提取字段和关联关系
function extractFromV5Schema(formUuid, componentsTree) {
  const fields = [];
  const edges = [];

  // 布局组件不是表单字段，跳过
  const LAYOUT_COMPONENTS = new Set([
    'RootHeader', 'ColumnsLayout', 'Tab', 'TabItem', 'FormContainer',
    'Block', 'Divider', 'Space', 'Card', 'Collapse', 'CollapsePanel',
    'StepForm', 'StepFormItem', 'Section', 'Form',
  ]);

  function walkChildren(children) {
    if (!children || !Array.isArray(children)) return;
    children.forEach(node => {
      const componentName = node.componentName || '';
      const props = node.props || {};

      if (!LAYOUT_COMPONENTS.has(componentName) && componentName) {
        const label = getName(props.label) || getName(props.title) || '';
        if (label) fields.push({ label, componentName });

        // 关联表单字段：关联目标在 props.associationForm.formUuid
        if (componentName === 'AssociationFormField' && props.associationForm && props.associationForm.formUuid) {
          edges.push({
            sourceFormUuid: formUuid,
            targetFormUuid: props.associationForm.formUuid,
            fieldLabel: getName(props.label) || '',
            relationType: 'association',
          });
        }

        // 关联其他表单数据：dataSourceType === 'relate'
        // 目标表单 UUID 在 defaultDataSource.formula 里（必须是字符串才处理）
        // 真实格式（来自 schema 实测）：@{{FORM-xxx/fieldId}}
        if (props.dataSourceType === 'relate' && props.defaultDataSource) {
          const formula = props.defaultDataSource.formula;
          if (typeof formula === 'string' && formula) {
            const matchRelate = formula.match(/@\{\{(FORM-[A-Z0-9]+)\//);
            if (matchRelate && matchRelate[1]) {
              edges.push({
                sourceFormUuid: formUuid,
                targetFormUuid: matchRelate[1],
                fieldLabel: getName(props.label) || '',
                relationType: 'data-source',
              });
            }
          }
        }

        // 数据联动（字段的选项列表由另一个字段的值动态过滤）：
        // props.dataSourceLinkage.data.formId 是被联动的数据来源表单
        if (props.dataSourceLinkage && props.dataSourceLinkage.data && props.dataSourceLinkage.data.formId) {
          edges.push({
            sourceFormUuid: formUuid,
            targetFormUuid: props.dataSourceLinkage.data.formId,
            fieldLabel: getName(props.label) || '',
            relationType: 'linkage',
          });
        }

        // 数据联动（旧版 linkage 结构）
        if (props.linkage && props.linkage.relateFormUuid) {
          edges.push({
            sourceFormUuid: formUuid,
            targetFormUuid: props.linkage.relateFormUuid,
            fieldLabel: getName(props.label) || '',
            relationType: 'linkage',
          });
        }
      }

      // 递归子节点
      if (node.children) walkChildren(node.children);
      if (props && props.items) walkChildren(props.items);
    });
  }

  componentsTree.forEach(root => walkChildren(root.children || []));
  return { fields, edges };
}

async function main() {
  // Step 1: 获取表单列表
  // API: GET /{appType}/query/app/getAppPlatFormParam.json（GET 请求，需带 _csrf_token）
  console.log('Step 1: 获取表单列表...');
  const listPath = '/' + appType + '/query/app/getAppPlatFormParam.json'
    + '?_api=nattyFetch&_mock=false'
    + '&_csrf_token=' + encodeURIComponent(csrfToken)
    + '&_locale_time_zone_offset=28800000'
    + '&pageIndex=1&pageSize=50'
    + '&_stamp=' + Date.now();

  const listResult = await httpGet(baseUrl, listPath, null, cache.cookies);
  if (!listResult.success || !listResult.content || !listResult.content.formNavigationList) {
    console.error('获取表单列表失败:', JSON.stringify(listResult).slice(0, 300));
    process.exit(1);
  }

  // 响应结构：listResult.content.formNavigationList[]
  // 每项包含：formUuid（真实表单UUID）、relateFormUuid（导航节点UUID，不可靠）、title（i18n对象）、formType
  // 注意：必须用 f.formUuid，不能用 f.relateFormUuid！
  // relateFormUuid 是导航菜单节点的 UUID，对于"管理页面"等列表页，它指向的是列表页自身而非表单。
  // 同一个表单可能在导航里出现多次（如同时出现在"销售管理"和"回收站"分组），需要按 formUuid 去重。
  const seenFormUuids = new Set();
  const forms = listResult.content.formNavigationList
    .filter(f => f.formUuid && ['receipt', 'process', 'virtualView'].includes(f.formType) && !seenFormUuids.has(f.formUuid) && seenFormUuids.add(f.formUuid))
    .map(f => ({ formUuid: f.formUuid, name: getName(f.title), formType: f.formType }));

  console.log('表单数量:', forms.length);
  forms.forEach(f => console.log(' ', f.formType, f.formUuid, f.name));

  // Step 2: 逐个拉取 Schema
  // API: GET /dingtalk/web/{appType}/query/formdesign/getFormSchema.json?formUuid=...&schemaVersion=V5
  // QPS 控制：每次请求间隔 ≥ 50ms（即 QPS ≤ 20）
  console.log('\nStep 2: 拉取 Schema...');
  const allEdges = [];
  const nodes = [];

  // 50ms 间隔 = QPS ≤ 20
  const MIN_REQUEST_INTERVAL_MS = 50;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  for (const form of forms) {
    await sleep(MIN_REQUEST_INTERVAL_MS);
    let fields = [], edges = [];

    if (form.formType === 'virtualView') {
      // 聚合表：通过专属接口 /{appType}/query/virtualview/get.json 获取关联表单
      const virtualViewPath = '/' + appType + '/query/virtualview/get.json'
        + '?_api=nattyFetch&_mock=false'
        + '&_csrf_token=' + encodeURIComponent(csrfToken)
        + '&formUuid=' + encodeURIComponent(form.formUuid)
        + '&_stamp=' + Date.now();
      const vvResult = await httpGet(baseUrl, virtualViewPath, null, cache.cookies);

      if (vvResult.success && vvResult.content) {
        const vvContent = vvResult.content;

        // aggregatedFields[].name.zh_CN 是聚合表的维度字段列表
        if (vvContent.aggregatedFields && vvContent.aggregatedFields.length) {
          for (const aggField of vvContent.aggregatedFields) {
            const fieldLabel = getName(aggField.name) || aggField.id || '';
            if (fieldLabel) {
              fields.push({ label: fieldLabel, componentName: aggField.componentName || 'TextField' });
            }
          }
        }

        // formulaFields[].name.zh_CN 是聚合表的指标列（计算字段）
        if (vvContent.formulaFields && vvContent.formulaFields.length) {
          for (const formulaField of vvContent.formulaFields) {
            const fieldLabel = getName(formulaField.name) || formulaField.id || '';
            if (fieldLabel) {
              fields.push({ label: fieldLabel, componentName: 'NumberField' });
            }
          }
        }

        // relationForms[].formUuid 是聚合表关联的数据源表单，用 linkage 类型（橙色点线）
        if (vvContent.relationForms) {
          for (const relatedForm of vvContent.relationForms) {
            if (relatedForm.formUuid) {
              edges.push({
                sourceFormUuid: form.formUuid,
                targetFormUuid: relatedForm.formUuid,
                fieldLabel: getName(relatedForm.title) || '',
                relationType: 'linkage',
              });
            }
          }
        }
      }
    } else {
      // 普通表单/流程表单：通过 V5 Schema 提取字段和关联关系
      const schemaPath = '/dingtalk/web/' + appType + '/query/formdesign/getFormSchema.json'
        + '?formUuid=' + encodeURIComponent(form.formUuid) + '&schemaVersion=V5';
      const schemaResult = await httpGet(baseUrl, schemaPath, null, cache.cookies);

      if (schemaResult.success && schemaResult.content) {
        const content = schemaResult.content;
        // V5 schema 结构：content.pages[0].componentsTree（递归 children）
        if (content.pages && content.pages[0] && content.pages[0].componentsTree) {
          const extracted = extractFromV5Schema(form.formUuid, content.pages[0].componentsTree);
          fields = extracted.fields;
          edges = extracted.edges;
        }
      }
    }

    nodes.push({ formUuid: form.formUuid, name: form.name, formType: form.formType, fields });
    allEdges.push(...edges);
    console.log(' ', form.name, '- 字段数:', fields.length, '  关联边:', edges.length);
  }

  // Step 3: 组装并输出 GRAPH_DATA
  const formUuidSet = new Set(forms.map(f => f.formUuid));
  const validEdges = allEdges.filter(e => formUuidSet.has(e.targetFormUuid));
  const graphData = { nodes, edges: validEdges };

  const outputPath = path.join('.cache', 'new-er-graph-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(graphData, null, 2));
  console.log('\n✅ 完成！节点数:', nodes.length, '  边数:', validEdges.length);
  console.log('输出文件:', outputPath);

  console.log('\n关联关系汇总:');
  validEdges.forEach(e => {
    const src = nodes.find(n => n.formUuid === e.sourceFormUuid);
    const tgt = nodes.find(n => n.formUuid === e.targetFormUuid);
    console.log(' ', (src && src.name) || e.sourceFormUuid, '--[' + e.fieldLabel + ']->', (tgt && tgt.name) || e.targetFormUuid);
  });
}

main().catch(e => { console.error(e); process.exit(1); });
