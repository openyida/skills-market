# 幻灯片渲染引擎模板

MVC 架构中的 Controller 层。`slide-renderer.js` 的完整模板代码，负责读取 `SLIDE_DATA` 数据源，根据 CSS 主题变量动态生成 HTML。

## 使用方式

在每个 `demo-*.html` 主题文件中引入：

```html
<script src="slide-data.js"></script>
<script src="slide-renderer.js"></script>
<script>SlideRenderer.render();</script>
```

## 完整代码

将以下代码保存为 `slide-renderer.js`：

```javascript
/**
 * =============================================
 * SLIDE RENDERER (Controller Layer)
 * 统一渲染引擎：读取 SLIDE_DATA，根据 CSS 主题变量动态生成 HTML
 * =============================================
 */

class SlideRenderer {

    /**
     * 自动高亮：对文本中的关键数字和名词实体添加微妙的视觉标记
     * - 数字+单位（如 200万+、65%、37次、11个、581）→ .hl-num
     * - 关键产品/技术名词 → .hl-entity
     *
     * 实体词表需要根据实际汇报内容定制，从 slide-data.js 中提取关键产品名、
     * 技术术语、缩写等。以下为示例词表。
     */
    static highlightText(text) {
        if (!text || typeof text !== 'string') return text;

        /* === 实体词表（根据汇报内容定制） === */
        const entityTerms = [
            // 产品名 / 项目名（从长到短排列，避免短词先匹配截断长词）
            // 示例：'OpenYida', 'MCP Server', 'Vibe Coding', 'Prompt Pass',
            // 'AI Skill', 'AI Coding',
            // 缩写 / 指标名
            // 示例：'NPS', 'GAAP', 'DAU', 'SaaS', 'POC', 'IDaaS', 'OpenAPI',
            // 时间标记
            // 示例：'FY26', 'FY27', 'S1', 'S2'
        ];

        /* Step 1: 高亮数字+单位（匹配 200万+、65%、37次、~3000人、581 等） */
        let result = text.replace(
            /(?<![<\w])([~～]?\d[\d,]*\.?\d*\s*[万亿千百十]?\+?)\s*(%|次|个|人|条|套|万|亿|元)?/g,
            (match, numPart, unitPart) => {
                const combined = unitPart ? numPart + unitPart : numPart;
                return '<span class="hl-num">' + combined + '</span>';
            }
        );

        /* Step 2: 高亮名词实体（从长到短排序，避免短词先匹配导致长词被截断） */
        const sortedTerms = [...entityTerms].sort((a, b) => b.length - a.length);
        for (const term of sortedTerms) {
            const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp('(?<!<[^>]*)(?<![\\w-])' + escaped + '(?![\\w-])(?![^<]*>)', 'g');
            result = result.replace(regex, '<span class="hl-entity">' + term + '</span>');
        }

        return result;
    }

    /**
     * 主入口：渲染所有幻灯片到 body
     */
    static render() {
        const container = document.body;

        /* Progress Bar */
        container.insertAdjacentHTML('beforeend', '<div class="progress-bar" id="progressBar"></div>');

        /* Navigation Dots */
        container.insertAdjacentHTML('beforeend', '<nav class="nav-dots" id="navDots" aria-label="Slide navigation"></nav>');

        /* Slide Counter */
        container.insertAdjacentHTML('beforeend', `
            <div class="slide-counter">
                <span class="current" id="currentSlide">01</span>
                <span>/</span>
                <span id="totalSlides">${String(SLIDE_DATA.length).padStart(2, '0')}</span>
            </div>
        `);

        /* Render each slide */
        SLIDE_DATA.forEach(slide => {
            const html = SlideRenderer.renderSlide(slide);
            container.insertAdjacentHTML('beforeend', html);
        });

        /* Initialize presentation controller */
        new SlidePresentation();
    }

    /**
     * 根据 slide.type 分发到对应的渲染方法
     */
    static renderSlide(slide) {
        const gridClass = slide.gridBg ? ' grid-bg' : '';
        let innerHtml = '';

        switch (slide.type) {
            case 'cover':           innerHtml = SlideRenderer.renderCover(slide); break;
            case 'toc':             innerHtml = SlideRenderer.renderToc(slide); break;
            case 'quadrant':        innerHtml = SlideRenderer.renderQuadrant(slide); break;
            case 'metrics-dashboard': innerHtml = SlideRenderer.renderMetricsDashboard(slide); break;
            case 'two-col':         innerHtml = SlideRenderer.renderTwoCol(slide); break;
            case 'two-col-with-flow': innerHtml = SlideRenderer.renderTwoColWithFlow(slide); break;
            case 'two-col-priority': innerHtml = SlideRenderer.renderTwoColPriority(slide); break;
            case 'issues':          innerHtml = SlideRenderer.renderIssues(slide); break;
            case 'quadrant-badges': innerHtml = SlideRenderer.renderQuadrantBadges(slide); break;
            case 'pyramid':         innerHtml = SlideRenderer.renderPyramid(slide); break;
            case 'three-strategy':  innerHtml = SlideRenderer.renderThreeStrategy(slide); break;
            case 'indicators':      innerHtml = SlideRenderer.renderIndicators(slide); break;
            case 'support':         innerHtml = SlideRenderer.renderSupport(slide); break;
            case 'summary':         innerHtml = SlideRenderer.renderSummary(slide); break;
            case 'qa':              innerHtml = SlideRenderer.renderQA(slide); break;
            default:                innerHtml = `<div class="slide-content"><h2>${slide.title || ''}</h2></div>`;
        }

        return `<section class="slide${gridClass}" id="slide-${slide.id}">${innerHtml}</section>`;
    }

    /* =============================================
       HELPER: 通用组件
       ============================================= */

    static sectionLabel(text) {
        return `<div class="section-label reveal">${text}</div>`;
    }

    static slideTitle(text, style) {
        return `<h2 class="slide-title reveal"${style ? ` style="${style}"` : ''}>${text}</h2>`;
    }

    static slideSubtitle(text) {
        return `<p class="slide-subtitle reveal">${SlideRenderer.highlightText(text)}</p>`;
    }

    static highlightBox(text, accentWord) {
        let displayText = SlideRenderer.highlightText(text);
        if (accentWord) {
            displayText = text.replace(accentWord, `<span class="accent-text">${accentWord}</span>`);
            displayText = SlideRenderer.highlightText(displayText);
        }
        return `
            <div class="highlight-box reveal" style="margin-top: clamp(0.3rem, 0.8vh, 0.8rem);">
                <div class="highlight-text">${displayText}</div>
            </div>`;
    }

    static styledList(items) {
        const listItems = items.map(item => {
            if (typeof item === 'string') return `<li>${SlideRenderer.highlightText(item)}</li>`;
            const boldPart = item.bold ? `<strong>${item.bold}</strong>` : '';
            return `<li>${boldPart}${SlideRenderer.highlightText(item.text)}</li>`;
        }).join('');
        return `<ul class="styled-list">${listItems}</ul>`;
    }

    static metricBlock(metric) {
        const colorMap = {
            accent: 'var(--accent-primary)',
            amber: 'var(--accent-amber, var(--accent-primary))',
            emerald: 'var(--accent-emerald, var(--accent-primary))',
            secondary: 'var(--text-secondary)',
            magenta: 'var(--accent-secondary, var(--accent-primary))',
            blue: 'var(--accent-blue, var(--accent-primary))'
        };
        const color = colorMap[metric.color] || 'var(--accent-primary)';
        const spanStyle = metric.span ? ` grid-column: span ${metric.span};` : '';
        return `
            <div class="metric"${spanStyle ? ` style="${spanStyle}"` : ''}>
                <div class="metric-value" style="color: ${color};">${metric.value}</div>
                <div class="metric-label">${metric.label}</div>
            </div>`;
    }

    static badgeHtml(text, colorKey) {
        const colorMap = {
            accent: { bg: 'var(--badge-accent-bg, rgba(0,229,204,0.15))', fg: 'var(--accent-primary)' },
            magenta: { bg: 'var(--badge-magenta-bg, rgba(224,64,160,0.15))', fg: 'var(--accent-secondary, var(--accent-primary))' },
            blue: { bg: 'var(--badge-blue-bg, rgba(59,130,246,0.15))', fg: 'var(--accent-blue, var(--accent-primary))' },
            emerald: { bg: 'var(--badge-emerald-bg, rgba(16,185,129,0.15))', fg: 'var(--accent-emerald, var(--accent-primary))' },
            amber: { bg: 'var(--badge-amber-bg, rgba(245,158,11,0.15))', fg: 'var(--accent-amber, var(--accent-primary))' }
        };
        const colors = colorMap[colorKey] || colorMap.accent;
        return `<div class="strategy-badge" style="background: ${colors.bg}; color: ${colors.fg};">${text}</div>`;
    }

    /* =============================================
       SLIDE TYPE RENDERERS
       ============================================= */

    /** COVER — 封面页 */
    static renderCover(slide) {
        const titleLines = slide.title.split('\n').join('<br>');
        const keywordsHtml = (slide.keywords || []).map(kw =>
            `<span class="keyword">${kw}</span>`
        ).join('');

        return `
            <div class="scan-line"></div>
            <div class="slide-content" style="justify-content: center; align-items: center; text-align: center; gap: var(--content-gap);">
                <div class="reveal" style="margin-bottom: clamp(0.3rem, 1vh, 1rem);">
                    <div class="section-label" style="letter-spacing: 0.3em;">${slide.section}</div>
                </div>
                <h1 class="cover-title reveal">${titleLines}</h1>
                <p class="cover-sub reveal">${slide.subtitle}</p>
                <div class="section-divider reveal" style="margin: 0 auto;"></div>
                <div class="keyword-cloud reveal">${keywordsHtml}</div>
                <div class="cover-meta reveal" style="margin-top: clamp(0.5rem, 1.5vh, 1.5rem);">${slide.meta}</div>
            </div>`;
    }

    /** TOC — 目录页 */
    static renderToc(slide) {
        const itemsHtml = slide.content.map(item => `
            <div class="toc-item">
                <div class="toc-number">${item.number}</div>
                <div class="toc-label">${item.label}</div>
            </div>
        `).join('');

        return `
            <div class="slide-content" style="align-items: center; gap: var(--content-gap);">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title)}
                <div class="toc-grid reveal-scale" style="margin-top: clamp(0.5rem, 1vh, 1rem);">
                    ${itemsHtml}
                </div>
            </div>`;
    }

    /** QUADRANT — 四象限卡片 */
    static renderQuadrant(slide) {
        const cardsHtml = slide.content.map(card => {
            const bodyHtml = card.items
                ? SlideRenderer.styledList(card.items)
                : `<p>${card.desc}</p>`;
            const titleColor = card.titleColor
                ? ` style="color: var(--accent-${card.titleColor}, var(--accent-primary));"`
                : '';
            return `
                <div class="info-card reveal">
                    <div class="card-icon">${card.icon}</div>
                    <h3${titleColor}>${card.title}</h3>
                    ${bodyHtml}
                </div>`;
        }).join('');

        return `
            <div class="slide-content" style="gap: var(--content-gap);">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title)}
                ${slide.subtitle ? SlideRenderer.slideSubtitle(slide.subtitle) : ''}
                <div class="quadrant-grid" style="margin-top: clamp(0.3rem, 0.6vh, 0.6rem);">
                    ${cardsHtml}
                </div>
                ${slide.highlight ? SlideRenderer.highlightBox(slide.highlight) : ''}
            </div>`;
    }

    /** METRICS DASHBOARD — 数据看板（三列分组） */
    static renderMetricsDashboard(slide) {
        const columnsHtml = slide.content.map(group => {
            const metricsHtml = group.metrics.map(m => SlideRenderer.metricBlock(m)).join('');
            return `
                <div class="info-card reveal" style="text-align: center;">
                    <div class="section-label" style="font-size: clamp(0.55rem, 0.8vw, 0.7rem);">${group.group}</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: clamp(0.3rem, 0.6vw, 0.6rem); margin-top: clamp(0.3rem, 0.5vh, 0.5rem);">
                        ${metricsHtml}
                    </div>
                </div>`;
        }).join('');

        return `
            <div class="slide-content" style="gap: var(--content-gap);">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title)}
                <div class="three-col" style="margin-top: clamp(0.3rem, 0.8vh, 0.8rem);">
                    ${columnsHtml}
                </div>
            </div>`;
    }

    /** TWO COLUMN — 双列布局 */
    static renderTwoCol(slide) {
        const leftContent = SlideRenderer.renderColContent(slide.content.left);
        const rightContent = SlideRenderer.renderColContent(slide.content.right);

        return `
            <div class="slide-content" style="gap: var(--content-gap);">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title)}
                ${slide.subtitle ? SlideRenderer.slideSubtitle(slide.subtitle) : ''}
                <div class="two-col" style="margin-top: clamp(0.3rem, 0.6vh, 0.6rem);">
                    <div class="info-card reveal">${leftContent}</div>
                    <div class="info-card reveal">${rightContent}</div>
                </div>
                ${slide.highlight ? SlideRenderer.highlightBox(slide.highlight) : ''}
            </div>`;
    }

    /** TWO COLUMN WITH FLOW — 双列 + 顶部流程条 */
    static renderTwoColWithFlow(slide) {
        const flowHtml = slide.flow.map((node, index) => {
            let html = `<div class="flow-node">${SlideRenderer.highlightText(node)}</div>`;
            if (index < slide.flow.length - 1) {
                html += '<div class="flow-arrow">→</div>';
            }
            return html;
        }).join('');

        const leftContent = SlideRenderer.renderColContent(slide.content.left);
        const rightContent = SlideRenderer.renderColContent(slide.content.right);

        return `
            <div class="slide-content" style="gap: var(--content-gap);">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title)}
                ${slide.subtitle ? SlideRenderer.slideSubtitle(slide.subtitle) : ''}
                <div class="flow-row reveal" style="margin-top: clamp(0.2rem, 0.5vh, 0.5rem);">
                    ${flowHtml}
                </div>
                <div class="two-col" style="margin-top: clamp(0.3rem, 0.6vh, 0.6rem);">
                    <div class="info-card reveal">${leftContent}</div>
                    <div class="info-card reveal">${rightContent}</div>
                </div>
            </div>`;
    }

    /** TWO COLUMN PRIORITY — 双列 + 优先级徽章 */
    static renderTwoColPriority(slide) {
        const renderPriorityCol = (col) => {
            const itemsHtml = col.items.map(item => {
                if (typeof item === 'string') return `<li>${SlideRenderer.highlightText(item)}</li>`;
                const boldPart = item.bold ? `<strong>${item.bold}</strong>` : '';
                return `<li>${boldPart}${SlideRenderer.highlightText(item.text)}</li>`;
            }).join('');

            return `
                <div class="info-card reveal" style="border-top: 3px solid var(--accent-${col.badgeColor || 'accent'}, var(--accent-primary));">
                    ${SlideRenderer.badgeHtml(col.badge, col.badgeColor)}
                    <h3 style="margin-top: clamp(0.2rem, 0.4vh, 0.4rem);">${col.icon} ${col.title}</h3>
                    <ul class="styled-list" style="margin-top: clamp(0.15rem, 0.3vh, 0.3rem);">
                        ${itemsHtml}
                    </ul>
                </div>`;
        };

        return `
            <div class="slide-content" style="gap: var(--content-gap);">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title)}
                <div class="two-col" style="margin-top: clamp(0.3rem, 0.6vh, 0.6rem);">
                    ${renderPriorityCol(slide.content.left)}
                    ${renderPriorityCol(slide.content.right)}
                </div>
                ${slide.highlight ? SlideRenderer.highlightBox(slide.highlight) : ''}
            </div>`;
    }

    /** ISSUES — 问题列表 */
    static renderIssues(slide) {
        const issuesHtml = slide.content.map(issue => `
            <div class="issue-card reveal">
                <h4>${issue.number} ${issue.title}</h4>
                <p>${SlideRenderer.highlightText(issue.desc)}</p>
            </div>
        `).join('');

        return `
            <div class="slide-content" style="gap: var(--content-gap);">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title)}
                ${slide.subtitle ? SlideRenderer.slideSubtitle(slide.subtitle) : ''}
                <div style="display: flex; flex-direction: column; gap: clamp(0.3rem, 0.6vh, 0.6rem); margin-top: clamp(0.3rem, 0.6vh, 0.6rem); max-width: min(95vw, 900px); margin-left: auto; margin-right: auto;">
                    ${issuesHtml}
                </div>
            </div>`;
    }

    /** QUADRANT BADGES — 带徽章的四象限 */
    static renderQuadrantBadges(slide) {
        const cardsHtml = slide.content.map(card => `
            <div class="info-card reveal">
                ${SlideRenderer.badgeHtml(card.badge, card.badgeColor)}
                <h3 style="margin-top: clamp(0.2rem, 0.4vh, 0.4rem);">${card.title}</h3>
                <p>${card.desc}</p>
            </div>
        `).join('');

        const centerStyle = slide.centered ? ' align-items: center;' : '';
        const titleStyle = slide.centered ? 'text-align: center;' : '';

        return `
            <div class="slide-content" style="gap: var(--content-gap);${centerStyle}">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title, titleStyle)}
                <div class="quadrant-grid" style="margin-top: clamp(0.3rem, 0.6vh, 0.6rem);">
                    ${cardsHtml}
                </div>
                ${slide.highlight ? SlideRenderer.highlightBox(slide.highlight, slide.highlightAccent) : ''}
            </div>`;
    }

    /** PYRAMID — 金字塔/层级结构 */
    static renderPyramid(slide) {
        const midHtml = slide.content.mid.map(item => `
            <div>
                <div style="font-size: clamp(1rem, 1.5vw, 1.3rem); margin-bottom: clamp(0.1rem, 0.2vh, 0.2rem);">${item.icon}</div>
                <div style="font-family: var(--font-display); font-size: var(--body-size); font-weight: 600;">${item.title}</div>
                <div style="font-size: var(--small-size); color: var(--text-secondary);">${SlideRenderer.highlightText(item.desc)}</div>
            </div>
        `).join('');

        const baseHtml = slide.content.base.map(item => `
            <div style="padding: clamp(0.3rem, 0.6vh, 0.6rem);">
                <div style="font-family: var(--font-display); font-size: var(--small-size); font-weight: 600; color: var(--accent-${item.color}, var(--accent-primary));">
                    ${item.text}
                </div>
            </div>
        `).join('');

        return `
            <div class="slide-content" style="gap: var(--content-gap); align-items: center;">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title, 'text-align: center;')}
                <div class="pyramid-level top reveal" style="margin-top: clamp(0.3rem, 0.8vh, 0.8rem);">
                    <div style="font-family: var(--font-display); font-size: clamp(0.9rem, 2vw, 1.5rem); font-weight: 700; color: var(--accent-primary);">
                        ${slide.content.top}
                    </div>
                </div>
                <div class="pyramid-level mid reveal">
                    <div class="three-col" style="gap: clamp(0.3rem, 0.8vw, 0.8rem); text-align: center;">
                        ${midHtml}
                    </div>
                </div>
                <div class="pyramid-level base reveal">
                    <div class="three-col" style="gap: clamp(0.3rem, 0.8vw, 0.8rem); text-align: center;">
                        ${baseHtml}
                    </div>
                </div>
            </div>`;
    }

    /** THREE STRATEGY — 三列策略 */
    static renderThreeStrategy(slide) {
        const colsHtml = slide.content.map(col => `
            <div class="info-card reveal" style="border-top: 3px solid var(--accent-${col.borderColor}, var(--accent-primary));">
                ${SlideRenderer.badgeHtml(col.badge, col.badgeColor)}
                <h3 style="margin-top: clamp(0.2rem, 0.4vh, 0.4rem);">${col.icon} ${col.title}</h3>
                <p style="font-family: var(--font-display); font-size: var(--body-size); font-weight: 500; color: var(--text-primary); margin-bottom: clamp(0.2rem, 0.3vh, 0.3rem);">${SlideRenderer.highlightText(col.subtitle)}</p>
                ${SlideRenderer.styledList(col.items)}
            </div>
        `).join('');

        return `
            <div class="slide-content" style="gap: var(--content-gap);">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title)}
                ${slide.subtitle ? SlideRenderer.slideSubtitle(slide.subtitle) : ''}
                <div class="three-col" style="margin-top: clamp(0.3rem, 0.6vh, 0.6rem);">
                    ${colsHtml}
                </div>
            </div>`;
    }

    /** INDICATORS — 指标体系 */
    static renderIndicators(slide) {
        const cardsHtml = slide.content.map(group => {
            const itemsHtml = group.items.map(item =>
                `<div class="indicator-item">${SlideRenderer.highlightText(item)}</div>`
            ).join('');

            return `
                <div class="info-card reveal">
                    <div class="indicator-group">
                        <h4>
                            <span class="indicator-dot" style="background: var(--accent-${group.dotColor}, var(--accent-primary));"></span>
                            ${group.title}
                        </h4>
                        ${itemsHtml}
                    </div>
                </div>`;
        }).join('');

        return `
            <div class="slide-content" style="gap: var(--content-gap);">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title)}
                ${slide.subtitle ? SlideRenderer.slideSubtitle(slide.subtitle) : ''}
                <div class="quadrant-grid" style="margin-top: clamp(0.2rem, 0.5vh, 0.5rem);">
                    ${cardsHtml}
                </div>
            </div>`;
    }

    /** SUPPORT — 支持诉求 */
    static renderSupport(slide) {
        const cardsHtml = slide.content.map(card => `
            <div class="support-card reveal">
                <h4>${card.icon} ${card.title}</h4>
                <div class="section-divider" style="margin: clamp(0.2rem, 0.4vh, 0.4rem) 0;"></div>
                <p><strong style="color: var(--accent-amber, var(--accent-primary));">现状：</strong>${SlideRenderer.highlightText(card.current)}</p>
                <p style="margin-top: clamp(0.15rem, 0.3vh, 0.3rem);"><strong style="color: var(--accent-primary);">建议：</strong>${SlideRenderer.highlightText(card.suggestion)}</p>
            </div>
        `).join('');

        return `
            <div class="slide-content" style="gap: var(--content-gap);">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title)}
                ${slide.subtitle ? SlideRenderer.slideSubtitle(slide.subtitle) : ''}
                <div class="three-col" style="margin-top: clamp(0.3rem, 0.6vh, 0.6rem);">
                    ${cardsHtml}
                </div>
            </div>`;
    }

    /** SUMMARY — 总结对比页 */
    static renderSummary(slide) {
        const leftContent = SlideRenderer.renderColContent(slide.content.left);
        const rightContent = SlideRenderer.renderColContent(slide.content.right);

        const leftBorder = slide.content.left.titleColor
            ? `border-top: 3px solid var(--accent-${slide.content.left.titleColor}, var(--accent-primary));`
            : '';
        const rightBorder = slide.content.right.titleColor
            ? `border-top: 3px solid var(--accent-${slide.content.right.titleColor}, var(--accent-primary));`
            : '';

        return `
            <div class="slide-content" style="gap: var(--content-gap); align-items: center;">
                ${SlideRenderer.sectionLabel(slide.section)}
                ${SlideRenderer.slideTitle(slide.title, 'text-align: center;')}
                <div class="two-col" style="margin-top: clamp(0.3rem, 0.6vh, 0.6rem); max-width: min(95vw, 1000px);">
                    <div class="info-card reveal" style="${leftBorder}">${leftContent}</div>
                    <div class="info-card reveal" style="${rightBorder}">${rightContent}</div>
                </div>
                ${slide.arrow ? `
                    <div class="summary-arrow reveal">
                        <div class="arrow-line"></div>
                        <div class="arrow-label">${slide.arrow}</div>
                        <div class="arrow-line"></div>
                    </div>` : ''}
                ${slide.highlight ? SlideRenderer.highlightBox(slide.highlight) : ''}
            </div>`;
    }

    /** Q&A — 结束页 */
    static renderQA(slide) {
        const keywordsHtml = (slide.keywords || []).map(kw =>
            `<span class="keyword">${kw}</span>`
        ).join('');

        return `
            <div class="slide-content" style="justify-content: center; align-items: center; text-align: center; gap: var(--content-gap);">
                <div class="qa-title reveal" style="animation: float 4s ease-in-out infinite;">${slide.title}</div>
                <div class="section-divider reveal" style="margin: 0 auto; width: clamp(60px, 8vw, 120px);"></div>
                <p class="slide-subtitle reveal" style="text-align: center; max-width: 40ch;">${slide.subtitle}</p>
                <div class="keyword-cloud reveal" style="margin-top: clamp(0.5rem, 1vh, 1rem);">
                    ${keywordsHtml}
                </div>
                <div class="cover-meta reveal" style="margin-top: clamp(1rem, 2vh, 2rem);">${slide.meta}</div>
            </div>`;
    }

    /* =============================================
       HELPER: 渲染列内容（支持 items 列表或 metrics 数据）
       ============================================= */
    static renderColContent(col) {
        const titleColor = col.titleColor
            ? ` style="color: var(--accent-${col.titleColor}, var(--accent-primary));"`
            : '';

        let bodyHtml = '';
        if (col.items) {
            bodyHtml = SlideRenderer.styledList(col.items);
        }
        if (col.metrics) {
            const metricsHtml = col.metrics.map(m => SlideRenderer.metricBlock(m)).join('');
            bodyHtml += `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: clamp(0.3rem, 0.6vw, 0.6rem); margin-top: clamp(0.2rem, 0.4vh, 0.4rem);">
                    ${metricsHtml}
                </div>`;
        }

        return `
            <h3${titleColor}>${col.title}</h3>
            ${bodyHtml}`;
    }
}

/**
 * =============================================
 * SLIDE PRESENTATION CONTROLLER
 * 键盘导航、触摸滑动、进度条、导航点
 * =============================================
 */
class SlidePresentation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isScrolling = false;

        this.setupIntersectionObserver();
        this.setupKeyboardNav();
        this.setupTouchNav();
        this.setupProgressBar();
        this.setupNavDots();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const slideIndex = Array.from(this.slides).indexOf(entry.target);
                    this.currentSlide = slideIndex;
                    this.updateUI();
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.4 });

        this.slides.forEach(slide => observer.observe(slide));
    }

    setupKeyboardNav() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowDown': case 'ArrowRight': case ' ': case 'PageDown':
                    event.preventDefault();
                    this.goToSlide(this.currentSlide + 1);
                    break;
                case 'ArrowUp': case 'ArrowLeft': case 'PageUp':
                    event.preventDefault();
                    this.goToSlide(this.currentSlide - 1);
                    break;
                case 'Home':
                    event.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    event.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        });
    }

    setupTouchNav() {
        let touchStartY = 0;
        let touchStartX = 0;

        document.addEventListener('touchstart', (event) => {
            touchStartY = event.touches[0].clientY;
            touchStartX = event.touches[0].clientX;
        }, { passive: true });

        document.addEventListener('touchend', (event) => {
            const diffY = touchStartY - event.changedTouches[0].clientY;
            const diffX = touchStartX - event.changedTouches[0].clientX;

            if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
                this.goToSlide(this.currentSlide + (diffY > 0 ? 1 : -1));
            }
        }, { passive: true });
    }

    setupProgressBar() {
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollHeight) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }, { passive: true });
    }

    setupNavDots() {
        const navContainer = document.getElementById('navDots');
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('nav-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            navContainer.appendChild(dot);
        });
        this.updateUI();
    }

    goToSlide(index) {
        if (index < 0 || index >= this.totalSlides || this.isScrolling) return;
        this.isScrolling = true;
        this.slides[index].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { this.isScrolling = false; }, 800);
    }

    updateUI() {
        document.getElementById('currentSlide').textContent =
            String(this.currentSlide + 1).padStart(2, '0');

        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
}
```

## 定制指南

### 实体词表定制

`highlightText()` 中的 `entityTerms` 数组需要根据每次汇报的实际内容定制。从 `slide-data.js` 中提取：

1. **产品名**：如 `OpenYida`、`MCP Server`
2. **技术术语**：如 `Vibe Coding`、`Prompt Pass`、`AI Skill`
3. **缩写/指标**：如 `NPS`、`GAAP`、`DAU`、`SaaS`
4. **时间标记**：如 `FY26`、`FY27`、`S1`、`S2`

排列时**长词在前**，避免短词先匹配截断长词（如 `MCP Server` 应在 `MCP` 之前）。

### 新增版式

如需新增版式类型：

1. 在 `renderSlide()` 的 switch 中添加新 case
2. 创建对应的 `static renderXxx(slide)` 方法
3. 在 `slide-data-schema.md` 中补充数据结构定义
4. 在 `slide-base.css` 中添加对应的 CSS 样式
