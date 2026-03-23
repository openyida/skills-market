# 幻灯片数据源结构定义

MVC 架构中的 Model 层。定义 `slide-data.js` 的完整数据结构，供渲染引擎消费。

## 文件格式

```javascript
const SLIDE_DATA = [
    { id: 1, type: 'cover', ... },
    { id: 2, type: 'toc', ... },
    // ...
];
```

## 通用字段

每个 slide 对象都包含以下通用字段：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | ✅ | 幻灯片编号，从 1 开始递增 |
| `type` | string | ✅ | 版式类型，见下方 15 种版式 |
| `section` | string | ✅ | 所属章节标签（如 `'PART 01 · FY26 RESULTS'`） |
| `title` | string | ✅ | 主标题 |
| `subtitle` | string | ❌ | 副标题 |
| `highlight` | string | ❌ | 底部高亮框文字 |
| `highlightAccent` | string | ❌ | 高亮框中需要强调色的词 |
| `gridBg` | boolean | ❌ | 是否使用网格背景装饰 |
| `centered` | boolean | ❌ | 内容是否居中对齐 |
| `content` | varies | ✅ | 版式相关的结构化内容，格式因 type 而异 |

---

## 15 种版式类型

### 1. `cover` — 封面页

```javascript
{
    type: 'cover',
    section: 'ANNUAL REPORT & STRATEGY',
    title: 'FY26 年度总结\n与 FY27 战略思考',  // \n 换行
    subtitle: 'Your Name ｜ Product Team / Annual Report',
    keywords: ['低代码', 'AI', '开发者平台', '生态'],  // 关键词云
    meta: '2026.03 ｜ Product Team'  // 底部元信息
}
```

### 2. `toc` — 目录页

```javascript
{
    type: 'toc',
    section: 'CONTENTS',
    title: '汇报目录',
    content: [
        { number: '01', label: 'FY26 核心结果总览' },
        { number: '02', label: 'FY26 五大专项复盘' },
        // ...最多 6 项
    ]
}
```

### 3. `quadrant` — 四象限卡片

每张卡片包含图标、标题和列表要点。

```javascript
{
    type: 'quadrant',
    title: 'FY26 核心结果总览',
    subtitle: '夯实产品、验证商业、启动平台转型',
    content: [
        {
            icon: '🛠',
            title: '产品基础体验持续升级',
            // 方式一：desc 字符串（简短描述）
            desc: '围绕主链路持续治理，支撑稳定性与续费',
            // 方式二：items 数组（列表要点，与 desc 二选一）
            items: ['NPS 从 46 提升至 51', '37 次发布', '支撑续费体系'],
            titleColor: 'accent'  // 可选：标题颜色 key
        },
        // ...共 4 张卡片
    ],
    highlight: '底部高亮总结文字'
}
```

### 4. `quadrant-badges` — 带徽章的四象限

与 `quadrant` 类似，但每张卡片带有彩色徽章标签。

```javascript
{
    type: 'quadrant-badges',
    title: 'FY27 核心判断',
    centered: true,
    content: [
        {
            badge: '市场判断',           // 徽章文字
            badgeColor: 'accent',        // accent | magenta | blue | emerald | amber
            title: '增长承压',
            desc: '低代码市场增长放缓'
        },
        // ...共 4 张卡片
    ],
    highlight: '结论：从低代码工具 → AI 开发者平台',
    highlightAccent: 'AI 开发者平台'  // 高亮框中强调的词
}
```

### 5. `metrics-dashboard` — 数据看板（三列分组）

```javascript
{
    type: 'metrics-dashboard',
    title: 'FY26 关键成果数据',
    content: [
        {
            group: '产品交付',           // 分组标题
            metrics: [
                { value: '37', label: '产品迭代', color: 'accent' },
                { value: '400+', label: '消化需求', color: 'accent' },
                { value: '4000万+', label: '助力续费', color: 'amber', span: 2 }
                // span: 2 表示占两列宽度
            ]
        },
        // ...共 3 个分组
    ]
}
```

**metric 对象字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `value` | string | 数值（如 `'4000万+'`、`'~200 ⭐'`） |
| `label` | string | 数值描述标签 |
| `color` | string | 颜色 key：`accent` / `amber` / `emerald` / `secondary` / `magenta` / `blue` |
| `span` | number | 可选，占据的网格列数（默认 1） |

### 6. `two-col` — 双列布局

左右两列，每列可包含列表要点或指标数据。

```javascript
{
    type: 'two-col',
    title: '专项一：产品体验持续治理',
    subtitle: '可选副标题',
    content: {
        left: {
            title: '🔧 关键产出',
            titleColor: 'accent',       // 可选：标题颜色 key
            items: [                     // 列表要点
                '持续推进主链路体验优化',
                '完成开发者社区发布',
            ]
        },
        right: {
            title: '📊 核心数据',
            // 可以用 items 或 metrics，或两者兼有
            metrics: [
                { value: '37次', label: '产品发布', color: 'accent' },
                { value: '581', label: '服务客户', color: 'accent' }
            ]
        }
    },
    highlight: '底部高亮总结'
}
```

**列对象字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 列标题 |
| `titleColor` | string | 可选，标题颜色 key |
| `items` | string[] 或 object[] | 列表要点（字符串或 `{bold, text}` 对象） |
| `metrics` | metric[] | 指标数据数组 |

### 7. `two-col-with-flow` — 双列 + 顶部流程条

在 `two-col` 基础上增加顶部水平流程节点。

```javascript
{
    type: 'two-col-with-flow',
    title: '推动个人工作流 AI 化',
    subtitle: '副标题',
    flow: ['📥 输入', '🔍 分析', '🔄 流转', '📄 文档', '🚀 发布'],
    content: {
        left: { title: '关键产出', items: [...] },
        right: { title: '阶段价值', items: [...] }
    }
}
```

### 8. `two-col-priority` — 双列 + 优先级徽章

每列带有优先级徽章和彩色顶部边框。

```javascript
{
    type: 'two-col-priority',
    title: '布局新市场',
    content: {
        left: {
            badge: '优先级 HIGH',
            badgeColor: 'amber',
            icon: '🏢',
            title: '私有化',
            items: [
                { bold: 'S1：', text: '优先补齐稳定性' },
                { text: '强化多租户能力' }
            ]
        },
        right: {
            badge: '优先级 MEDIUM',
            badgeColor: 'blue',
            icon: '🌍',
            title: '国际化',
            items: [...]
        }
    },
    highlight: '先夯实私有化，再轻量验证国际化'
}
```

### 9. `issues` — 问题列表

左侧编号 + 标题 + 描述的问题卡片列表。

```javascript
{
    type: 'issues',
    title: '待提升的关键问题',
    subtitle: '从平台增长角度看，仍存在五个关键短板',
    content: [
        { number: '01', title: '问题标题', desc: '问题描述' },
        { number: '02', title: '问题标题', desc: '问题描述' },
        // ...最多 5 个
    ]
}
```

### 10. `pyramid` — 金字塔/层级结构

三层金字塔：顶层（核心定位）→ 中层（三列受众）→ 底层（三列转变）。

```javascript
{
    type: 'pyramid',
    title: 'FY27 战略定位',
    content: {
        top: 'Product = AI-Driven Application Development Platform',
        mid: [
            { icon: '👤', title: '对业务用户', desc: '更智能的应用体验' },
            { icon: '👨‍💻', title: '对开发者', desc: '更高效的 AI 构建方式' },
            { icon: '🤝', title: '对生态伙伴', desc: '供给、分发与变现路径' }
        ],
        base: [
            { text: '从卖工具走向做平台', color: 'accent' },
            { text: '从手工搭建走向生成式构建', color: 'magenta' },
            { text: '从产品交付走向生态连接', color: 'blue' }
        ]
    }
}
```

### 11. `three-strategy` — 三列策略

三列并排的策略卡片，每列带徽章、图标、副标题和列表。

```javascript
{
    type: 'three-strategy',
    title: 'FY27 核心策略总览',
    subtitle: '围绕三大战略抓手推进',
    content: [
        {
            badge: '策略一',
            badgeColor: 'accent',
            borderColor: 'accent',       // 顶部边框颜色
            icon: '🔄',
            title: '新方式',
            subtitle: '应用构建模式升级',
            items: ['从传统低代码走向 AI 驱动生成式构建', 'Vibe Coding、Prompt Pass、AI Skill']
        },
        // ...共 3 列
    ]
}
```

### 12. `indicators` — 指标体系

四象限网格，每个卡片包含带彩色圆点的标题和指标列表。

```javascript
{
    type: 'indicators',
    title: 'FY27 建议重点指标',
    subtitle: '从四个维度建立统一指标体系',
    content: [
        {
            title: '业务指标',
            dotColor: 'amber',           // 圆点颜色
            items: ['GAAP / 营收', '续费率', '私有化合同额']
        },
        // ...共 4 组
    ]
}
```

### 13. `support` — 支持诉求

三列卡片，每张包含图标、标题、现状和建议。

```javascript
{
    type: 'support',
    title: '所需支持与关键建议',
    subtitle: '副标题',
    content: [
        {
            icon: '🎯',
            title: '私有化投入需要更明确的战略决策',
            current: '已验证市场机会，但资源不足',
            suggestion: '需要明确目标、节奏和人员投入'
        },
        // ...共 3 张
    ]
}
```

### 14. `summary` — 总结对比页

左右两列对比 + 可选的箭头连接 + 底部高亮。

```javascript
{
    type: 'summary',
    title: '总结：FY26 打基础，FY27 做升级',
    content: {
        left: {
            title: 'FY26 完成',
            titleColor: 'accent',
            items: ['完成基础体验夯实', '验证私有化机会', ...]
        },
        right: {
            title: 'FY27 目标',
            titleColor: 'magenta',
            items: ['Upgrade to AI-era developer platform', ...]
        }
    },
    arrow: '从基础建设 → 平台升级',  // 两列之间的箭头标签
    highlight: '底部高亮总结'
}
```

### 15. `qa` — Q&A 结束页

```javascript
{
    type: 'qa',
    title: '谢谢',
    subtitle: 'Q&A',
    keywords: ['产品', 'AI', '开发者平台', '私有化'],
    meta: 'Your Name ｜ Product Team ｜ Thank You'
}
```

---

## 颜色 Key 映射

数据中的颜色 key 映射到 CSS 变量：

| Key | CSS 变量 | 用途 |
|-----|----------|------|
| `accent` | `var(--accent-primary)` | 主强调色 |
| `secondary` / `magenta` | `var(--accent-secondary)` | 次强调色 |
| `amber` | `var(--accent-amber)` | 琥珀色（商业/警告） |
| `emerald` | `var(--accent-emerald)` | 翡翠色（生态/成功） |
| `blue` | `var(--accent-blue)` | 蓝色（信息/策略） |

---

## 列表项格式

列表项支持两种格式：

```javascript
// 格式一：纯字符串
items: ['持续推进主链路体验优化', '完成开发者社区发布']

// 格式二：带加粗前缀的对象
items: [
    { bold: 'S1：', text: '优先补齐稳定性' },
    { text: '强化多租户能力' }  // bold 可省略
]
```

---

## 典型汇报结构

一份完整的年度汇报通常包含以下幻灯片序列：

```
1.  cover              — 封面
2.  toc                — 目录
3.  quadrant           — 核心结果总览
4.  metrics-dashboard  — 关键数据看板
5-9. two-col / two-col-with-flow / two-col-priority — 专项复盘（每项一页）
10. quadrant           — 年度总结：做得好的
11. issues             — 年度总结：待提升的
12. quadrant-badges    — 核心判断
13. pyramid            — 战略定位
14. three-strategy     — 核心策略总览
15-17. two-col / two-col-priority — 策略详解（每项一页）
18. quadrant           — 关键落地动作
19. indicators         — 指标体系
20. support            — 支持诉求
21. summary            — 总结对比
22. qa                 — Q&A
```
