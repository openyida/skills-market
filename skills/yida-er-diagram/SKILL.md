---
name: yida-er-diagram
description: >
  在宜搭自定义页面中，基于 AntV X6 v2 可视化绘制应用内所有表单的 ER 关联图。
  自动解析普通表单、流程表单、聚合表的字段关联关系，生成可交互的 ER 图，支持节点拖动、画布缩放、详情弹窗、导出 PNG。
  当用户提到"ER 图"、"表单关联图"、"数据模型图"、"er-diagram"、"绘制 ER"等关键词时，使用此技能。
license: MIT
compatibility:
  - opencode
  - claude-code
  - qoder
  - wukong
metadata:
  audience: developers
  workflow: yida-development
  version: 1.0.0
  tags:
    - yida
    - low-code
    - er-diagram
    - antv-x6
    - visualization
---

# yida-er-diagram

在宜搭自定义页面中，基于 **AntV X6 v2** 可视化绘制应用内所有表单的 ER 关联图。

---

## 功能概述

- 自动解析应用内所有表单（普通表单、流程表单、聚合表）的字段关联关系
- 用 AntV X6 v2 绘制可交互的 ER 图：节点可拖动、画布可平移/缩放
- 节点按表单类型区分颜色，点击节点弹出详情面板
- 详情面板展示全部字段、关联关系，并提供「编辑表单」跳转按钮
- 支持导出 PNG（纯 Canvas 绘制，毫秒级，不依赖外部库）

---

## 关键技术决策（踩坑记录）

### 1. 图表库选型：AntV X6 v2（不用 mermaid）

最初尝试 mermaid `erDiagram`，遇到以下问题：
- 中文实体名导致解析失败
- 连线 label 中文导致解析失败
- 图表密集、可读性差，无法拖动节点

**最终方案**：使用 AntV X6 v2.18.1（UMD CDN）：
```
https://cdnjs.cloudflare.com/ajax/libs/antv-x6/2.18.1/index.js
```

### 2. 节点文字渲染：HTML 覆盖层（不用 SVG text / foreignObject）

宜搭的 X6 SVG 渲染环境存在严重限制：
- **SVG `text` 元素**：`dominantBaseline`、`dy` 等属性均不生效，文字不显示
- **SVG `foreignObject`**：在宜搭环境完全不渲染

**唯一可行方案**：HTML 覆盖层
- X6 节点设为完全透明（只用于布局占位和边的连接锚点）
- 在 X6 画布容器上方叠加一个 `position:absolute` 的 HTML div 层
- 用纯 HTML div 渲染节点外观（标题、字段行、颜色）
- 通过监听 `graph.on('translate')` 和 `graph.on('scale')` 同步 CSS `transform`

```javascript
// HTML 覆盖层跟随画布变换
function syncHtmlLayer() {
  var transform = graph.matrix();
  var tx = transform.e || 0;
  var ty = transform.f || 0;
  var scale = transform.a || 1;
  htmlLayer.style.transform = 'matrix(' + scale + ',0,0,' + scale + ',' + tx + ',' + ty + ')';
  htmlLayer.style.transformOrigin = '0 0';
}
graph.on('translate', syncHtmlLayer);
graph.on('scale', syncHtmlLayer);
```

### 3. 节点拖动：手动实现（不用 X6 内置拖动）

HTML 覆盖层拦截了所有鼠标事件，X6 的透明占位节点收不到 `mousedown`，内置拖动失效。

**解决方案**：在每个节点 HTML div 上手动实现拖动：
- `mousedown` → 记录起始位置
- `mousemove` → 同时更新 HTML div 位置 + X6 占位节点位置（边跟着更新）
- `mouseup` → 结束拖动；若未移动则触发点击（打开详情弹窗）
- 拖动时感知画布缩放比例（`graph.matrix().a`），确保拖动距离正确

```javascript
function onMouseMove(e) {
  var scale = (graph.matrix() && graph.matrix().a) || 1;
  var dx = (e.clientX - dragStartX) / scale;
  var dy = (e.clientY - dragStartY) / scale;
  // 同步 HTML div 和 X6 占位节点
  capturedDiv.style.left = (nodeStartX + dx) + 'px';
  capturedDiv.style.top = (nodeStartY + dy) + 'px';
  capturedNodeModel.setPosition(nodeStartX + dx, nodeStartY + dy);
}
```

### 4. 导出 PNG：纯 Canvas 绘制（不用 html2canvas / x6Graph.exportPNG）

- `x6Graph.exportPNG()` 只导出 SVG 画布，HTML 覆盖层节点内容不在其中
- `html2canvas` 截取 32 个节点耗时 10+ 秒，且宜搭 CSP 可能导致 `toDataURL` 失败

**最终方案**：纯 Canvas 手动绘制
- 读取 X6 节点数据（位置、尺寸、字段、颜色）
- 用 Canvas API 绘制圆角矩形节点、header、字段行
- 读取 X6 边数据，用贝塞尔曲线绘制连线和箭头
- 2x 高清输出，毫秒级完成

### 5. 弹窗滚动不触发画布缩放

```javascript
panel.addEventListener('wheel', function(e) {
  e.stopPropagation();
}, { passive: false });
```

---

## 数据结构

### GRAPH_DATA（硬编码静态数据）

```javascript
var GRAPH_DATA = {
  nodes: [
    {
      formUuid: "FORM-xxx",
      name: "表单名称",
      formType: "receipt",  // receipt | process | virtualView
      fields: [
        { label: "字段名", componentName: "TextField" }
      ]
    }
  ],
  edges: [
    {
      sourceFormUuid: "FORM-aaa",
      targetFormUuid: "FORM-bbb",
      fieldLabel: "关联字段名",
      relationType: "association"  // association | data-source | linkage
    }
  ]
};
```

### 三类表单类型

| formType | 说明 | 节点/弹窗颜色 |
|----------|------|-------------|
| `receipt` | 普通表单 | `#1664ff` 蓝色 |
| `process` | 流程表单 | `#00b42a` 绿色 |
| `virtualView` | 聚合表 | `#ff7d00` 橙黄色 |
| 其他 | 默认 | `#86909c` 灰色 |

### 三类关联关系

| relationType | 说明 | 连线样式 |
|-------------|------|---------|
| `association` | 关联表单字段（AssociationFormField） | 实线蓝色 |
| `data-source` | 关联其他表单数据（dataSourceType=relate） | 虚线蓝色 |
| `linkage` | 数据联动 | 点线橙色 |

---

## 页面 JS 关键常量

```javascript
var LINE_HEIGHT = 24;   // 字段行高
var NODE_WIDTH = 200;   // 节点宽度
var MAX_FIELDS = 8;     // 节点最多显示字段数
var HEADER_H = 30;      // 节点标题栏高度
```

---

## 编辑表单跳转链接规则

```javascript
var appType = window.__erAppType__;  // 硬编码，每次生成时指定
var baseUrl = 'https://www.aliwork.com/alibaba/web/' + appType + '/design/';

// receipt / process → pageDesigner
var editUrl = baseUrl + 'pageDesigner?formUuid=' + node.formUuid;

// virtualView → virtualViewDesigner
var editUrl = baseUrl + 'virtualViewDesigner.html?formUuid=' + node.formUuid;
```

---

## 导出文件名格式

```javascript
var fileName = 'er-diagram_' + appType + '_' + timestamp + '.png';
// 示例：er-diagram_APP_Z483SQTRMG1XRQWV8FFB_20260325-203000.png
```

---

## 布局算法

使用**分层布局**（Layered Layout）：
1. 构建有向图，计算每个节点的层级（BFS 从入度为 0 的节点开始）
2. 同层节点按列排列，层间保持固定间距
3. 节点高度 = `HEADER_H + min(fields.length, MAX_FIELDS) * LINE_HEIGHT + (moreCount > 0 ? LINE_HEIGHT : 0)`

---

## X6 Graph 配置

```javascript
var graph = new window.X6.Graph({
  container: container,
  background: { color: '#f0f2f5' },
  grid: false,
  mousewheel: {
    enabled: true,
    zoomAtMousePosition: true,
    factor: 1.1,
    minScale: 0.05,
    maxScale: 4,
  },
  panning: { enabled: true },
  interacting: {
    nodeMovable: true,   // 节点可拖动（实际由 HTML 覆盖层手动实现）
    edgeMovable: false,
    magnetConnectable: false,
  },
  connecting: { enabled: false },
});
```

---

## 注册透明占位节点

```javascript
window.X6.Graph.registerNode('er-rect', {
  inherit: 'rect',
  attrs: {
    body: {
      refWidth: '100%',
      refHeight: '100%',
      fill: 'transparent',
      stroke: 'transparent',
      strokeWidth: 0,
    },
  },
  ports: {
    groups: {
      list: {
        markup: [{ tagName: 'rect', selector: 'portBody' }],
        attrs: {
          portBody: {
            width: NODE_WIDTH,
            height: LINE_HEIGHT,
            fill: 'transparent',
            stroke: 'transparent',
            magnet: false,
          },
        },
        position: 'erPortPosition',
      },
    },
  },
}, true);
```

---

## 数据采集流程（为新应用生成 ER 图时必须执行）

> ⚠️ **必须使用 openyida 内部的 `httpGet` 工具发请求**，它会自动携带 Cookie。直接用 `https.request` 会因为 Cookie 格式问题导致 401。

### 完整采集脚本

脚本已独立存放在 [`scripts/fetch-forms.js`](scripts/fetch-forms.js)。

使用前修改脚本顶部的 `appType`，然后在项目根目录执行：

```bash
node skills/yida-er-diagram/scripts/fetch-forms.js
```

输出到 `.cache/new-er-graph-data.json`。

---

### Step 3：在目标应用中创建自定义页面

在目标应用中创建一个自定义页面，用于承载 ER 图：

```bash
# 正确格式：位置参数，第一个是 appType，第二个是页面名称
openyida create-page <appType> "ER关联图"
```

示例：

```bash
openyida create-page APP_HTZ06OGDO4XKFP3LL55J "ER关联图"
```

> ⚠️ **注意**：不要使用 `--appType`、`--name` 等命名参数形式，`create-page` 命令使用位置参数。

命令成功后会输出 `pageId`（即 `pageFormUuid`），记录下来供下一步使用。

---

### Step 4：更新 er-diagram.js 并发布

脚本已独立存放在 [`scripts/update-er-diagram.js`](scripts/update-er-diagram.js)，它会自动完成替换 + 发布两步。读取 `scripts/er-diagram.js` 作为源文件。

在项目根目录执行：

```bash
node skills/yida-er-diagram/scripts/update-er-diagram.js <appType> <pageFormUuid>
```

示例：

```bash
node skills/yida-er-diagram/scripts/update-er-diagram.js APP_HTZ06OGDO4XKFP3LL55J FORM-40CAB834ADA645578A53BD87A15ABBB5O7UV
```

> ⚠️ **注意**：`<pageFormUuid>` 是 ER 图自定义页面的 formUuid（通过 `openyida create-page` 创建获得），不是目标应用的表单 UUID。

---

### 关键 API 说明

| 接口 | 方法 | 路径 |
|------|------|------|
| 获取表单列表 | GET | `/{appType}/query/app/getAppPlatFormParam.json?_api=nattyFetch&_mock=false&_csrf_token={token}&pageIndex=1&pageSize=50&_stamp={ts}` |
| 获取表单 Schema | GET | `/dingtalk/web/{appType}/query/formdesign/getFormSchema.json?formUuid={formUuid}&schemaVersion=V5` |

**响应结构要点**：
- 表单列表：`result.content.formNavigationList[]`，表单名为 i18n 对象（取 `zh_CN`），表单 ID 为 `relateFormUuid`
- Schema：`result.content.pages[0].componentsTree`（V5 格式，递归 `children`）
- 关联字段：`componentName === 'AssociationFormField'`，目标表单 ID 在 `props.associationForm.formUuid`
- 字段标签：`props.label`（i18n 对象，取 `zh_CN`）
- csrfToken：从 `.cache/cookies.json` 的 `cookies` 数组中找 `name === 'tianshu_csrf_token'` 的项

---

## AI 使用决策规则

1. **用户要求为某个应用生成 ER 图** → 按「数据采集流程」Step 1-5 执行，不要跳过任何步骤
2. **更新已有 ER 图** → 只更新 `GRAPH_DATA` 和 `window.__erAppType__`，其余代码不动
3. **节点文字不显示** → 检查是否使用了 HTML 覆盖层方案，SVG text / foreignObject 在宜搭环境均不可用
4. **导出没反应** → 检查是否使用纯 Canvas 绘制方案，不要用 html2canvas 或 x6Graph.exportPNG
5. **节点拖动后边不跟随** → 检查 `capturedNodeModel.setPosition()` 是否在 `onMouseMove` 中同步调用
6. **API 返回 401/未登录** → 执行 `openyida login` 刷新登录态后重试
