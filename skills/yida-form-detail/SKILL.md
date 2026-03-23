---
name: yida-form-detail
description: 宜搭表单详情页样式优化规范。通过 CSS 注入优化表单详情页的页头、详情区域、评论区、操作栏等模块的视觉效果，实现圆角卡片化、间距统一、整体风格更现代美观。当用户提到"表单详情优化"、"详情页美化"、"formDetail 样式"等关键词时，使用此技能。
license: MIT
compatibility:
  - opencode
  - claude-code
  - qoder
  - wukong
metadata:
  audience: developers
  workflow: yida-development
  version: 1.3.0
  tags:
    - yida
    - low-code
    - form-detail
    - css
    - style
---

# 宜搭表单详情页样式优化规范

## 概述

宜搭表单详情页（formDetail）默认样式较为朴素，本技能提供一套完整的 CSS 样式优化方案，覆盖 **页头、详情区域、评论区、操作栏** 四大模块，实现：

- 统一 **20px 圆角** 卡片化设计，统一 **1px solid #E5E6E8** 边框
- 统一 **12px** 间距，页面内容最大宽度 **1440px**
- 操作栏胶囊造型（30px 圆角），字段值「标注块」效果

---

## 页面结构与改色速查

> 改色时只需修改下表对应的 CSS 属性，无需改动其他结构代码。

| 区域              | CSS 选择器 / 变量                                                                    | 控制的属性                               |
| ----------------- | ------------------------------------------------------------------------------------ | ---------------------------------------- |
| **整体页面背景**  | `:root { --yida-form-container-bgcolor-custom }`                                     | 表单容器背景色（宜搭官方变量，优先使用） |
| **页头背景**      | `.top-banner-area`                                                                   | `background-color`                       |
| **详情区域背景**  | `.vc-deep-container-entry.vc-rootcontent`                                            | `background-color`                       |
| **评论区背景**    | `.view-detail-footer`                                                                | `background-color`                       |
| **操作栏背景**    | `.stickyFooter.is-sticky`                                                            | `background-color`                       |
| **字段标签颜色**  | `.next-form-item-label, .next-form-item-label label`                                 | `color`                                  |
| **字段值颜色**    | `.next-form-preview`                                                                 | `color`                                  |
| **标注块背景**    | `.next-form-item-control > .next-form-preview:not(.employee)`                        | `background-color`                       |
| **标注块左边框**  | `.next-form-item-control > .next-form-preview:not(.employee)`                        | `border-left`                            |
| **人员 tag 背景** | `.responsive-tags-item`                                                              | `background-color`                       |
| **卡片边框**      | `.top-banner-area`、`.vc-deep-container-entry.vc-rootcontent`、`.view-detail-footer` | `border`                                 |

---

## 何时使用

| 场景                             | 说明                     |
| -------------------------------- | ------------------------ |
| 用户要求美化/优化表单详情页      | 注入本规范的 CSS 样式    |
| 用户提到 formDetail 页面样式调整 | 参考本规范的选择器和属性 |
| 新建应用后需要统一详情页风格     | 作为默认样式方案应用     |

---

## 注入方式：通过 Html 组件注入（推荐）

> ⚠️ **重要**：宜搭 formDetail 详情页**不会执行**表单的页面 JS（`didMount`），因此 JS 注入方式无效。
>
> **推荐方式**：在表单 Schema 的 `FormContainer` 中注入一个宜搭原生 `Html` 组件，`content` 字段写入 `<style>` 标签。此方式的优势是：
>
> - 设计器能识别 `Html` 组件，保存时**不会清除**
> - 组件设置 `isLocked: true`，防止误操作删除
> - 同时写入 `root.css` 字段作为双重保障

### Html 组件结构

```json
{
  "componentName": "Html",
  "id": "yida-form-detail-css-html",
  "props": {
    "content": "<style>/* 完整 CSS 内容 */</style>",
    "__style__": {
      "height": "0px",
      "overflow": "hidden",
      "padding": "0",
      "margin": "0"
    },
    "fieldId": "html_yida_detail_css"
  },
  "hidden": false,
  "title": "⚠️勿删:详情页CSS",
  "isLocked": true,
  "condition": true,
  "conditionGroup": ""
}
```

> **关键说明**：`__style__` 设置 `height: 0px` 使组件不占空间；`hidden: false` 确保渲染到 DOM，`<style>` 标签才能生效；`isLocked: true` 防止误删。

### 注入步骤

**Step 1：获取表单 Schema**

```
GET /alibaba/web/{appType}/_view/query/formdesign/getFormSchema.json
  ?formUuid={formUuid}&schemaVersion=V5
```

**Step 2：写入 root.css（双重保障）**

```javascript
const rootNode = schema.pages[0].componentsTree[0];
rootNode.css = "body{background-color:#f2f3f5}" + FORM_DETAIL_CSS;
```

**Step 3：在 FormContainer 首位插入/更新 Html 组件**

```javascript
function findNode(node, componentName) {
  if (node.componentName === componentName) return node;
  for (const child of node.children || node.items || []) {
    const found = findNode(child, componentName);
    if (found) return found;
  }
  return null;
}

const formContainer = findNode(rootNode, "FormContainer");
const children = formContainer.children || formContainer.items;
const existing = children.find((c) => c.id === "yida-form-detail-css-html");

if (existing) {
  existing.props.content = `<style>${FORM_DETAIL_CSS}</style>`;
} else {
  children.unshift({
    componentName: "Html",
    id: "yida-form-detail-css-html",
    props: {
      content: `<style>${FORM_DETAIL_CSS}</style>`,
      __style__: {
        height: "0px",
        overflow: "hidden",
        padding: "0",
        margin: "0",
      },
      fieldId: "html_yida_detail_css",
    },
    hidden: false,
    title: "⚠️勿删:详情页CSS",
    isLocked: true,
    condition: true,
    conditionGroup: "",
  });
}
```

**Step 4：保存 Schema**

```
POST /dingtalk/web/{appType}/_view/query/formdesign/saveFormSchema.json
Body: { appType, formUuid, schemaVersion: 'V5', content: JSON.stringify(schema) }
```

> ⚠️ 保存接口必须用 `/dingtalk/web/` 前缀；`schemaVersion` 必须是字符串 `'V5'`。

**Step 5：调用 updateFormConfig 使配置生效**

```
POST /dingtalk/web/{appType}/query/formdesign/updateFormConfig.json
Body: { formUuid, version: 1, configType: 'MINI_RESOURCE', value: 0 }
```

> ⚠️ 必须调用此接口，否则前端读取缓存，样式不会立即生效。

### 注入方式对比

| 方式                                     | 是否生效  | 说明                                            |
| ---------------------------------------- | --------- | ----------------------------------------------- |
| `Html` 组件注入（推荐）                  | ✅ 生效   | 设计器可识别，保存时不会清除，持久稳定          |
| `pages[0].componentsTree[0].css` 字段    | ✅ 生效   | formDetail 直接加载，但设计器保存时可能被覆盖   |
| `RichTextField` 组件注入                 | ❌ 不推荐 | 需在 componentsMap 注册，设计器显示"组件未找到" |
| `actions.module.source` 的 `didMount` JS | ❌ 不生效 | formDetail 页面不执行表单的页面 JS              |

### 样式持久性说明

| 操作                                          | 样式是否安全                        |
| --------------------------------------------- | ----------------------------------- |
| 通过 `openyida create-form update` 增删改字段 | ✅ 安全，Html 组件完整保留          |
| 在表单设计器中增删改字段、调整布局            | ✅ 安全，设计器识别 Html 组件并保留 |
| 修改表单设置（标题、权限等）                  | ✅ 安全                             |
| 在设计器中手动删除 Html 组件                  | ⚠️ **会丢失**，重新运行注入脚本恢复 |

---

## 完整 CSS 内容

```css
/* =========================================
   yida-form-detail 详情页样式优化 v1.3
   ========================================= */
:root {
  --form-element-label-line-height: 28px;
}

/* 页头区域 */
.top-banner-area.pc-1200 {
  margin: 12px 12px 0px 12px;
  border-radius: 20px;
  border: 1px solid #e5e6e8;
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: 1440px;
  width: calc(100% - 24px);
}
.top-banner-area .yida-container.pc-1180 {
  max-width: none;
}

/* 详情区域 */
.vc-page-yida-page.vc-page.yida-formDetail {
  padding-left: 12px !important;
  padding-right: 12px !important;
}
.vc-deep-container-entry.vc-rootcontent {
  border-radius: 20px;
  border: 1px solid #e5e6e8;
  --yida-form-content-margin: 12px;
}
.vc-page-content-1180 .vc-rootcontent {
  max-width: 1440px;
}

/* 评论区域 */
.view-detail-footer {
  margin: 32px;
  border-radius: 20px;
  margin-top: 0px !important;
  border: 1px solid #e5e6e8;
  width: calc(100% - 24px);
  max-width: 1440px;
}
.view-detail-title {
  border-bottom: 1px solid rgba(31, 56, 88, 0) !important;
  box-sizing: border-box !important;
  color: #000 !important;
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

/* 操作栏 */
.stickyFooter.is-sticky {
  background-color: #ffffff;
  border: 1px solid #e5e6e8;
  height: 56px;
  margin-right: auto !important;
  margin-left: auto !important;
  margin-bottom: 12px;
  border-radius: 30px;
  max-width: 1440px;
  width: calc(100% - 24px);
  box-shadow: 0px 8px 24px 0px rgba (0, 0, 0, 0.16);
}
.deep-button-group-item.next-btn.btn-weight.separated {
  border-radius: 8px;
}

/* 表单字段细节 */
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
/* 人员字段 tag 标注块样式 */
.responsive-tags-item {
  background-color: rgba(247, 248, 250, 0.5) !important;
  border-radius: 8px !important;
  border-left: 2px solid rgba(131, 137, 143, 0.24) !important;
}
/* 字段值标注块样式（人员字段通过 :not(.employee) 排除） */
.next-form-item-control > .next-form-preview:not(.employee) {
  background-color: rgba(247, 248, 250, 0.5) !important;
  padding: 0px 8px !important;
  border-radius: 8px !important;
  border-left: 2px solid rgba(131, 137, 143, 0.24) !important;
  overflow: hidden !important;
}
/* 图片/附件字段：极高特异性重置，确保覆盖宜搭自身 CSS */
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

---

## AI 生成页面时的决策规则

1. **用户要求优化表单详情页** → 直接注入本规范的完整 CSS
2. **用户只需优化某个区域** → 按注释分区选择对应的 CSS 片段注入
3. **用户有自定义圆角/间距需求** → 基于本规范调整对应数值
4. **新建应用包含表单** → 主动询问是否需要应用表单详情页优化样式
