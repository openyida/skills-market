# Changelog

All notable changes to this project will be documented in this file.

## [2026.03.23-1] - 2026-03-23

### Added
- **report-slides** skill：将 Markdown 转换为精美 HTML 演示文稿，支持 11 种风格预设、15 种版式类型
- **yida-form-detail** skill：宜搭表单详情页 CSS 样式优化，实现圆角卡片化现代视觉效果

### Changed
- 快速开始：新增从 Release 页面下载 zip 包的引导方式
- Skill 规范：对齐业界标准，补充 Front Matter 字段规范、目录结构说明、命名规范
- 可用 Skills 列表：补充 report-slides 和 yida-form-detail 的详细功能描述
- CI：`release.yml` 触发条件改为 push tag（`v*` 或日期格式），自动打包发布每个 Skill 的 zip

### Contributors
- [@yipengmu](https://github.com/yipengmu) — report-slides
- [@chengminchao-create](https://github.com/chengminchao-create) — yida-form-detail
- [@alex-mm](https://github.com/alex-mm) — 项目发起与维护
