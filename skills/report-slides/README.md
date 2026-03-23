# Report Slides

将汇报原始内容（文本 / Markdown）一键转换为零依赖、动画丰富的 HTML 演示文稿。

## ✨ 特性

- **零依赖**：生成单个自包含 HTML 文件，双击即可打开，无需安装任何工具
- **11 种设计风格**：Apple / Google Material / Microsoft Fluent / IBM Carbon / Atlassian / Salesforce Lightning / Ant Design / Neon Cyber / Swiss Modern / Dark Botanical / Paper & Ink
- **15 种版式**：封面、目录、数据看板、双栏、四象限、金字塔、三列策略等
- **MVC 架构**：数据层（slide-data.js）、渲染层（slide-renderer.js）、主题层（demo-*.html）分离，改文案只动数据、改风格只动 CSS 变量
- **画廊模式**：一次生成所有风格预览，毛玻璃侧边栏 + iframe 切换 + 键盘快捷键
- **智能高亮**：自动识别关键数字（`.hl-num`）和产品名/术语（`.hl-entity`）
- **视口适配**：所有内容严格适配 100vh，响应式 `clamp()` 缩放，永不滚动
- **Markdown 解析**：支持从 Markdown 文件自动映射到幻灯片结构

## 🚀 快速开始

### 触发词

对 AI 助手说以下任意一句即可触发：

- "帮我做个汇报 PPT"
- "生成年度总结演示文稿"
- "把这份 Markdown 转成汇报材料"
- "report slides"

### 典型流程

```
提供内容（文本/Markdown） → 选择风格 → 生成 HTML → 浏览器打开
```

## 📁 文件说明

| 文件 | 用途 |
|------|------|
| `SKILL.md` | 技能核心定义（Agent 读取） |
| `STYLE_PRESETS.md` | 11 种风格预设：配色、字体、签名元素 |
| `viewport-base.css` | 视口适配基础 CSS |
| `html-template.md` | HTML 结构与 JS 功能模板 |
| `animation-patterns.md` | CSS/JS 动画参考 |
| `md-parsing.md` | Markdown → 幻灯片解析规则 |
| `slide-data-schema.md` | 结构化数据 Schema、15 种版式定义 |
| `slide-renderer-template.md` | 渲染引擎模板 |
| `slide-base-css.md` | 共享基础样式 |
| `gallery-template.md` | 画廊门户模板 |

## 🎨 风格预览

| 风格 | 视觉基调 | 适用场景 |
|------|----------|----------|
| Apple | 极简留白、毛玻璃 | 高管汇报、产品发布 |
| Google Material | Material You、明快 | 技术汇报、团队复盘 |
| Microsoft Fluent | 光影通透、液态玻璃 | 跨端应用汇报 |
| IBM Carbon | 理性严谨、高信息密度 | 大数据、云计算 |
| Neon Cyber | 深色科技感、霓虹高光 | 技术方向、创新项目 |
| Swiss Modern | 瑞士风格、网格 | 数据驱动汇报 |
| Dark Botanical | 暗色优雅、暖色调 | 品牌汇报 |
| Paper & Ink | 编辑风、文学感 | 战略分析 |
| Atlassian | 活泼协作、鲜艳色彩 | 团队协作 |
| Salesforce Lightning | 业务流驱动、专业蓝 | CRM/ERP |
| Ant Design | 确定性与幸福感 | 中后台系统 |

## 📄 License

MIT
