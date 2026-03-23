# 动画模式参考

汇报材料演示文稿的动画参考。根据风格选择合适的动画。

## 风格-动画对照

| 风格 | 缓动曲线 | 入场方式 | 特殊效果 |
|------|----------|----------|----------|
| **Apple** | `cubic-bezier(0.16, 1, 0.3, 1)` | 柔和上浮，0.7s | 毛玻璃渐显 |
| **Google Material** | `cubic-bezier(0.2, 0, 0, 1)` | 干脆上浮，0.5s | 卡片 elevation 变化 |
| **Neon Cyber** | `cubic-bezier(0.16, 1, 0.3, 1)` | 上浮 + 发光，0.6s | 霓虹脉冲、粒子背景 |
| **Swiss Modern** | `cubic-bezier(0.25, 0, 0, 1)` | 精确滑入，0.4s | 网格线动画 |
| **Dark Botanical** | `cubic-bezier(0.16, 1, 0.3, 1)` | 缓慢淡入，0.8s | 模糊圆形渐显 |
| **Paper & Ink** | `cubic-bezier(0.25, 0, 0, 1)` | 文字逐行显现，0.5s | 水平线展开 |

## 入场动画

```css
/* 上浮入场（最通用） */
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

/* 缩放入场 */
.reveal-scale {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.6s, transform 0.6s var(--ease-out);
}

/* 左侧滑入 */
.reveal-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.6s, transform 0.6s var(--ease-out);
}

/* 模糊入场 */
.reveal-blur {
    opacity: 0;
    filter: blur(10px);
    transition: opacity 0.8s, filter 0.8s var(--ease-out);
}
```

## 交错延迟

```css
/* 子元素依次入场 */
.reveal:nth-child(1) { transition-delay: 0.05s; }
.reveal:nth-child(2) { transition-delay: 0.15s; }
.reveal:nth-child(3) { transition-delay: 0.25s; }
.reveal:nth-child(4) { transition-delay: 0.35s; }
.reveal:nth-child(5) { transition-delay: 0.45s; }
```

## 背景效果

```css
/* 渐变网格 — 适合深色风格 */
.gradient-bg {
    background:
        radial-gradient(ellipse at 20% 80%, rgba(120, 0, 255, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(0, 255, 200, 0.2) 0%, transparent 50%),
        var(--bg-primary);
}

/* 网格线 — 适合科技风格 */
.grid-bg {
    background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
}
```

## Hover 效果

```css
/* Apple 风格 — 柔和上浮 */
.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.3);
}

/* Material 风格 — elevation 提升 */
.card:hover {
    box-shadow: var(--md-elevation-3);
    transform: translateY(-2px);
}
```

## 减少动画支持

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.2s !important;
    }
}
```
