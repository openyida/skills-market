---
name: yida-form-theme
description: >
  宜搭表单皮肤定制技能。用户提出风格需求（如：赛博朋克、蒙德里安、极简白、中国风等），
  AI 自动生成对应主题的 CSS 并注入到宜搭表单中，实现一句话换肤。
  当用户提到"换肤"、"主题"、"皮肤"、"美化表单"、"风格"等关键词时，使用此技能。
license: MIT
metadata:
  audience: developers
  version: 1.0.0
  tags:
    - yida
    - theme
    - skin
    - css
    - form
---

# 宜搭表单皮肤定制指南

## 概述

通过向宜搭表单 Schema 注入 CSS（Html 组件 + root.css 双重保障），实现对表单外观的完整定制。
用户只需描述风格，AI 生成对应主题 CSS 并自动注入生效。

---

## 执行流程

```
[Step 1] 确认 appType / formUuid / cookies 路径
              ↓
[Step 2] 根据用户风格需求，设计 CSS 变量色板（原子变量 → 语义变量）
              ↓
[Step 3] 生成完整主题 CSS（覆盖所有组件）
              ↓
[Step 4] 编写注入脚本（参考下方模板）
              ↓
[Step 5] 执行注入脚本，Schema 版本 +1
              ↓
[Step 6] 输出访问链接，让用户刷新查看效果
```

---

## 注入脚本模板

注入脚本放在项目根目录的 `.cache/inject_<主题名>_theme.js`，核心逻辑：

```javascript
const path = require("path");
// 引入 openyida 内部工具函数
const {
  httpGet,
  httpPost,
  loadCookieData,
  triggerLogin,
  resolveBaseUrl,
  requestWithAutoLogin,
} = require(path.join(require.resolve("openyida"), "../../utils/http"));
const querystring = require("querystring");

const APP_TYPE = "APP_XXXXXXXX"; // 替换为实际 appType
const FORM_UUID = "FORM-XXXXXXXX"; // 替换为实际 formUuid

const THEME_CSS = `/* 在此填写主题 CSS */`;

function findFormContainer(node) {
  if (!node) return null;
  if (node.componentName === "FormContainer") return node;
  const children = node.children || node.items || [];
  for (const child of children) {
    const found = findFormContainer(child);
    if (found) return found;
  }
  return null;
}

async function main() {
  // 1. 读取登录态
  let cookieData = loadCookieData();
  if (!cookieData) cookieData = triggerLogin();
  const authRef = {
    csrfToken: cookieData.csrf_token,
    cookies: cookieData.cookies,
    baseUrl: resolveBaseUrl(cookieData),
    cookieData,
  };

  // 2. 获取 Schema
  const schemaResult = await requestWithAutoLogin(
    (auth) =>
      httpGet(
        auth.baseUrl,
        `/alibaba/web/${APP_TYPE}/_view/query/formdesign/getFormSchema.json`,
        { formUuid: FORM_UUID, schemaVersion: "V5" },
        auth.cookies,
      ),
    authRef,
  );

  let schema,
    version = 1;
  if (
    schemaResult.content &&
    typeof schemaResult.content === "object" &&
    schemaResult.content.version !== undefined
  ) {
    version = schemaResult.content.version;
  }
  schema = schemaResult.content
    ? typeof schemaResult.content === "string"
      ? JSON.parse(schemaResult.content)
      : schemaResult.content
    : schemaResult;

  // 3. 写入 root.css
  schema.pages[0].componentsTree[0].css = THEME_CSS;

  // 4. 注入 Html 组件（双重保障）
  const formContainer = findFormContainer(schema.pages[0].componentsTree[0]);
  const children = formContainer.children || formContainer.items;
  const existingHtml = children.find((c) => c.id === "yida-theme-css-html");
  const htmlNode = {
    componentName: "Html",
    id: "yida-theme-css-html",
    props: {
      content: `<style>${THEME_CSS}</style>`,
      __style__: {
        height: "0px",
        overflow: "hidden",
        padding: "0",
        margin: "0",
      },
      fieldId: "html_theme_css",
    },
    hidden: false,
    title: "⚠️勿删:主题CSS",
    isLocked: true,
    condition: true,
  };
  if (existingHtml) {
    existingHtml.props.content = `<style>${THEME_CSS}</style>`;
  } else {
    children.unshift(htmlNode);
  }

  // 5. 保存 Schema
  const saveResult = await requestWithAutoLogin(
    (auth) =>
      httpPost(
        auth.baseUrl,
        `/dingtalk/web/${APP_TYPE}/_view/query/formdesign/saveFormSchema.json`,
        querystring.stringify({
          _csrf_token: auth.csrfToken,
          appType: APP_TYPE,
          formUuid: FORM_UUID,
          content: JSON.stringify(schema),
          schemaVersion: "V5",
        }),
        auth.cookies,
      ),
    authRef,
  );

  if (!saveResult || saveResult.success === false) {
    console.error("❌ 保存失败:", saveResult && saveResult.errorMsg);
    process.exit(1);
  }

  // 6. 刷新缓存
  await requestWithAutoLogin(
    (auth) =>
      httpPost(
        auth.baseUrl,
        `/dingtalk/web/${APP_TYPE}/query/formdesign/updateFormConfig.json`,
        querystring.stringify({
          _csrf_token: auth.csrfToken,
          formUuid: FORM_UUID,
          version: version,
          configType: "MINI_RESOURCE",
          value: 0,
        }),
        auth.cookies,
      ),
    authRef,
  );

  console.log("🎉 主题注入完成！");
  console.log(`🔗 ${authRef.baseUrl}/${APP_TYPE}/submission/${FORM_UUID}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

---

## CSS 变量体系（必须遵守）

宜搭表单使用两层变量体系，**换肤时只需修改原子变量，语义变量自动跟随**：

### 原子色板（在 `:root` 中定义）

| 变量              | 原始含义        | 换肤示例（赛博朋克）  |
| ----------------- | --------------- | --------------------- |
| `--line1-1`       | 最浅边框/分隔色 | `#1a2a1a`（深暗绿黑） |
| `--line1-2`       | 主边框色        | `#0057B8`（电子蓝）   |
| `--text1-1`       | 主文字色        | `#e8f4ff`（冷白）     |
| `--text1-2`       | 次文字色        | `#a0c8ff`（浅蓝）     |
| `--text1-3`       | 强调文字色      | `#F7B500`（荧光黄）   |
| `--text1-4`       | 辅助文字色      | `#5a7a9a`（暗蓝灰）   |
| `--brand-primary` | 品牌主色        | `#0057B8`             |
| `--brand-hover`   | 品牌悬停色      | `#EA0B0C`（霓虹红）   |
| `--brand-active`  | 品牌激活色      | `#F7B500`             |
| `--fill1-1`       | 主背景色        | `#050d14`（深空黑）   |
| `--fill1-2`       | 次背景色        | `#0a1628`（深蓝黑）   |

### 语义变量（引用原子变量，自动联动）

| 变量                              | 说明                                                          |
| --------------------------------- | ------------------------------------------------------------- |
| `--input-bg-color`                | 输入框背景色（与 `--input-normal-background-color` 保持一致） |
| `--input-normal-background-color` | 输入框正常态背景                                              |
| `--input-normal-border-color`     | 输入框正常态边框                                              |
| `--input-normal-color`            | 输入框文字色（与 `--text1-1` 保持一致）                       |
| `--select-color`                  | 下拉选择框回填文字色（与输入框文字色保持一致）                |
| `--select-normal-color`           | 下拉选择框正常态文字色（与输入框文字色保持一致）              |
| `--select-highlight-color`        | 下拉选择框高亮色（与 `--brand-primary` 保持一致）             |
| `--divider-ver-color`             | 竖向分隔线颜色（与输入框边框色保持一致）                      |

---

## 组件覆盖清单（必须全部覆盖）

换肤时需覆盖以下所有组件，避免遗漏导致白色背景残留：

### 1. 页面背景

```css
body,
.vc-page-yida-page,
.vc-shell .deep-shell.next-shell-brand .next-shell-main,
.vc-shell-without-nav.is-desktop,
.vc-page:before {
  background-color: <主背景色> !important;
  /* 可选：发光网格、渐变等装饰 */
}
```

### 2. 表单卡片容器

```css
.vc-page-yida-page .vc-layout-form-container,
.vc-page-yida-page .vc-layout-form-container > .vc-layout-form-container-inner,
.top-banner-area.pc-1200,
.view-detail-footer,
.stickyFooter.is-sticky {
  background: <卡片背景> !important;
  border: 1px solid <边框色> !important;
  /* 可选：白色、浅色背景等，装饰性边框 */
}
```

### 3. 输入框（文本/选择/多行）

```css
.next-input,
.next-select,
.next-textarea {
  background: <输入框背景> !important;
  border-color: <边框色> !important;
  color: <文字色> !important;
}
/* 悬停态、聚焦态也要覆盖 */

/* 下拉选中值文字色 — 必须单独覆盖，仅靠 CSS 变量不生效 */
.next-select .next-select-inner .next-select-values,
.next-select .next-select-inner .next-select-values *,
.next-select .next-select-inner .next-input input,
.next-select-single .next-select-values .next-select-values-text {
  color: <主文字色> !important;
}
```

### 4. 按钮

```css
.next-btn-primary {
  /* 主按钮 */
}
.next-btn-normal {
  /* 普通按钮 */
}
```

### 5. 表单 Label

```css
.next-form-item-label,
.next-form-item-label label {
  color: <次文字色> !important;
}
/* 必填星号 */
.next-form-item-label .next-form-item-required {
  color: <强调色> !important;
}
```

### 6. 子表（table-field）

```css
/* 子表容器 */
.table-field-items-container {
  border: 1px solid <边框色> !important;
}

/* 子表头背景（需覆盖所有子元素） */
.table-field-table-head,
.table-field-table-head *,
.deep-table-form-field .next-table-header,
.deep-table-form-field .next-table-header th,
.deep-table-form-field .next-table-header .next-table-cell {
  background: <表头背景> !important;
  color: <表头文字色> !important;
  border-bottom: 1px solid var(--line1-1) !important;
}

/* 子表单元格底部边框（真实类名通过 Console 确认） */
.table-field-table-cell .field-item,
.table-field-table-cell .field-item > *,
.deep-table-form-field
  .table-field-items
  .table-field-theme-split
  .table-field-table-cell,
.deep-table-form-field
  .table-field-items
  .table-field-theme-split
  .table-field-table-cell
  > * {
  border-bottom: 1px solid var(--line1-1) !important;
}
```

### 7. 分隔线（日期区间等组件内的竖线）

```css
/* 真实类名（通过 Console 确认） */
.deep-select.with-picker .next-btn .next-divider,
.next-select.with-picker .next-btn .next-divider {
  background-color: var(--line1-2) !important;
}
```

### 8. Radio / Checkbox

```css
.next-radio-inner,
.next-checkbox-inner {
  border-color: <边框色> !important;
}
.next-radio-wrapper.checked .next-radio-inner,
.next-checkbox-wrapper.checked .next-checkbox-inner {
  background: <品牌色> !important;
}
```

### 9. 分组组件（PageSection）

```css
.page-section,
.deep-page-section,
.deep-page-section-body,
.deep-page-section-header,
[class*="pageSection"],
[class*="page-section"] {
  background-color: transparent !important;
  background: transparent !important;
}
```

### 10. 上传组件

```css
/* 拖拽按钮 */
.yida-upload-dragger-button,
.yida-upload-dragger-button:hover,
.yida-upload-dragger-button:focus {
  background: transparent !important;
  border: 1px solid var(--line1-2) !important;
}
/* 已上传文件列表 */
.next-upload-list-item {
  background-color: <浅背景> !important;
}
```

### 11. Tag 标签

```css
.responsive-tags-item {
  background: <浅背景> !important;
  border-left: 2px solid <品牌色> !important;
  color: <次文字色> !important;
}
```

### 12. 人员头像

```css
.deep-employee-form-field .next-form-preview.employee .employee-add-avatar img {
  border: 1px solid <边框色> !important;
}
```

### 13. 评论区

```css
.view-detail-footer {
  background: <卡片背景> !important;
}
.view-detail-title {
  color: <次文字色> !important;
}
```

### 14. 滚动条

```css
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: <主背景色>;
}
::-webkit-scrollbar-thumb {
  background: <品牌色半透明>;
}
```

---

## 常见坑与解决方案

### 坑 1：样式不生效（特异性不够）

**原因**：宜搭原生样式有更高特异性的选择器。

**解决**：

1. 加 `!important`
2. 加强选择器（如 `.deep-xxx .next-xxx` 而非单独 `.next-xxx`）
3. 在浏览器 Console 确认真实类名：

```javascript
document.querySelectorAll('[class*="目标关键词"]').forEach((el) => {
  console.log(el.className, getComputedStyle(el).backgroundColor);
});
```

### 坑 2：日期区间弹出面板未覆盖

**原因**：日期面板通过 Portal 渲染到 `body`，使用 `.next-date-picker-panel`、`.next-calendar` 等独立类名，不在表单 DOM 树内。

**解决**：单独针对这些类名写样式。

### 坑 3：子表头文字颜色不变

**原因**：宜搭对子表头有硬编码的 `color: #000`，需要用通配符 `*` 覆盖所有子元素。

**解决**：

```css
.table-field-table-head * {
  color: <目标色> !important;
}
```

### 坑 4：分组组件白色背景残留

**原因**：`.deep-page-section` 系列有独立背景色。

**解决**：覆盖所有 `page-section` 相关类名为 `transparent`。

### 坑 5：多主题 Html 组件共存导致旧主题覆盖新主题

**原因**：不同主题脚本使用了不同的 Html 组件 id（如赛博朋克用 `yida-cyberpunk-css-html`，新主题用 `yida-theme-css-html`），切换主题时旧组件未被清除，两份 CSS 同时存在，后加载的旧主题 CSS 覆盖了新主题。

**解决**：注入新主题前，先遍历清除所有已知旧主题的 Html 组件：

```javascript
const oldThemeIds = ["yida-cyberpunk-css-html", "yida-theme-css-html"];
oldThemeIds.forEach((oldId) => {
  const oldIndex = children.findIndex((c) => c.id === oldId);
  if (oldIndex !== -1) children.splice(oldIndex, 1);
});
```

### 坑 6：`--input-bg-color` 变量未定义

**原因**：宜搭部分组件（如日期区间输入框）直接引用 `--input-bg-color` 变量，若未定义则回退到白色。

**解决**：在 `:root` 中显式定义，与 `--input-normal-background-color` 保持一致。

### 坑 7：子表行分隔线 — 通配符 `*` 导致多余横线

**原因**：子表表头和单元格的样式如果使用 `*` 通配选择器（如 `.table-field-table-head *` 或 `.table-field-table-cell .field-item > *`），会把 `background`、`border-bottom` 等属性应用到**所有子元素**（输入框、按钮、图标等），导致出现多余的横线。

**解决**：

1. **表头**：`*` 通配符**只用于继承文字颜色**，`background` 和 `border-bottom` 只作用于表头容器本身：

```css
/* 表头容器 — background/border 只作用于容器 */
.table-field-table-head,
.deep-table-form-field .next-table-header,
.deep-table-form-field .next-table-header th,
.deep-table-form-field .next-table-header .next-table-cell {
  background: <表头背景> !important;
  border-bottom: 1px solid var(--line1-1) !important;
}
/* 表头文字颜色 — 用 * 覆盖所有子元素 */
.table-field-table-head * {
  color: <表头文字色> !important;
}
```

2. **行分隔线**：border-bottom 加在**行容器** `.table-field-theme-split` 上，**不要**加在 `.field-item` 或其子元素上：

```css
/* 行分隔线 — 作用于行容器 */
.deep-table-form-field .table-field-items .table-field-theme-split {
  border-bottom: 1px solid var(--line1-1) !important;
}
```

### 坑 8：子表最后一行底边框与容器边框重叠形成双线

**原因**：子表容器 `.table-field-items-container` 有 `border: 1px solid`，最后一行的 `border-bottom` 与容器底边框叠加，视觉上出现双线。

**解决**：用 `:last-child` 去掉最后一行的底边框：

```css
.deep-table-form-field .table-field-items .table-field-theme-split:last-child {
  border-bottom: none !important;
}
```

**完整子表 CSS 模板**（直接复用）：

```css
/* 子表容器 */
.table-field-items-container {
  border: 1px solid var(--line1-1) !important;
  border-radius: 8px !important;
  overflow: hidden !important;
}
/* 表头 — background/border 只作用于容器级 */
.table-field-table-head,
.deep-table-form-field .next-table-header,
.deep-table-form-field .next-table-header th,
.deep-table-form-field .next-table-header .next-table-cell {
  background: <表头背景> !important;
  border-bottom: 1px solid var(--line1-1) !important;
  font-weight: 500 !important;
}
/* 表头文字颜色 — 用 * 只覆盖 color */
.table-field-table-head * {
  color: <表头文字色> !important;
}
/* 行分隔线 — 作用于行容器 */
.deep-table-form-field .table-field-items .table-field-theme-split {
  border-bottom: 1px solid var(--line1-1) !important;
}
/* 最后一行去掉底边框，避免与容器边框双线 */
.deep-table-form-field .table-field-items .table-field-theme-split:last-child {
  border-bottom: none !important;
}
```

### 坑 9：表单底部操作栏上方多余横线

**原因**：`.root-footer` / `.deep-root-footer` 设置了 `border-top`，与表单卡片容器 `.vc-layout-form-container` 的底边框叠加，出现双线。

**解决**：底部操作栏的 `border-top` 设为 `none`：

```css
.vc-page-yida-page .vc-layout-form-container .root-footer,
.vc-page-yida-page .deep-root-footer {
  background: transparent !important;
  border-top: none !important;
}
```

### 坑 10：下拉选择框选中值文字颜色和 placeholder 一样浅

**原因**：仅在 `:root` 中定义 `--select-color` 等 CSS 变量不够，宜搭的 Next Select 组件内部不一定读取这些变量，导致选中值文字色回退到浅色，和 placeholder 视觉上无区别。

**解决**：除了定义 CSS 变量外，**必须用直接选择器覆盖**选中值文字颜色：

```css
/* CSS 变量（兜底） */
:root {
  --select-color: var(--text1-1);
  --select-normal-color: var(--text1-1);
  --input-normal-color: var(--text1-1);
}

/* 直接选择器覆盖（必须） */
.next-select .next-select-inner .next-select-values,
.next-select .next-select-inner .next-select-values *,
.next-select .next-select-inner .next-input input,
.next-select-single .next-select-values .next-select-values-text {
  color: <主文字色> !important;
}
```

---

## 主题风格参考

### 赛博朋克 × 蒙德里安

| 角色     | 颜色                                        |
| -------- | ------------------------------------------- |
| 主背景   | `#050d14`（深空黑）                         |
| 品牌主色 | `#0057B8`（电子蓝）                         |
| 强调色   | `#EA0B0C`（霓虹红）                         |
| 高亮色   | `#F7B500`（荧光黄）                         |
| 主文字   | `#e8f4ff`（冷白）                           |
| 次文字   | `#a0c8ff`（浅蓝）                           |
| 特效     | 发光电路网格背景、box-shadow 发光、玻璃拟态 |

### 极简白（参考）

| 角色     | 颜色      |
| -------- | --------- |
| 主背景   | `#f5f5f5` |
| 品牌主色 | `#1677ff` |
| 主文字   | `#1a1a1a` |
| 次文字   | `#666666` |
| 边框     | `#e0e0e0` |

### 中国风（参考）

| 角色     | 颜色                |
| -------- | ------------------- |
| 主背景   | `#fdf6ec`（宣纸色） |
| 品牌主色 | `#c0392b`（朱砂红） |
| 强调色   | `#d4a017`（金色）   |
| 主文字   | `#2c1810`（墨色）   |
| 边框     | `#c8a882`（棕褐）   |

---

## 注意事项

1. **每次修改 CSS 后必须重新执行注入脚本**，Schema 版本会自动 +1
2. **Html 组件 id 固定为 `yida-theme-css-html`**，脚本会自动检测并更新，不会重复插入
3. **root.css 和 Html 组件双重注入**，确保在不同渲染环境下都能生效
4. **cookies 路径**：`<项目根目录>/project/.cache/cookies.json`（或 `.cache/cookies.json`）
5. **调试技巧**：用浏览器 DevTools 的 Elements 面板找到真实类名，再告诉 AI 精准覆盖

---

## 详情页结构优化（必须叠加到主题 CSS 中）

> **规则**：颜色值根据当前主题色板自由发挥（用 CSS 变量引用），其余所有属性（圆角、间距、尺寸、布局）严格按照以下规范执行，不得修改。

### AI 决策规则

1. **用户要求优化表单详情页** → 将以下完整 CSS 叠加到主题 CSS 中一起注入
2. **用户只需优化某个区域** → 按注释分区选择对应片段注入
3. **用户有自定义圆角/间距需求** → 基于本规范调整对应数值
4. **新建应用包含表单** → 主动询问是否需要应用表单详情页优化样式

### 详情页 CSS 规范（v1.3）

```css
/* =========================================
   详情页结构优化 — 颜色用主题变量替换，结构严格执行
   ========================================= */
:root {
  --form-element-label-line-height: 28px;
}

/* ── 页头区域 ── */
.top-banner-area.pc-1200 {
  margin: 12px 12px 0px 12px;
  border-radius: 20px;
  border: 1px solid <主题边框色>; /* 替换为 var(--line1-2) 或主题边框色 */
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: 1440px;
  width: calc(100% - 24px);
}
.top-banner-area .yida-container.pc-1180 {
  max-width: none;
}

/* ── 详情区域 ── */
.vc-page-yida-page.vc-page.yida-formDetail {
  padding-left: 12px !important;
  padding-right: 12px !important;
}
.vc-deep-container-entry.vc-rootcontent {
  border-radius: 20px;
  border: 1px solid <主题边框色>; /* 替换为 var(--line1-2) 或主题边框色 */
  --yida-form-content-margin: 12px;
}
.vc-page-content-1180 .vc-rootcontent {
  max-width: 1440px;
}

/* ── 评论区域 ── */
.view-detail-footer {
  margin: 32px;
  border-radius: 20px;
  margin-top: 0px !important;
  border: 1px solid <主题边框色>; /* 替换为 var(--line1-2) 或主题边框色 */
  width: calc(100% - 24px);
  max-width: 1440px;
  /* background / backdrop-filter 由主题 CSS 控制 */
}
.view-detail-title {
  border-bottom: 0px solid rgba(31, 56, 88, 0) !important;
  box-sizing: border-box !important;
  /* color 由主题 CSS 控制（var(--text1-1) 或主题文字色） */
  font-family: PingFangSC-Medium !important;
  font-size: 16px !important;
  height: 48px !important;
  line-height: 24px !important;
  opacity: 0.8 !important;
  padding: 24px 24px !important;
}
.view-detail-footer
  .next-tabs-capsule
  > .next-tabs-bar
  .next-tabs-tab:first-child {
  border-radius: 20px 0 0 20px;
}
.next-tabs-tab-inner {
  text-align: center;
}
.view-detail-footer
  .next-tabs-capsule
  > .next-tabs-bar
  .next-tabs-tab:last-child {
  border-radius: 0 20px 20px 0;
}

/* ── 操作栏 ── */
.stickyFooter.is-sticky {
  /* background-color 由主题 CSS 控制 */
  border: 1px solid <主题边框色>; /* 替换为 var(--line1-2) 或主题边框色 */
  height: 56px;
  margin-right: auto !important;
  margin-left: auto !important;
  margin-bottom: 12px;
  border-radius: 30px;
  max-width: 1440px;
  width: calc(100% - 24px);
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.16);
}
.deep-button-group-item.next-btn.btn-weight.separated {
  border-radius: 8px;
}

/* ── 表单字段细节 ── */
.next-form-preview.next-form-item.next-medium .next-form-item-label {
  line-height: 20px !important;
}
.vc-page-yida-page .next-form-item .next-form-item-label {
  line-height: 20px !important;
}

/* 附件上传列表项重置 */
.next-upload-list-item {
  background-color: transparent !important;
  border: 0px !important;
}

/* 人员字段头像圆角 */
.deep-employee-form-field .next-form-preview.employee .employee-add-avatar img {
  border-radius: 8px !important;
}

/* 人员字段 tag 标注块 — 颜色由主题控制，圆角/边框宽度严格执行 */
.responsive-tags-item {
  /* background-color 由主题 CSS 控制 */
  border-radius: 8px !important;
  border-left: 2px solid <主题边框色半透明> !important; /* 替换为主题色 */
}

/* 字段值标注块 — 颜色由主题控制，圆角/padding/边框宽度严格执行 */
.next-form-item-control > .next-form-preview:not(.employee) {
  /* background-color 由主题 CSS 控制 */
  background-color:<主背景色+8%透明> /* 主背景色或者主题色的透明色 */
  padding: 0px 8px !important;
  border-radius: 8px !important;
  border-left: 2px solid <主题边框色半透明> !important; /* 替换为主题色 */
  overflow: hidden !important;
}

/* 图片/附件字段：极高特异性重置（必须保留，确保覆盖宜搭自身 CSS） */
.vc-page-yida-page.vc-page
  .next-form-item.imageField
  .next-form-item-control
  > .next-form-preview,
.vc-page-yida-page.vc-page
  .next-form-item.attachmentField
  .next-form-item-control
  > .next-form-preview {
  background-color: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
  border-left: none !important;
  overflow: visible !important;
}
```

### 颜色替换规则

生成详情页 CSS 时，将上方注释中的占位符替换为当前主题的对应变量：

| 占位符                              | 替换为                                             |
| ----------------------------------- | -------------------------------------------------- |
| `<主题边框色>`                      | `var(--line1-2)` 或主题主边框色                    |
| `<主题边框色半透明>`                | `rgba(主题主色, 0.24)` 或 `var(--line1-1)`         |
| `color` / `background-color` 注释处 | 使用 `var(--text1-1)`、`var(--fill1-2)` 等主题变量 |
