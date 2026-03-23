# 风格画廊门户模板

风格画廊门户页面 `index.html` 的完整模板。提供毛玻璃侧边栏 + iframe 实时预览 + 键盘快捷键，支持在 11 种风格之间快速切换对比。

## 使用方式

将此文件保存为 `style-demos/index.html`（与 `demo-*.html` 同目录），用浏览器打开即可。

## 文件结构

```
style-demos/
├── index.html              ← 画廊门户（本文件）
├── slide-data.js           ← 数据源（M）
├── slide-renderer.js       ← 渲染引擎（C）
├── slide-base.css          ← 共享基础样式
├── demo-apple.html         ← Apple 主题（V）
├── demo-google.html        ← Google Material 主题
├── demo-neon.html          ← Neon Cyber 主题
├── demo-swiss.html         ← Swiss Modern 主题
├── demo-botanical.html     ← Dark Botanical 主题
├── demo-paper.html         ← Paper & Ink 主题
├── demo-fluent.html        ← Microsoft Fluent 主题
├── demo-carbon.html        ← IBM Carbon 主题
├── demo-atlassian.html     ← Atlassian 主题
├── demo-salesforce.html    ← Salesforce Lightning 主题
└── demo-antd.html          ← Ant Design 主题
```

## 完整代码

将以下内容保存为 `index.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>风格画廊 — Report Slides</title>
    <style>
        /* === CSS VARIABLES === */
        :root {
            --font: 'DingTalk JinBuTi', -apple-system, 'Segoe UI', 'PingFang SC', sans-serif;
            --bg: #0a0a0a;
            --surface: rgba(20, 20, 20, 0.65);
            --surface-hover: rgba(40, 40, 40, 0.6);
            --border: rgba(255, 255, 255, 0.06);
            --text: #e5e5e5;
            --text-secondary: #888;
            --accent: #6366f1;
        }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: var(--font); background: var(--bg); color: var(--text); height: 100vh; overflow: hidden; }

        /* === APP LAYOUT === */
        .app { display: flex; height: 100vh; }

        /* === SIDEBAR (毛玻璃) === */
        .sidebar {
            width: clamp(220px, 20vw, 300px);
            height: 100vh;
            background: var(--surface);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            position: relative;
            transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                        opacity 0.35s ease;
            z-index: 10;
            flex-shrink: 0;
        }

        .sidebar.collapsed {
            width: 0;
            overflow: hidden;
            border-right: none;
        }

        .sidebar.collapsed .sidebar-header,
        .sidebar.collapsed .style-list,
        .sidebar.collapsed .sidebar-footer {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.15s ease;
        }

        /* === SIDEBAR TOGGLE === */
        .sidebar-toggle {
            position: absolute;
            top: 50%;
            right: -16px;
            transform: translateY(-50%);
            width: 16px;
            height: 48px;
            background: rgba(20, 20, 20, 0.65);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-left: none;
            border-radius: 0 6px 6px 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            font-size: 10px;
            transition: all 0.25s ease;
            z-index: 11;
            padding: 0;
        }

        .sidebar-toggle:hover {
            background: rgba(99, 102, 241, 0.2);
            color: var(--accent);
            width: 20px;
        }

        .sidebar-toggle .toggle-icon {
            transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            line-height: 1;
        }

        .sidebar.collapsed .sidebar-toggle {
            right: -20px;
            width: 20px;
        }

        .sidebar.collapsed .sidebar-toggle .toggle-icon {
            transform: rotate(180deg);
        }

        /* === EXPAND BUTTON (collapsed state) === */
        .expand-btn {
            position: fixed;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 48px;
            background: rgba(20, 20, 20, 0.65);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-left: none;
            border-radius: 0 6px 6px 0;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            font-size: 10px;
            z-index: 12;
            padding: 0;
            transition: all 0.25s ease;
        }

        .expand-btn:hover {
            background: rgba(99, 102, 241, 0.2);
            color: var(--accent);
            width: 24px;
        }

        .sidebar-header {
            padding: clamp(12px, 2vh, 20px) clamp(12px, 1.5vw, 20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .sidebar-title {
            font-size: clamp(14px, 1.2vw, 18px);
            font-weight: 700;
            letter-spacing: -0.02em;
        }

        .sidebar-subtitle {
            font-size: clamp(10px, 0.8vw, 12px);
            color: var(--text-secondary);
            margin-top: 4px;
        }

        .style-list {
            flex: 1;
            overflow-y: auto;
            padding: clamp(6px, 0.8vh, 10px) clamp(8px, 1vw, 12px);
        }

        .style-list::-webkit-scrollbar { width: 4px; }
        .style-list::-webkit-scrollbar-track { background: transparent; }
        .style-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        .style-item {
            display: flex;
            align-items: center;
            gap: clamp(8px, 0.8vw, 12px);
            padding: clamp(8px, 1vh, 12px) clamp(10px, 1vw, 14px);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid transparent;
            margin-bottom: 2px;
        }

        .style-item:hover { background: var(--surface-hover); }

        .style-item.active {
            background: rgba(99, 102, 241, 0.1);
            border-color: rgba(99, 102, 241, 0.3);
        }

        .style-swatch {
            width: clamp(28px, 2.5vw, 36px);
            height: clamp(28px, 2.5vw, 36px);
            border-radius: 8px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: clamp(12px, 1vw, 16px);
            font-weight: 700;
            color: #fff;
        }

        .style-info { flex: 1; min-width: 0; }

        .style-name {
            font-size: clamp(11px, 0.9vw, 14px);
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .style-tag {
            font-size: clamp(9px, 0.7vw, 11px);
            color: var(--text-secondary);
            margin-top: 1px;
        }

        .style-category {
            padding: clamp(6px, 0.8vh, 10px) clamp(10px, 1vw, 14px) clamp(4px, 0.5vh, 6px);
            font-size: clamp(9px, 0.7vw, 11px);
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 600;
        }

        /* === MAIN CONTENT === */
        .main {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: clamp(8px, 1vh, 14px) clamp(12px, 1.5vw, 24px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            background: rgba(10, 10, 10, 0.85);
        }

        .toolbar-left {
            display: flex;
            align-items: center;
            gap: clamp(8px, 1vw, 16px);
        }

        .current-style-name {
            font-size: clamp(13px, 1.1vw, 16px);
            font-weight: 600;
        }

        .current-style-badge {
            font-size: clamp(9px, 0.7vw, 11px);
            padding: 2px 8px;
            border-radius: 10px;
            background: rgba(99, 102, 241, 0.15);
            color: var(--accent);
            font-weight: 500;
        }

        .toolbar-right {
            display: flex;
            align-items: center;
            gap: clamp(6px, 0.8vw, 12px);
        }

        .toolbar-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: clamp(5px, 0.6vh, 8px) clamp(10px, 1vw, 14px);
            border: 1px solid var(--border);
            border-radius: 6px;
            background: var(--surface);
            color: var(--text-secondary);
            font-size: clamp(10px, 0.8vw, 12px);
            font-family: var(--font);
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .toolbar-btn:hover {
            background: var(--surface-hover);
            color: var(--text);
            border-color: #444;
        }

        .preview-frame {
            flex: 1;
            border: none;
            width: 100%;
            height: 100%;
            background: #fff;
        }

        /* === KEYBOARD HINT === */
        .sidebar-footer {
            padding: clamp(8px, 1vh, 12px) clamp(12px, 1.5vw, 20px);
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            font-size: clamp(9px, 0.7vw, 11px);
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        kbd {
            display: inline-block;
            padding: 1px 5px;
            border: 1px solid var(--border);
            border-radius: 3px;
            font-size: inherit;
            font-family: var(--font);
            background: var(--bg);
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
            .app { flex-direction: column; }
            .sidebar {
                width: 100%;
                height: auto;
                max-height: 35vh;
                border-right: none;
                border-bottom: 1px solid var(--border);
            }
            .style-list { display: flex; flex-wrap: wrap; gap: 4px; padding: 8px; }
            .style-item { flex: 0 0 auto; padding: 6px 10px; margin-bottom: 0; }
            .style-tag { display: none; }
            .style-category { display: none; }
            .sidebar-footer { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { transition-duration: 0.01ms !important; }
        }
    </style>
</head>
<body>
    <div class="app">
        <aside class="sidebar" id="sidebar">
            <button class="sidebar-toggle" id="sidebarToggle" title="收起侧边栏">
                <span class="toggle-icon">◂</span>
            </button>
            <div class="sidebar-header">
                <div class="sidebar-title">🎨 风格画廊</div>
                <div class="sidebar-subtitle">Report Slides · 11 种设计风格</div>
            </div>
            <div class="style-list" id="styleList">
                <div class="style-category">经典风格</div>

                <div class="style-item active" data-src="demo-apple.html" data-name="Apple Design" data-tag="极简留白">
                    <div class="style-swatch" style="background: linear-gradient(135deg, #1d1d1f, #333);">A</div>
                    <div class="style-info"><div class="style-name">Apple Design</div><div class="style-tag">极简留白 · 毛玻璃</div></div>
                </div>

                <div class="style-item" data-src="demo-google.html" data-name="Google Material" data-tag="Material You">
                    <div class="style-swatch" style="background: linear-gradient(135deg, #1a73e8, #34a853);">G</div>
                    <div class="style-info"><div class="style-name">Google Material</div><div class="style-tag">Material You · 明快</div></div>
                </div>

                <div class="style-item" data-src="demo-neon.html" data-name="Neon Cyber" data-tag="霓虹科技">
                    <div class="style-swatch" style="background: linear-gradient(135deg, #0a0f1c, #00ffcc);">N</div>
                    <div class="style-info"><div class="style-name">Neon Cyber</div><div class="style-tag">深色科技 · 霓虹高光</div></div>
                </div>

                <div class="style-item" data-src="demo-swiss.html" data-name="Swiss Modern" data-tag="瑞士风格">
                    <div class="style-swatch" style="background: #fff; color: #ff3300; border: 1px solid #eee;">S</div>
                    <div class="style-info"><div class="style-name">Swiss Modern</div><div class="style-tag">网格 · 红色强调</div></div>
                </div>

                <div class="style-item" data-src="demo-botanical.html" data-name="Dark Botanical" data-tag="暗色优雅">
                    <div class="style-swatch" style="background: linear-gradient(135deg, #0f0f0f, #d4a574);">B</div>
                    <div class="style-info"><div class="style-name">Dark Botanical</div><div class="style-tag">暗色优雅 · 暖色调</div></div>
                </div>

                <div class="style-item" data-src="demo-paper.html" data-name="Paper & Ink" data-tag="编辑风">
                    <div class="style-swatch" style="background: #faf9f7; color: #c41e3a; border: 1px solid #eee;">P</div>
                    <div class="style-info"><div class="style-name">Paper & Ink</div><div class="style-tag">编辑风 · 文学感</div></div>
                </div>

                <div class="style-category">企业级风格</div>

                <div class="style-item" data-src="demo-fluent.html" data-name="Microsoft Fluent" data-tag="Fluent Design">
                    <div class="style-swatch" style="background: linear-gradient(135deg, #0078d4, #005a9e);">F</div>
                    <div class="style-info"><div class="style-name">Microsoft Fluent</div><div class="style-tag">Fluent Design · 圆润</div></div>
                </div>

                <div class="style-item" data-src="demo-carbon.html" data-name="IBM Carbon" data-tag="Carbon Design">
                    <div class="style-swatch" style="background: linear-gradient(135deg, #161616, #0f62fe);">C</div>
                    <div class="style-info"><div class="style-name">IBM Carbon</div><div class="style-tag">Carbon · 工程感</div></div>
                </div>

                <div class="style-item" data-src="demo-atlassian.html" data-name="Atlassian Design" data-tag="Atlassian">
                    <div class="style-swatch" style="background: linear-gradient(135deg, #0052cc, #2684ff);">A</div>
                    <div class="style-info"><div class="style-name">Atlassian Design</div><div class="style-tag">协作 · 友好</div></div>
                </div>

                <div class="style-item" data-src="demo-salesforce.html" data-name="Salesforce Lightning" data-tag="Lightning">
                    <div class="style-swatch" style="background: linear-gradient(135deg, #1b96ff, #032d60);">S</div>
                    <div class="style-info"><div class="style-name">Salesforce Lightning</div><div class="style-tag">Lightning · 云端</div></div>
                </div>

                <div class="style-item" data-src="demo-antd.html" data-name="Ant Design" data-tag="蚂蚁设计">
                    <div class="style-swatch" style="background: linear-gradient(135deg, #1677ff, #0958d9);">蚁</div>
                    <div class="style-info"><div class="style-name">Ant Design</div><div class="style-tag">蚂蚁设计 · 确定性</div></div>
                </div>
            </div>
            <div class="sidebar-footer">
                <kbd>↑</kbd><kbd>↓</kbd> 切换 · <kbd>F</kbd> 全屏 · <kbd>B</kbd> 收起
            </div>
        </aside>

        <main class="main">
            <button class="expand-btn" id="expandBtn" title="展开侧边栏">
                <span>▸</span>
            </button>
            <div class="toolbar">
                <div class="toolbar-left">
                    <span class="current-style-name" id="currentName">Apple Design</span>
                    <span class="current-style-badge" id="currentTag">极简留白</span>
                </div>
                <div class="toolbar-right">
                    <button class="toolbar-btn" id="btnPrev" title="上一个风格">← 上一个</button>
                    <button class="toolbar-btn" id="btnNext" title="下一个风格">下一个 →</button>
                    <button class="toolbar-btn" id="btnFullscreen" title="全屏预览">⛶ 全屏</button>
                    <button class="toolbar-btn" id="btnOpen" title="在新标签页打开">↗ 新窗口</button>
                </div>
            </div>
            <iframe class="preview-frame" id="previewFrame" src="demo-apple.html"></iframe>
        </main>
    </div>

    <script>
        const styleItems = document.querySelectorAll('.style-item');
        const previewFrame = document.getElementById('previewFrame');
        const currentName = document.getElementById('currentName');
        const currentTag = document.getElementById('currentTag');
        const btnPrev = document.getElementById('btnPrev');
        const btnNext = document.getElementById('btnNext');
        const btnFullscreen = document.getElementById('btnFullscreen');
        const btnOpen = document.getElementById('btnOpen');
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const expandBtn = document.getElementById('expandBtn');

        let currentIndex = 0;
        const items = [...styleItems];

        /* === SIDEBAR COLLAPSE / EXPAND === */
        function toggleSidebar() {
            const isCollapsed = sidebar.classList.toggle('collapsed');
            expandBtn.style.display = isCollapsed ? 'flex' : 'none';
        }

        sidebarToggle.addEventListener('click', toggleSidebar);
        expandBtn.addEventListener('click', toggleSidebar);

        /* === STYLE SELECTION === */
        function selectStyle(index) {
            if (index < 0 || index >= items.length) return;
            currentIndex = index;
            items.forEach(item => item.classList.remove('active'));
            items[index].classList.add('active');

            const src = items[index].dataset.src;
            const name = items[index].dataset.name;
            const tag = items[index].dataset.tag;

            previewFrame.src = src;
            currentName.textContent = name;
            currentTag.textContent = tag;

            items[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }

        items.forEach((item, index) => {
            item.addEventListener('click', () => selectStyle(index));
        });

        btnPrev.addEventListener('click', () => selectStyle(currentIndex - 1));
        btnNext.addEventListener('click', () => selectStyle(currentIndex + 1));

        btnFullscreen.addEventListener('click', () => {
            if (previewFrame.requestFullscreen) {
                previewFrame.requestFullscreen();
            } else if (previewFrame.webkitRequestFullscreen) {
                previewFrame.webkitRequestFullscreen();
            }
        });

        btnOpen.addEventListener('click', () => {
            window.open(items[currentIndex].dataset.src, '_blank');
        });

        /* === KEYBOARD SHORTCUTS === */
        document.addEventListener('keydown', (event) => {
            if (document.activeElement === previewFrame) return;

            if (event.key === 'ArrowUp') {
                event.preventDefault();
                selectStyle(currentIndex - 1);
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                selectStyle(currentIndex + 1);
            } else if (event.key === 'f' || event.key === 'F') {
                event.preventDefault();
                btnFullscreen.click();
            } else if (event.key === 'b' || event.key === 'B') {
                event.preventDefault();
                toggleSidebar();
            }
        });
    </script>
</body>
</html>
```

## 主题文件模板

每个 `demo-*.html` 主题文件的结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[风格名] — [汇报标题]</title>
    <!-- 钉钉进步体（必须） -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@1.0.3/font.css">
    <!-- 英文字体（按风格选择，参考 STYLE_PRESETS.md） -->
    <link rel="stylesheet" href="...">
    <!-- 共享基础样式 -->
    <link rel="stylesheet" href="slide-base.css">
    <style>
        :root {
            /* 从 STYLE_PRESETS.md 复制对应风格的完整 CSS 变量 */
        }
    </style>
</head>
<body>
    <script src="slide-data.js"></script>
    <script src="slide-renderer.js"></script>
    <script>SlideRenderer.render();</script>
</body>
</html>
```

## 定制指南

### 修改画廊标题

修改 `.sidebar-header` 中的标题和副标题：

```html
<div class="sidebar-title">🎨 风格画廊</div>
<div class="sidebar-subtitle">Report Slides · 11 种设计风格</div>
```

### 添加/删除风格

在 `.style-list` 中添加或删除 `.style-item` 元素。每个元素需要：

- `data-src`：对应的 demo HTML 文件名
- `data-name`：风格显示名称
- `data-tag`：风格标签描述
- `.style-swatch`：色块预览（使用 CSS 渐变）
- `.style-name`：风格名称
- `.style-tag`：风格标签

### 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `↑` / `↓` | 切换上/下一个风格 |
| `F` | 全屏预览 |
| `B` | 收起/展开侧边栏 |
