# Skills Market 🛒

欢迎来到 **Skills Market** - 一个社区共建的 AI Agent Skills 市场！

这里收集了各种第三方开发的 Agent Skills，你可以自由下载使用，也欢迎贡献你自己的 Skill！

## 📖 什么是 Skill？

Skill 是一种扩展 AI Agent 能力的模块化组件。通过安装不同的 Skills，你可以让 AI Agent 获得各种专业能力，比如：
- 代码审查
- 文档生成
- API 集成
- 自动化工作流
- ...更多可能

## 🚀 快速开始

### 方式一：下载单个 Skill

1. 浏览 `skills/` 目录，找到你需要的 Skill
2. 下载对应的 Skill 文件夹
3. 复制到你项目的 skills 目录中，例如：
   - Claude: `.claude/skills/`
   - Aone Copilot: `.aone_copilot/skills/`
   - 其他 Agent: 参考对应 Agent 的文档

### 方式二：下载 skill.zip

1. 在 GitHub 仓库页面点击 "Code" -> "Download ZIP"
2. 解压后选择需要的 Skill
3. 复制到你项目的 skills 目录

## 📁 目录结构

```
skills-market/
├── README.md                 # 项目说明文档
├── CONTRIBUTING.md           # 贡献指南
├── LICENSE                   # 开源协议
├── skills/                   # Skills 存放目录
│   ├── example-skill/        # 示例 Skill
│   │   ├── SKILL.md          # Skill 定义文件
│   │   └── ...
│   └── ...                   # 更多 Skills
└── .github/
    └── workflows/            # CI 配置
        └── validate.yml      # Skill 验证工作流
```

## 🤝 如何贡献

我们非常欢迎社区贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详情。

### 快速贡献步骤

1. Fork 本仓库
2. 在 `skills/` 目录下创建你的 Skill 文件夹
3. 添加 `SKILL.md` 文件（必须）
4. 提交 Pull Request

## 📋 Skill 规范

每个 Skill 必须包含以下文件：

| 文件 | 必需 | 说明 |
|------|------|------|
| `SKILL.md` | ✅ | Skill 定义文件，包含名称、描述、使用方法等 |
| `README.md` | 推荐 | Skill 的详细说明和使用示例 |
| 其他文件 | 可选 | 脚本、配置文件等 |

### SKILL.md 模板

```markdown
---
name: your-skill-name
description: 简短描述你的 Skill 功能
---

# Your Skill Name

详细描述你的 Skill 功能...

## 使用方法

说明如何使用这个 Skill...

## 配置

如果需要配置，说明配置方法...
```

## 🔍 可用 Skills

| Skill 名称 | 描述 | 作者 |
|-----------|------|------|
| example-skill | 示例 Skill 模板 | - |

> 欢迎贡献你的 Skill，让这个列表更加丰富！

## 📜 开源协议

本项目采用 MIT 协议开源，详见 [LICENSE](./LICENSE)。

## 💬 社区与支持

- 提交 Issue 反馈问题或建议
- 参与 Discussions 讨论
- 贡献代码或 Skill

---

**Happy Coding! 🎉**
