# HTML 演示文稿模板

汇报材料演示文稿的参考架构。每个演示文稿遵循此结构。

## 基础 HTML 结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>汇报标题</title>

    <!-- 钉钉进步体（必须） -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@1.0.3/font.css">
    <!-- 英文字体（按风格选择） -->
    <link rel="stylesheet" href="...">

    <style>
        /* === CSS 自定义属性（主题） === */
        :root {
            /* 从选定的风格预设中复制配色 */
            /* 字体 — 必须使用 clamp() */
            /* 间距 — 必须使用 clamp() */
        }

        /* === 基础样式 === */
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }

        /* --- 粘贴 viewport-base.css 完整内容 --- */

        /* === 动画 === */
        .reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s var(--ease-out),
                        transform 0.6s var(--ease-out);
        }
        .slide.visible .reveal {
            opacity: 1;
            transform: translateY(0);
        }
        .reveal:nth-child(1) { transition-delay: 0.05s; }
        .reveal:nth-child(2) { transition-delay: 0.15s; }
        .reveal:nth-child(3) { transition-delay: 0.25s; }
        .reveal:nth-child(4) { transition-delay: 0.35s; }
        .reveal:nth-child(5) { transition-delay: 0.45s; }

        /* === 风格特定样式 === */
        /* ... */
    </style>
</head>
<body>
    <!-- 幻灯片 -->
    <section class="slide slide-cover" id="s1">
        <div class="slide-inner">
            <h1 class="reveal">标题</h1>
            <p class="reveal">副标题</p>
        </div>
    </section>

    <!-- 更多幻灯片... -->

    <script>
        /* === 幻灯片控制器 === */
        const slides = document.querySelectorAll('.slide');

        // Intersection Observer — 滚动触发动画
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle('visible', entry.isIntersecting);
            });
        }, { threshold: 0.3 });
        slides.forEach(s => observer.observe(s));

        // 键盘导航
        document.addEventListener('keydown', (e) => {
            const current = [...slides].findIndex(s =>
                s.getBoundingClientRect().top >= -window.innerHeight/2 &&
                s.getBoundingClientRect().top < window.innerHeight/2
            );
            if (['ArrowDown', 'ArrowRight', ' ', 'PageDown'].includes(e.key)) {
                e.preventDefault();
                const next = Math.min(current + 1, slides.length - 1);
                slides[next].scrollIntoView({ behavior: 'smooth' });
            }
            if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
                e.preventDefault();
                const prev = Math.max(current - 1, 0);
                slides[prev].scrollIntoView({ behavior: 'smooth' });
            }
        });
    </script>
</body>
</html>
```

## 必须包含的 JS 功能

1. **Intersection Observer** — 滚动触发 `.visible` 类，驱动 CSS 动画
2. **键盘导航** — 方向键、空格、Page Up/Down
3. **触摸支持** — 移动端滑动导航（可选）
4. **进度条** — 顶部进度指示（可选）
5. **导航点** — 右侧/底部导航点（可选）

## 关键指标样式

```css
.metric-value {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 4vw, 3.5rem);
    font-weight: 700;
    line-height: 1;
    white-space: nowrap; /* 关键：防止数字换行 */
}
```

## 代码质量

- **注释：** 每个章节需要清晰的 `/* === SECTION NAME === */` 注释
- **语义化 HTML：** 使用 `<section>`、`<nav>`、`<main>`
- **无障碍：** 键盘导航完整可用，ARIA 标签
- **减少动画：** 包含 `prefers-reduced-motion` 支持

## 文件结构

```
report-name.html    # 自包含，所有 CSS/JS 内联
```
