---
name: example-skill
description: 这是一个示例 Skill 模板，展示如何创建一个标准的 Skill
author: openyida
tags: example, template, demo
---

# Example Skill

这是一个示例 Skill，用于演示如何创建一个标准的 Skill。

## 功能描述

这个 Skill 展示了：
- Skill 的基本结构
- SKILL.md 的标准格式
- 如何编写清晰的文档

## 使用方法

### 安装

1. 下载 `example-skill` 文件夹
2. 复制到你项目的 skills 目录：
   ```
   # Claude
   cp -r example-skill ~/.claude/skills/
   
   # Aone Copilot
   cp -r example-skill .aone_copilot/skills/
   ```

### 使用

在你的 Agent 中引用这个 Skill：

```
请使用 example-skill 帮我完成任务...
```

## 示例

### 示例 1：基本使用

输入：
```
使用 example-skill 分析这段代码
```

输出：
```
[Skill] Example Skill 已激活
正在分析代码...
```

## 配置

本 Skill 无需额外配置。

## 注意事项

- 这是一个模板 Skill，实际使用时请根据需要修改
- 确保 Skill 文件夹名称与 `name` 字段一致

## 更新日志

### v1.0.0 (2024-01-01)
- 初始版本
