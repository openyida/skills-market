# 共享基础样式模板

MVC 架构中所有主题共用的布局、动画、组件样式。保存为 `slide-base.css`，在每个 `demo-*.html` 主题文件中通过 `<link>` 引入。

## 使用方式

```html
<link rel="stylesheet" href="slide-base.css">
```

## 完整代码

将以下内容保存为 `slide-base.css`：

```css
/* =============================================
   SLIDE BASE CSS — 所有主题共用的布局、动画、组件样式
   ============================================= */

/* === RESET & BASE === */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; overflow-x: hidden; }
body { font-family: var(--font-body); color: var(--text-primary); background: var(--bg-primary); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

/* === SLIDE CONTAINER === */
.slide {
    height: 100vh; height: 100dvh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--slide-padding);
    position: relative;
    scroll-snap-align: start;
    background: var(--bg-primary);
}

/* Grid background decoration */
.slide.grid-bg::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--slide-bg-gradient, none);
    pointer-events: none;
}
.slide.grid-bg::after {
    content: '';
    position: absolute; inset: 0;
    background-image: var(--grid-pattern, none);
    opacity: 0.03;
    pointer-events: none;
}

/* === SLIDE CONTENT WRAPPER === */
.slide-content {
    width: 100%;
    max-width: min(95vw, 1200px);
    display: flex;
    flex-direction: column;
    gap: var(--content-gap);
    z-index: 1;
}

/* === REVEAL ANIMATION === */
.reveal {
    opacity: 0;
    transform: translateY(clamp(8px, 1.5vh, 20px));
    transition: opacity var(--anim-duration, 0.7s) var(--ease-curve, cubic-bezier(0.25, 0.46, 0.45, 0.94)),
                transform var(--anim-duration, 0.7s) var(--ease-curve, cubic-bezier(0.25, 0.46, 0.45, 0.94));
}
.slide.visible .reveal { opacity: 1; transform: translateY(0); }
.slide.visible .reveal:nth-child(1) { transition-delay: 0.05s; }
.slide.visible .reveal:nth-child(2) { transition-delay: 0.15s; }
.slide.visible .reveal:nth-child(3) { transition-delay: 0.25s; }
.slide.visible .reveal:nth-child(4) { transition-delay: 0.35s; }
.slide.visible .reveal:nth-child(5) { transition-delay: 0.45s; }
.slide.visible .reveal:nth-child(6) { transition-delay: 0.55s; }

.reveal-scale {
    opacity: 0;
    transform: scale(0.95);
    transition: opacity var(--anim-duration, 0.7s) var(--ease-curve),
                transform var(--anim-duration, 0.7s) var(--ease-curve);
}
.slide.visible .reveal-scale { opacity: 1; transform: scale(1); }

/* === ANIMATIONS === */
@keyframes scan-line { 0% { top: -2px; } 100% { top: 100%; } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(clamp(-4px, -0.5vh, -8px)); } }
@keyframes pulse-glow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }

/* === PROGRESS BAR === */
.progress-bar { position: fixed; top: 0; left: 0; height: 2px; background: var(--progress-gradient, var(--accent-primary)); z-index: 9999; transition: width 0.15s ease; }

/* === NAVIGATION DOTS === */
.nav-dots { position: fixed; right: clamp(8px, 1.5vw, 20px); top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: clamp(4px, 0.5vh, 8px); z-index: 9998; }
.nav-dot { width: clamp(6px, 0.6vw, 10px); height: clamp(6px, 0.6vw, 10px); border-radius: var(--dot-radius, 50%); background: var(--dot-inactive, rgba(128,128,128,0.4)); border: none; cursor: pointer; transition: all 0.3s ease; padding: 0; }
.nav-dot.active { background: var(--dot-active, var(--accent-primary)); box-shadow: 0 0 8px var(--dot-glow, transparent); transform: scale(1.4); }
.nav-dot:hover { background: var(--dot-active, var(--accent-primary)); }

/* === SLIDE COUNTER === */
.slide-counter { position: fixed; bottom: clamp(12px, 2vh, 24px); right: clamp(16px, 2vw, 32px); font-family: var(--font-display); font-size: var(--small-size); color: var(--text-muted, var(--text-secondary)); z-index: 9998; letter-spacing: 0.1em; }
.slide-counter .current { color: var(--accent-primary); }

/* === TYPOGRAPHY === */
.slide-title { font-family: var(--font-display); font-size: var(--h2-size); font-weight: 600; color: var(--text-primary); letter-spacing: -0.02em; line-height: 1.2; }
.slide-subtitle { font-size: var(--body-size); color: var(--text-secondary); line-height: 1.5; max-width: 60ch; }
.accent-text { color: var(--accent-primary); }
.section-label { font-family: var(--font-display); font-size: var(--small-size); color: var(--accent-primary); text-transform: uppercase; letter-spacing: 0.2em; font-weight: 500; margin-bottom: clamp(0.3rem, 0.8vh, 0.8rem); }

/* === COVER === */
.cover-title { font-family: var(--font-display); font-size: clamp(1.8rem, 5.5vw, 4.5rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; background: var(--cover-title-gradient, linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 100%)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.cover-sub { font-family: var(--font-body); font-size: clamp(0.85rem, 1.8vw, 1.3rem); color: var(--text-secondary); font-weight: 400; margin-top: clamp(0.3rem, 0.8vh, 0.8rem); }
.cover-meta { font-size: var(--small-size); color: var(--text-muted, var(--text-secondary)); letter-spacing: 0.1em; }
.scan-line { position: absolute; left: 0; width: 100%; height: 2px; background: var(--scan-line-color, linear-gradient(90deg, transparent, rgba(128,128,128,0.2), transparent)); animation: scan-line 8s linear infinite; opacity: 0.3; pointer-events: none; }

/* === KEYWORD CLOUD === */
.keyword-cloud { display: flex; flex-wrap: wrap; gap: clamp(0.3rem, 0.6vw, 0.6rem); justify-content: center; }
.keyword { font-family: var(--font-display); font-size: var(--small-size); color: var(--text-muted, var(--text-secondary)); padding: clamp(0.15rem, 0.3vw, 0.25rem) clamp(0.4rem, 0.8vw, 0.7rem); border: 1px solid var(--keyword-border, rgba(128,128,128,0.15)); border-radius: var(--keyword-radius, 100px); transition: all 0.3s ease; }
.keyword:nth-child(odd) { color: var(--accent-primary); border-color: var(--keyword-accent-border, rgba(128,128,128,0.2)); }
.keyword:nth-child(3n) { color: var(--accent-secondary, var(--accent-primary)); border-color: var(--keyword-secondary-border, rgba(128,128,128,0.2)); }

/* === CARD COMPONENTS === */
.info-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--card-radius, clamp(8px, 1vw, 16px)); padding: clamp(0.6rem, 1.5vw, 1.5rem); backdrop-filter: var(--card-blur, none); transition: all 0.3s ease; }
.info-card:hover { background: var(--card-bg-hover, var(--card-bg)); border-color: var(--card-border-hover, var(--accent-primary)); box-shadow: var(--card-shadow-hover, none); }
.info-card h3 { font-family: var(--font-display); font-size: var(--h3-size); font-weight: 600; margin-bottom: clamp(0.2rem, 0.5vh, 0.5rem); color: var(--text-primary); }
.info-card p, .info-card li { font-size: var(--small-size); color: var(--text-secondary); line-height: 1.5; }
.info-card .card-icon { font-size: clamp(1.2rem, 2.5vw, 2rem); margin-bottom: clamp(0.2rem, 0.5vh, 0.5rem); }

/* === METRIC COMPONENTS === */
.metric { text-align: center; padding: clamp(0.4rem, 1vw, 1rem); }
.metric-value { font-family: var(--font-display); font-size: clamp(1.5rem, 4vw, 3.5rem); font-weight: 700; color: var(--accent-primary); line-height: 1; letter-spacing: -0.03em; white-space: nowrap; }
.metric-label { font-size: var(--small-size); color: var(--text-secondary); margin-top: clamp(0.15rem, 0.3vh, 0.4rem); }

/* === LAYOUT GRIDS === */
.quadrant-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(0.4rem, 1vw, 1rem); max-width: min(95vw, 1100px); margin: 0 auto; }
.three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(0.4rem, 1vw, 1rem); }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(0.6rem, 1.5vw, 1.5rem); }
@media (max-width: 768px) { .three-col { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .quadrant-grid, .two-col { grid-template-columns: 1fr; } }

/* === TOC === */
.toc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(0.4rem, 1vw, 1rem); max-width: min(95vw, 1000px); margin: 0 auto; }
.toc-item { background: var(--card-bg); border: 1px solid var(--card-border-subtle, var(--card-border)); border-radius: var(--card-radius, clamp(8px, 1vw, 16px)); padding: clamp(0.6rem, 1.2vw, 1.2rem); cursor: pointer; transition: all 0.3s ease; }
.toc-item:hover { border-color: var(--accent-primary); box-shadow: var(--card-shadow-hover, none); }
.toc-number { font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 700; color: var(--accent-primary); opacity: 0.4; line-height: 1; }
.toc-label { font-family: var(--font-display); font-size: var(--body-size); font-weight: 500; color: var(--text-primary); margin-top: clamp(0.2rem, 0.4vh, 0.4rem); }
@media (max-width: 768px) { .toc-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .toc-grid { grid-template-columns: 1fr; } }

/* === INLINE HIGHLIGHTS (subtle visual anchors) === */
.hl-num {
    color: var(--accent-primary);
    font-weight: 600;
    font-family: var(--font-display);
    letter-spacing: -0.01em;
}
.hl-entity {
    color: var(--text-primary);
    font-weight: 500;
    background: var(--entity-bg, rgba(128, 128, 128, 0.08));
    padding: 0.05em 0.3em;
    border-radius: 3px;
    white-space: nowrap;
}

/* === LIST STYLES === */
.styled-list { list-style: none; display: flex; flex-direction: column; gap: clamp(0.3rem, 0.6vh, 0.6rem); }
.styled-list li { font-size: var(--small-size); color: var(--text-secondary); padding-left: clamp(0.8rem, 1.5vw, 1.2rem); position: relative; line-height: 1.5; }
.styled-list li::before { content: var(--list-marker, '▸'); position: absolute; left: 0; color: var(--accent-primary); font-weight: 700; }

/* === FLOW / PIPELINE === */
.flow-row { display: flex; align-items: center; gap: clamp(0.3rem, 1vw, 1rem); flex-wrap: wrap; justify-content: center; }
.flow-node { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--flow-radius, clamp(6px, 0.8vw, 12px)); padding: clamp(0.4rem, 1vw, 0.8rem) clamp(0.6rem, 1.5vw, 1.2rem); font-size: var(--small-size); color: var(--text-primary); font-weight: 500; white-space: nowrap; }
.flow-arrow { color: var(--accent-primary); font-size: var(--body-size); flex-shrink: 0; }

/* === ISSUE CARDS === */
.issue-card { background: var(--card-bg); border-left: 3px solid var(--accent-amber, var(--accent-primary)); border-radius: 0 var(--card-radius, 12px) var(--card-radius, 12px) 0; padding: clamp(0.5rem, 1vw, 1rem) clamp(0.6rem, 1.5vw, 1.2rem); }
.issue-card h4 { font-family: var(--font-display); font-size: var(--body-size); font-weight: 600; color: var(--accent-amber, var(--accent-primary)); margin-bottom: clamp(0.1rem, 0.2vh, 0.3rem); }
.issue-card p { font-size: var(--small-size); color: var(--text-secondary); line-height: 1.4; }

/* === SUPPORT CARDS === */
.support-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--card-radius, clamp(8px, 1vw, 16px)); padding: clamp(0.6rem, 1.5vw, 1.5rem); position: relative; overflow: hidden; }
.support-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--progress-gradient, linear-gradient(90deg, var(--accent-primary), var(--accent-secondary, var(--accent-primary)))); }
.support-card h4 { font-family: var(--font-display); font-size: var(--body-size); font-weight: 600; color: var(--text-primary); margin-bottom: clamp(0.2rem, 0.4vh, 0.5rem); }
.support-card p { font-size: var(--small-size); color: var(--text-secondary); line-height: 1.5; }

/* === STRATEGY BADGE === */
.strategy-badge { display: inline-block; background: var(--badge-accent-bg, rgba(128,128,128,0.15)); color: var(--accent-primary); font-family: var(--font-display); font-size: var(--small-size); font-weight: 600; padding: clamp(0.15rem, 0.3vw, 0.3rem) clamp(0.5rem, 1vw, 0.8rem); border-radius: var(--badge-radius, 100px); letter-spacing: 0.05em; }

/* === INDICATOR TABLE === */
.indicator-group h4 { font-family: var(--font-display); font-size: var(--body-size); font-weight: 600; margin-bottom: clamp(0.2rem, 0.4vh, 0.5rem); display: flex; align-items: center; gap: clamp(0.3rem, 0.5vw, 0.5rem); }
.indicator-group .indicator-dot { width: clamp(6px, 0.5vw, 8px); height: clamp(6px, 0.5vw, 8px); border-radius: 50%; display: inline-block; }
.indicator-item { font-size: var(--small-size); color: var(--text-secondary); padding: clamp(0.15rem, 0.3vh, 0.3rem) 0; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,0.08)); line-height: 1.4; }

/* === DIVIDER === */
.section-divider { width: clamp(40px, 5vw, 80px); height: 2px; background: var(--divider-gradient, linear-gradient(90deg, var(--accent-primary), transparent)); margin: clamp(0.3rem, 0.8vh, 0.8rem) 0; }

/* === HIGHLIGHT BOX === */
.highlight-box { background: var(--highlight-bg, linear-gradient(135deg, rgba(128,128,128,0.1), rgba(128,128,128,0.05))); border: 1px solid var(--card-border); border-radius: var(--card-radius, clamp(8px, 1vw, 16px)); padding: clamp(0.6rem, 1.5vw, 1.5rem) clamp(1rem, 2vw, 2rem); text-align: center; max-width: min(90vw, 800px); margin: 0 auto; }
.highlight-box .highlight-text { font-family: var(--font-display); font-size: clamp(0.9rem, 2vw, 1.4rem); font-weight: 600; color: var(--text-primary); line-height: 1.4; }

/* === PYRAMID === */
.pyramid-level { text-align: center; padding: clamp(0.4rem, 0.8vh, 0.8rem); border-radius: var(--card-radius, clamp(6px, 0.8vw, 12px)); margin: 0 auto; }
.pyramid-level.top { background: var(--pyramid-top-bg, linear-gradient(135deg, rgba(128,128,128,0.15), rgba(128,128,128,0.1))); border: 1px solid var(--accent-primary); max-width: min(80vw, 600px); }
.pyramid-level.mid { background: var(--card-bg); border: 1px solid var(--card-border); max-width: min(90vw, 800px); margin-top: clamp(0.3rem, 0.5vh, 0.5rem); }
.pyramid-level.base { background: var(--card-bg); border: 1px solid var(--card-border-subtle, var(--card-border)); max-width: min(95vw, 1000px); margin-top: clamp(0.3rem, 0.5vh, 0.5rem); }

/* === SUMMARY ARROW === */
.summary-arrow { display: flex; align-items: center; justify-content: center; gap: clamp(0.5rem, 1vw, 1rem); margin: clamp(0.5rem, 1vh, 1rem) 0; }
.summary-arrow .arrow-line { width: clamp(40px, 8vw, 120px); height: 2px; background: var(--progress-gradient, linear-gradient(90deg, var(--accent-primary), var(--accent-secondary, var(--accent-primary)))); }
.summary-arrow .arrow-label { font-family: var(--font-display); font-size: var(--body-size); font-weight: 600; color: var(--accent-primary); white-space: nowrap; }

/* === Q&A === */
.qa-title { font-family: var(--font-display); font-size: clamp(2.5rem, 8vw, 7rem); font-weight: 700; background: var(--qa-gradient, linear-gradient(135deg, var(--accent-primary), var(--accent-secondary, var(--accent-primary)))); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-align: center; line-height: 1; }

/* === RESPONSIVE BREAKPOINTS === */
@media (max-height: 700px) {
    :root { --slide-padding: clamp(0.75rem, 3vw, 2rem); --content-gap: clamp(0.4rem, 1.5vw, 1rem); --h2-size: clamp(1rem, 3vw, 1.75rem); }
}
@media (max-height: 600px) {
    :root { --slide-padding: clamp(0.5rem, 2.5vw, 1.5rem); --content-gap: clamp(0.3rem, 1vw, 0.75rem); --body-size: clamp(0.7rem, 1.2vw, 0.95rem); }
    .nav-dots, .keyboard-hint, .decorative { display: none; }
}
@media (max-height: 500px) {
    :root { --slide-padding: clamp(0.4rem, 2vw, 1rem); --h2-size: clamp(0.9rem, 2.5vw, 1.25rem); --body-size: clamp(0.65rem, 1vw, 0.85rem); }
}
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.2s !important; }
    html { scroll-behavior: auto; }
}
```

## 主题 CSS 变量清单

每个 `demo-*.html` 主题文件需要在 `:root` 中定义以下 CSS 变量，`slide-base.css` 通过这些变量实现主题切换：

### 必须定义的变量

| 变量 | 说明 | 示例值 |
|------|------|--------|
| `--bg-primary` | 页面背景色 | `#000000` |
| `--text-primary` | 主文字色 | `#f5f5f7` |
| `--text-secondary` | 次文字色 | `#86868b` |
| `--accent-primary` | 主强调色 | `#0071e3` |
| `--font-display` | 标题字体 | `'DingTalk JinBuTi', ...` |
| `--font-body` | 正文字体 | `'DingTalk JinBuTi', ...` |
| `--h2-size` | 标题字号 | `clamp(1.25rem, 3.5vw, 2.5rem)` |
| `--h3-size` | 子标题字号 | `clamp(1rem, 2.5vw, 1.75rem)` |
| `--body-size` | 正文字号 | `clamp(0.75rem, 1.5vw, 1.125rem)` |
| `--small-size` | 小字号 | `clamp(0.65rem, 1vw, 0.875rem)` |
| `--slide-padding` | 幻灯片内边距 | `clamp(1.5rem, 5vw, 5rem)` |
| `--content-gap` | 内容间距 | `clamp(0.5rem, 2vw, 2rem)` |
| `--card-bg` | 卡片背景 | `rgba(28, 28, 30, 0.8)` |
| `--card-border` | 卡片边框 | `rgba(255, 255, 255, 0.08)` |
| `--card-radius` | 卡片圆角 | `16px` |
| `--ease-curve` | 动画缓动 | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |

### 可选变量（有默认回退值）

| 变量 | 说明 | 回退值 |
|------|------|--------|
| `--text-muted` | 更淡的文字色 | `var(--text-secondary)` |
| `--accent-secondary` | 次强调色 | `var(--accent-primary)` |
| `--accent-amber` | 琥珀色 | `var(--accent-primary)` |
| `--accent-emerald` | 翡翠色 | `var(--accent-primary)` |
| `--accent-blue` | 蓝色 | `var(--accent-primary)` |
| `--card-bg-hover` | 卡片悬停背景 | `var(--card-bg)` |
| `--card-border-hover` | 卡片悬停边框 | `var(--accent-primary)` |
| `--card-border-subtle` | 卡片微妙边框 | `var(--card-border)` |
| `--card-blur` | 卡片毛玻璃 | `none` |
| `--card-shadow-hover` | 卡片悬停阴影 | `none` |
| `--cover-title-gradient` | 封面标题渐变 | `linear-gradient(...)` |
| `--progress-gradient` | 进度条渐变 | `var(--accent-primary)` |
| `--qa-gradient` | Q&A 标题渐变 | `linear-gradient(...)` |
| `--scan-line-color` | 扫描线颜色 | `linear-gradient(...)` |
| `--highlight-bg` | 高亮框背景 | `linear-gradient(...)` |
| `--pyramid-top-bg` | 金字塔顶层背景 | `linear-gradient(...)` |
| `--divider-gradient` | 分割线渐变 | `linear-gradient(...)` |
| `--divider-color` | 分割线颜色 | `rgba(128,128,128,0.08)` |
| `--dot-inactive` | 导航点非活跃色 | `rgba(128,128,128,0.4)` |
| `--dot-active` | 导航点活跃色 | `var(--accent-primary)` |
| `--dot-glow` | 导航点发光 | `transparent` |
| `--entity-bg` | 实体高亮背景 | `rgba(128,128,128,0.08)` |
| `--list-marker` | 列表标记符号 | `'▸'` |
| `--grid-pattern` | 网格背景图案 | `none` |
| `--slide-bg-gradient` | 幻灯片背景渐变 | `none` |
| `--badge-accent-bg` | 徽章背景色 | `rgba(128,128,128,0.15)` |
| `--badge-magenta-bg` | 品红徽章背景 | `rgba(224,64,160,0.15)` |
| `--badge-blue-bg` | 蓝色徽章背景 | `rgba(59,130,246,0.15)` |
| `--badge-emerald-bg` | 翡翠徽章背景 | `rgba(16,185,129,0.15)` |
| `--badge-amber-bg` | 琥珀徽章背景 | `rgba(245,158,11,0.15)` |
| `--anim-duration` | 动画时长 | `0.7s` |
