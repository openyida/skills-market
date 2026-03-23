# 风格预设参考

汇报材料演示文稿的视觉风格预设。每种风格都针对企业汇报场景优化。

**视口 CSS：** 必须内联的基础样式见 [viewport-base.css](viewport-base.css)。

**字体：** 所有风格的中文字体统一使用钉钉进步体（DingTalk JinBuTi），通过 CDN 加载。英文字体按风格指定。

---

## 风格 1: Apple Design Language

**视觉基调：** 极简留白、轻盈通透、高级感

**适用场景：** 高管汇报、产品发布、品牌展示

**布局特点：** 大量留白，内容居中，浅色/深色交替

**字体：**
- 中文：`DingTalk JinBuTi`
- 英文回退：`-apple-system, 'SF Pro Display'`
- 完整声明：`'DingTalk JinBuTi', -apple-system, 'SF Pro Display', 'PingFang SC', sans-serif`

**CDN 链接：**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@1.0.3/font.css">
```

**配色：**
```css
:root {
    /* 浅色页面 */
    --bg-light: #f5f5f7;
    --bg-white: #fbfbfd;
    --surface: rgba(255,255,255,0.72);
    --text-primary: #1d1d1f;
    --text-secondary: #6e6e73;

    /* 深色页面 */
    --bg-dark: #1d1d1f;
    --surface-dark: rgba(255,255,255,0.06);
    --text-light: #f5f5f7;

    /* 强调色 */
    --accent-blue: #0071e3;
    --accent-purple: #bf5af2;
    --accent-green: #30d158;
    --accent-orange: #ff9f0a;
    --accent-red: #ff453a;
    --accent-teal: #64d2ff;

    /* 圆角 */
    --radius: 20px;
    --radius-sm: 12px;

    /* 字体 */
    --font-display: 'DingTalk JinBuTi', -apple-system, 'SF Pro Display', 'PingFang SC', sans-serif;
    --font-body: 'DingTalk JinBuTi', -apple-system, 'SF Pro Display', 'PingFang SC', sans-serif;
}
```

**签名元素：**
- 毛玻璃卡片：`backdrop-filter: blur(40px); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);`
- 渐变文字：`background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple)); -webkit-background-clip: text;`
- 大圆角（20px）
- 浅色/深色页面交替使用
- 标签使用渐变背景 pill 样式
- 微妙的 hover 上浮效果：`transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3);`

**动画缓动：** `cubic-bezier(0.16, 1, 0.3, 1)` — Apple 标志性的 spring 曲线

**版式规范：**
- 封面页：浅色背景，渐变 badge + 大标题（渐变文字）+ 副标题 + 元信息
- 数据看板：深色背景，毛玻璃卡片网格，数字使用强调色
- 四象限卡片：浅色背景，白色半透明卡片，左侧彩色图标
- 策略页：浅色渐变背景，白色卡片 + 顶部彩色条 + 标签 pills
- 总结页：深色背景，渐变大标题 + 分隔线 + 描述

---

## 风格 2: Google Material Design

**视觉基调：** 明快清晰、结构分明、Material You 色彩系统

**适用场景：** 技术汇报、团队复盘、项目总结

**布局特点：** 清晰的层级关系，tonal surface 色彩容器，elevation 阴影

**字体：**
- 中文：`DingTalk JinBuTi`
- 英文回退：`'Google Sans'`
- 完整声明：`'DingTalk JinBuTi', 'Google Sans', 'PingFang SC', sans-serif`

**CDN 链接：**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@1.0.3/font.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap">
```

**配色：**
```css
:root {
    /* 主色 */
    --md-primary: #1a73e8;
    --md-on-primary: #ffffff;
    --md-primary-container: #d3e3fd;
    --md-on-primary-container: #041e49;

    /* 表面 */
    --md-surface: #ffffff;
    --md-surface-dim: #f8f9fa;
    --md-surface-container: #f1f3f4;
    --md-on-surface: #202124;
    --md-on-surface-variant: #5f6368;
    --md-outline: #dadce0;

    /* 功能色 */
    --md-tertiary: #1e8e3e;
    --md-tertiary-container: #ceead6;
    --md-yellow: #f9ab00;
    --md-yellow-container: #fef7e0;
    --md-purple: #9334e6;
    --md-purple-container: #e9d5ff;
    --md-error: #d93025;

    /* 圆角 */
    --md-radius-sm: 8px;
    --md-radius: 12px;
    --md-radius-lg: 16px;
    --md-radius-xl: 28px;

    /* 阴影 */
    --md-elevation-1: 0 1px 2px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08);
    --md-elevation-2: 0 1px 2px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.1);
    --md-elevation-3: 0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.08);

    /* 字体 */
    --font-display: 'DingTalk JinBuTi', 'Google Sans', 'PingFang SC', sans-serif;
    --font-body: 'DingTalk JinBuTi', 'Google Sans', 'PingFang SC', sans-serif;
}
```

**签名元素：**
- Tonal surface 卡片：使用 `*-container` 色作为卡片背景（如 `--md-primary-container`）
- 顶部彩色条：卡片顶部 4px 彩色条表示分类
- FAB 风格图标：圆角方形图标容器 + elevation 阴影
- Chip 标签：`border: 1px solid var(--md-outline); border-radius: 8px;`
- Section dot：标题前的圆点指示器
- 封面大色块圆形背景装饰

**动画缓动：** `cubic-bezier(0.2, 0, 0, 1)` — Material motion 标准曲线

**版式规范：**
- 封面页：白色背景 + 大色块圆形装饰，左对齐标题，chip 标签 + meta pills
- 数据看板：浅灰背景，白色卡片 + 顶部彩色条 + 数字 + 标签
- 四象限卡片：白色背景，tonal surface 彩色卡片（蓝/紫/绿/黄）
- 策略页：浅灰背景，白色 outlined 卡片 + FAB 图标 + chip 标签
- 总结页：品牌蓝满屏背景 + 白色文字 + CTA 按钮

---

## 风格 3: Neon Cyber

**视觉基调：** 未来科技感、深色、霓虹高光

**适用场景：** 技术方向汇报、创新项目、AI/前沿技术

**字体：**
- 中文：`DingTalk JinBuTi`
- 英文：`Clash Display` + `Satoshi`（Fontshare）
- 完整声明：`'DingTalk JinBuTi', 'Clash Display', 'PingFang SC', sans-serif`

**CDN 链接：**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@1.0.3/font.css">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@700&f[]=satoshi@400;500;700&display=swap">
```

**配色：**
```css
:root {
    --bg-primary: #0a0f1c;
    --bg-secondary: #111827;
    --text-primary: #ffffff;
    --text-secondary: #9ca3af;
    --accent-cyan: #00ffcc;
    --accent-magenta: #ff00aa;
    --accent-blue: #3b82f6;
    --glow-cyan: rgba(0, 255, 204, 0.3);
    --glow-magenta: rgba(255, 0, 170, 0.2);

    --font-display: 'DingTalk JinBuTi', 'Clash Display', 'PingFang SC', sans-serif;
    --font-body: 'DingTalk JinBuTi', 'Satoshi', 'PingFang SC', sans-serif;
}
```

**签名元素：**
- 霓虹发光：`box-shadow: 0 0 20px var(--glow-cyan);`
- 网格背景：`background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);`
- 渐变边框：`border-image: linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta)) 1;`
- 粒子背景（canvas）

---

## 风格 4: Swiss Modern

**视觉基调：** 瑞士风格、精确、网格、红色强调

**适用场景：** 数据驱动汇报、精确分析

**字体：**
- 中文：`DingTalk JinBuTi`
- 英文：`Archivo` (800) + `Nunito` (400)

**配色：**
```css
:root {
    --bg: #ffffff;
    --text: #000000;
    --accent: #ff3300;
    --grid-line: rgba(0,0,0,0.06);

    --font-display: 'DingTalk JinBuTi', 'Archivo', 'PingFang SC', sans-serif;
    --font-body: 'DingTalk JinBuTi', 'Nunito', 'PingFang SC', sans-serif;
}
```

**签名元素：** 可见网格线、不对称布局、几何形状、红色强调

---

## 风格 5: Dark Botanical

**视觉基调：** 暗色优雅、暖色调、高端感

**适用场景：** 品牌汇报、设计团队、高端展示

**字体：**
- 中文：`DingTalk JinBuTi`
- 英文：`Cormorant` (serif) + `IBM Plex Sans`

**配色：**
```css
:root {
    --bg-primary: #0f0f0f;
    --text-primary: #e8e4df;
    --text-secondary: #9a9590;
    --accent-warm: #d4a574;
    --accent-pink: #e8b4b8;
    --accent-gold: #c9b896;

    --font-display: 'DingTalk JinBuTi', 'Cormorant', 'PingFang SC', serif;
    --font-body: 'DingTalk JinBuTi', 'IBM Plex Sans', 'PingFang SC', sans-serif;
}
```

**签名元素：** 模糊渐变圆形装饰、暖色强调、细竖线、斜体签名字体

---

## 风格 6: Paper & Ink

**视觉基调：** 编辑风、文学感、思考型

**适用场景：** 战略分析、深度思考型汇报

**字体：**
- 中文：`DingTalk JinBuTi`
- 英文：`Cormorant Garamond` + `Source Serif 4`

**配色：**
```css
:root {
    --bg: #faf9f7;
    --text: #1a1a1a;
    --accent: #c41e3a;

    --font-display: 'DingTalk JinBuTi', 'Cormorant Garamond', 'PingFang SC', serif;
    --font-body: 'DingTalk JinBuTi', 'Source Serif 4', 'PingFang SC', serif;
}
```

**签名元素：** 首字下沉、拉引引用、优雅水平线

---

## 风格 7: Microsoft Fluent Design

**视觉基调：** 光影通透、沉浸式、液态玻璃质感

**适用场景：** 跨端应用汇报、Office/Azure 相关、混合办公场景

**布局特点：** Acrylic 材质背景、Reveal Highlight 光源跟随、自适应层级

**字体：**
- 中文：`DingTalk JinBuTi`
- 英文：`Segoe UI Variable` (系统) / `Inter` (Web 回退)
- 完整声明：`'DingTalk JinBuTi', 'Segoe UI Variable', 'Inter', 'PingFang SC', sans-serif`

**CDN 链接：**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@1.0.3/font.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
```

**配色：**
```css
:root {
    /* 表面 */
    --fluent-bg: #f3f3f3;
    --fluent-bg-dark: #202020;
    --fluent-surface: rgba(255,255,255,0.7);
    --fluent-surface-dark: rgba(255,255,255,0.05);
    --fluent-card: rgba(255,255,255,0.85);

    /* 文字 */
    --fluent-text: #1a1a1a;
    --fluent-text-secondary: #616161;
    --fluent-text-light: #ffffff;

    /* 强调色 — Fluent 标志性蓝 */
    --fluent-accent: #0078d4;
    --fluent-accent-light: #60cdff;
    --fluent-accent-dark: #003d6b;
    --fluent-success: #0f7b0f;
    --fluent-warning: #9d5d00;
    --fluent-error: #bc2f32;
    --fluent-purple: #7160e8;

    /* 圆角 — Fluent 2.0 统一 */
    --fluent-radius-sm: 4px;
    --fluent-radius: 8px;
    --fluent-radius-lg: 12px;
    --fluent-radius-xl: 16px;

    /* 阴影 */
    --fluent-shadow-2: 0 1px 2px rgba(0,0,0,0.12), 0 0 2px rgba(0,0,0,0.06);
    --fluent-shadow-4: 0 2px 4px rgba(0,0,0,0.14), 0 0 2px rgba(0,0,0,0.06);
    --fluent-shadow-8: 0 4px 8px rgba(0,0,0,0.14), 0 0 2px rgba(0,0,0,0.06);
    --fluent-shadow-16: 0 8px 16px rgba(0,0,0,0.14), 0 0 2px rgba(0,0,0,0.06);

    /* 字体 */
    --font-display: 'DingTalk JinBuTi', 'Segoe UI Variable', 'Inter', 'PingFang SC', sans-serif;
    --font-body: 'DingTalk JinBuTi', 'Segoe UI Variable', 'Inter', 'PingFang SC', sans-serif;
}
```

**签名元素：**
- Acrylic 材质：`backdrop-filter: blur(30px) saturate(125%); background: rgba(255,255,255,0.7);`
- Reveal Highlight（光源跟随）：鼠标悬停时卡片边框出现微妙的光晕效果，使用 JS `mousemove` + `radial-gradient` 实现
- 液态玻璃层级：多层半透明叠加，前景更不透明，背景更透明
- 微妙的 1px 边框：`border: 1px solid rgba(0,0,0,0.06);`
- 圆角较小（8px），比 Apple 更克制
- 浅色/深色模式均支持，深色模式使用 `#202020` 而非纯黑

**动画缓动：** `cubic-bezier(0.33, 0, 0, 1)` — Fluent motion 标准曲线，比 Material 更柔和

**版式规范：**
- 封面页：浅灰背景 + Acrylic 卡片居中，蓝色强调标题，底部元信息行
- 数据看板：白色/浅灰背景，Acrylic 卡片网格 + 蓝色/紫色数字
- 四象限卡片：白色背景，带微妙阴影的白色卡片 + 左侧彩色竖条
- 策略页：浅灰背景，白色卡片 + 顶部蓝色强调条 + Reveal Highlight hover
- 总结页：深色背景（#202020）+ Acrylic 覆盖 + 蓝色强调文字

---

## 风格 8: IBM Carbon Design

**视觉基调：** 理性严谨、黑白灰蓝、信息密度高、网格精确

**适用场景：** 大数据后台汇报、云计算、金融系统、复杂 SaaS

**布局特点：** 严格的 8px 网格系统、高信息密度、冷静色彩

**字体：**
- 中文：`DingTalk JinBuTi`
- 英文：`IBM Plex Sans` (400/500/600)
- 等宽：`IBM Plex Mono`
- 完整声明：`'DingTalk JinBuTi', 'IBM Plex Sans', 'PingFang SC', sans-serif`

**CDN 链接：**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@1.0.3/font.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">
```

**配色：**
```css
:root {
    /* Gray 色阶 — Carbon 标志性 */
    --carbon-gray-100: #161616;
    --carbon-gray-90: #262626;
    --carbon-gray-80: #393939;
    --carbon-gray-70: #525252;
    --carbon-gray-60: #6f6f6f;
    --carbon-gray-50: #8d8d8d;
    --carbon-gray-30: #c6c6c6;
    --carbon-gray-20: #e0e0e0;
    --carbon-gray-10: #f4f4f4;
    --carbon-white: #ffffff;

    /* 主色 — IBM Blue */
    --carbon-blue-60: #0f62fe;
    --carbon-blue-70: #0043ce;
    --carbon-blue-80: #002d9c;
    --carbon-blue-20: #d0e2ff;

    /* 功能色 */
    --carbon-green-40: #42be65;
    --carbon-red-60: #da1e28;
    --carbon-yellow-30: #f1c21b;
    --carbon-purple-60: #8a3ffc;
    --carbon-teal-50: #009d9a;

    /* 字体 */
    --font-display: 'DingTalk JinBuTi', 'IBM Plex Sans', 'PingFang SC', sans-serif;
    --font-body: 'DingTalk JinBuTi', 'IBM Plex Sans', 'PingFang SC', sans-serif;
    --font-mono: 'IBM Plex Mono', 'Menlo', monospace;
}
```

**签名元素：**
- 严格的 8px 网格：所有间距为 8 的倍数（8, 16, 24, 32, 48px）
- 左侧 4px 彩色竖条：卡片左边缘的状态指示条
- 高对比度分隔线：`border-bottom: 1px solid var(--carbon-gray-20);`
- 无圆角或极小圆角（0-4px），方正严肃
- 数据表格风格：行间交替灰色背景
- 暗色模式使用 `--carbon-gray-100` (#161616)，非纯黑

**动画缓动：** `cubic-bezier(0.2, 0, 0.38, 0.9)` — Carbon productive motion，快速精确

**版式规范：**
- 封面页：白色背景 + 左对齐大标题 + 蓝色下划线装饰 + 右侧几何色块
- 数据看板：浅灰背景（#f4f4f4），白色卡片 + 左侧彩色竖条 + 大号数字
- 四象限卡片：白色背景，灰色边框卡片 + 顶部标题栏（深灰背景）
- 策略页：白色背景，三列卡片 + 蓝色图标 + 底部标签行
- 总结页：深灰背景（#161616）+ 蓝色强调大标题 + 白色描述

---

## 风格 9: Atlassian Design

**视觉基调：** 活泼协作、鲜艳色彩、内容优先、团队感

**适用场景：** 团队协作汇报、项目管理复盘、内部工具展示

**布局特点：** 鲜艳但专业的色彩、内容可读性优先、协作感装饰

**字体：**
- 中文：`DingTalk JinBuTi`
- 英文：`Charlie Display` (Atlassian 品牌) / `Inter` (Web 回退)
- 完整声明：`'DingTalk JinBuTi', 'Inter', 'PingFang SC', sans-serif`

**CDN 链接：**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@1.0.3/font.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
```

**配色：**
```css
:root {
    /* 表面 */
    --atl-surface: #ffffff;
    --atl-surface-sunken: #f7f8f9;
    --atl-surface-raised: #ffffff;
    --atl-text: #172b4d;
    --atl-text-subtle: #626f86;
    --atl-border: #dfe1e6;

    /* 品牌蓝 — Atlassian Blue */
    --atl-blue-700: #0052cc;
    --atl-blue-500: #0065ff;
    --atl-blue-100: #deebff;
    --atl-blue-75: #b3d4ff;

    /* 功能色 — 鲜艳活泼 */
    --atl-green-700: #006644;
    --atl-green-100: #e3fcef;
    --atl-yellow-700: #ff8b00;
    --atl-yellow-100: #fffae6;
    --atl-red-700: #de350b;
    --atl-red-100: #ffebe6;
    --atl-purple-700: #5243aa;
    --atl-purple-100: #eae6ff;
    --atl-teal-700: #008da6;
    --atl-teal-100: #e6fcff;

    /* 圆角 */
    --atl-radius: 3px;
    --atl-radius-md: 8px;
    --atl-radius-lg: 12px;

    /* 阴影 */
    --atl-shadow-overlay: 0 4px 8px -2px rgba(9,30,66,0.25), 0 0 1px rgba(9,30,66,0.31);
    --atl-shadow-raised: 0 1px 1px rgba(9,30,66,0.25), 0 0 1px rgba(9,30,66,0.13);

    /* 字体 */
    --font-display: 'DingTalk JinBuTi', 'Inter', 'PingFang SC', sans-serif;
    --font-body: 'DingTalk JinBuTi', 'Inter', 'PingFang SC', sans-serif;
}
```

**签名元素：**
- Lozenge 标签：小型彩色状态标签（如 "已完成"、"进行中"），圆角 3px
- 头像组：重叠的圆形头像组，表示团队协作
- 鲜艳的 tonal 背景：使用 `*-100` 浅色作为卡片背景 + `*-700` 深色作为文字/图标
- 看板风格布局：列式排列，可用于展示项目进度
- 内容优先的间距：大量行间距，确保可读性
- 小圆角（3px-8px），比 Material 更紧凑

**动画缓动：** `cubic-bezier(0.15, 1, 0.3, 1)` — 轻快弹性

**版式规范：**
- 封面页：白色背景 + 蓝色大标题 + 彩色 Lozenge 标签行 + 头像组装饰
- 数据看板：浅灰背景，白色卡片 + 左侧彩色圆点 + 大号数字
- 四象限卡片：白色背景，彩色 tonal 背景卡片（蓝/绿/黄/紫浅色底）
- 策略页：白色背景，看板风格三列 + 顶部彩色标题栏
- 总结页：蓝色背景（#0052cc）+ 白色文字 + 团队头像组装饰

---

## 风格 10: Salesforce Lightning

**视觉基调：** 业务流驱动、高密度信息、专业蓝色调

**适用场景：** CRM/ERP 汇报、销售漏斗分析、客服系统复盘

**布局特点：** 高信息密度、路径/进度条组件、业务蓝图风格

**字体：**
- 中文：`DingTalk JinBuTi`
- 英文：`Salesforce Sans` / `Lato` (Web 回退)
- 完整声明：`'DingTalk JinBuTi', 'Lato', 'PingFang SC', sans-serif`

**CDN 链接：**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@1.0.3/font.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap">
```

**配色：**
```css
:root {
    /* 表面 */
    --slds-bg: #f3f3f3;
    --slds-surface: #ffffff;
    --slds-text: #080707;
    --slds-text-secondary: #444444;
    --slds-border: #dddbda;

    /* 品牌色 — Salesforce 蓝 */
    --slds-brand: #1b96ff;
    --slds-brand-dark: #0176d3;
    --slds-brand-light: #d8edff;

    /* 功能色 */
    --slds-success: #2e844a;
    --slds-success-light: #cdefc4;
    --slds-warning: #dd7a01;
    --slds-warning-light: #fef0cd;
    --slds-error: #ea001e;
    --slds-error-light: #feded8;
    --slds-purple: #9050e9;
    --slds-purple-light: #ece1f9;

    /* 圆角 */
    --slds-radius: 4px;
    --slds-radius-md: 8px;
    --slds-radius-lg: 12px;

    /* 阴影 */
    --slds-shadow: 0 2px 2px rgba(0,0,0,0.1);
    --slds-shadow-lg: 0 2px 8px rgba(0,0,0,0.16);

    /* 字体 */
    --font-display: 'DingTalk JinBuTi', 'Lato', 'PingFang SC', sans-serif;
    --font-body: 'DingTalk JinBuTi', 'Lato', 'PingFang SC', sans-serif;
}
```

**签名元素：**
- Path 路径助手：顶部水平进度条，分段显示业务阶段（如 "线索 → 机会 → 报价 → 成交"）
- 活动时间轴：左侧竖线 + 圆点 + 右侧内容卡片
- 高密度数据卡片：紧凑的卡片布局，每张卡片包含标题 + 数字 + 趋势箭头
- 蓝色顶部导航条：页面顶部的品牌蓝色条
- 图标徽章：圆形彩色背景 + 白色图标
- 小圆角（4px），方正专业

**动画缓动：** `cubic-bezier(0.4, 0, 0.2, 1)` — 标准 ease-in-out

**版式规范：**
- 封面页：白色背景 + 顶部蓝色条 + 大标题 + 路径进度条装饰
- 数据看板：浅灰背景，白色卡片 + 趋势箭头 + 蓝色/绿色数字
- 四象限卡片：白色背景，带阴影的白色卡片 + 圆形彩色图标徽章
- 策略页：白色背景，三列卡片 + 顶部蓝色标题栏 + 底部标签
- 总结页：品牌蓝渐变背景 + 白色文字 + 路径进度条总结

---

## 风格 11: Ant Design

**视觉基调：** 确定性与幸福感、蓝色主色、清晰专业、中文友好

**适用场景：** 中后台系统汇报、出海企业、技术团队复盘

**布局特点：** 清晰的信息层级、丰富的组件化布局、中文排版优化

**字体：**
- 中文：`DingTalk JinBuTi`
- 英文回退：系统字体栈
- 完整声明：`'DingTalk JinBuTi', -apple-system, 'Segoe UI', 'PingFang SC', sans-serif`

**CDN 链接：**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@1.0.3/font.css">
```

**配色：**
```css
:root {
    /* 表面 */
    --ant-bg: #f5f5f5;
    --ant-surface: #ffffff;
    --ant-text: rgba(0,0,0,0.88);
    --ant-text-secondary: rgba(0,0,0,0.65);
    --ant-text-tertiary: rgba(0,0,0,0.45);
    --ant-border: #d9d9d9;
    --ant-border-secondary: #f0f0f0;

    /* 品牌色 — Ant Design 蓝 */
    --ant-primary: #1677ff;
    --ant-primary-hover: #4096ff;
    --ant-primary-bg: #e6f4ff;
    --ant-primary-border: #91caff;

    /* 功能色 */
    --ant-success: #52c41a;
    --ant-success-bg: #f6ffed;
    --ant-warning: #faad14;
    --ant-warning-bg: #fffbe6;
    --ant-error: #ff4d4f;
    --ant-error-bg: #fff2f0;
    --ant-purple: #722ed1;
    --ant-purple-bg: #f9f0ff;
    --ant-cyan: #13c2c2;
    --ant-cyan-bg: #e6fffb;

    /* 圆角 — Ant Design 5.0 */
    --ant-radius-sm: 4px;
    --ant-radius: 6px;
    --ant-radius-lg: 8px;

    /* 阴影 */
    --ant-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
    --ant-shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02);

    /* 字体 */
    --font-display: 'DingTalk JinBuTi', -apple-system, 'Segoe UI', 'PingFang SC', sans-serif;
    --font-body: 'DingTalk JinBuTi', -apple-system, 'Segoe UI', 'PingFang SC', sans-serif;
}
```

**签名元素：**
- 统计数值组件：大号数字 + 小号标签 + 趋势箭头（↑↓）+ 百分比变化
- Tag 标签：小型彩色标签，圆角 4px，浅色背景 + 深色文字
- 步骤条：水平/垂直步骤指示器，圆形序号 + 连接线
- 分割线：带文字的分割线 `——— 标题 ———`
- 卡片阴影：Ant Design 标志性的三层阴影
- 中等圆角（6px），平衡专业与友好

**动画缓动：** `cubic-bezier(0.645, 0.045, 0.355, 1)` — Ant Design 标准曲线

**版式规范：**
- 封面页：白色背景 + 蓝色大标题 + Tag 标签行 + 步骤条装饰
- 数据看板：浅灰背景，白色卡片 + 统计数值组件（数字 + 趋势）
- 四象限卡片：白色背景，带阴影的白色卡片 + 蓝色/彩色图标 + Tag 标签
- 策略页：白色背景，三列卡片 + 步骤条连接 + 底部 Tag 标签
- 总结页：蓝色渐变背景（#1677ff → #4096ff）+ 白色文字

---

## CSS 注意事项

### 取反 CSS 函数

**错误 — 浏览器静默忽略：**
```css
right: -clamp(28px, 3.5vw, 44px);   /* 无效 */
```

**正确 — 使用 calc() 包裹：**
```css
right: calc(-1 * clamp(28px, 3.5vw, 44px));  /* 有效 */
```
