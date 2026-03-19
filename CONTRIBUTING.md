# 贡献指南 🤝

感谢你考虑为 Skills Market 做贡献！

## 🎯 贡献方式

### 1. 贡献新的 Skill

我们非常欢迎你分享自己开发的 Skill！

#### 提交新 Skill 的步骤：

1. **Fork 本仓库**
   ```bash
   # 在 GitHub 页面点击 Fork 按钮
   ```

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/skills-market.git
   cd skills-market
   ```

3. **创建分支**
   ```bash
   git checkout -b skill/your-skill-name
   ```

4. **创建 Skill 目录**
   ```bash
   mkdir -p skills/your-skill-name
   ```

5. **添加 Skill 文件**
   
   最少需要创建 `SKILL.md` 文件：
   ```markdown
   ---
   name: your-skill-name
   description: 简短描述你的 Skill 功能（建议不超过 100 字符）
   author: your-name (可选)
   tags: tag1, tag2, tag3 (可选)
   ---
   
   # Your Skill Name
   
   ## 功能描述
   
   详细描述你的 Skill 能做什么...
   
   ## 使用方法
   
   1. 步骤一
   2. 步骤二
   
   ## 示例
   
   提供使用示例...
   
   ## 注意事项
   
   如有需要，添加注意事项...
   ```

6. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add your-skill-name skill"
   git push origin skill/your-skill-name
   ```

7. **创建 Pull Request**
   - 在 GitHub 上创建 PR
   - 填写 PR 模板中的信息
   - 等待审核

### 2. 改进现有 Skill

如果你发现某个 Skill 有问题或可以改进：

1. Fork 仓库
2. 创建分支：`improve/skill-name`
3. 进行修改
4. 提交 PR

### 3. 报告问题

如果你发现 Bug 或有功能建议：

1. 在 Issues 中搜索是否已有相关问题
2. 如果没有，创建新 Issue
3. 详细描述问题或建议

### 4. 完善文档

文档改进包括：
- 修正错别字
- 改进说明
- 添加示例
- 翻译文档

## ✅ Skill 质量标准

提交的 Skill 应满足以下标准：

### 必须项

- [ ] 包含 `SKILL.md` 文件
- [ ] `SKILL.md` 包含必要的 frontmatter（name, description）
- [ ] 描述清晰，能让人理解 Skill 的用途
- [ ] 文件夹命名使用小写字母和连字符（如 `my-skill`）

### 推荐项

- [ ] 包含 `README.md` 详细说明
- [ ] 提供使用示例
- [ ] 添加必要的测试
- [ ] 标注适用的 Agent 类型

## 🔍 审核流程

1. 自动检查（CI）
   - 文件结构验证
   - SKILL.md 格式验证

2. 人工审核
   - 功能合理性
   - 文档完整性
   - 代码质量

3. 合并
   - 审核通过后合并到主分支

## 📝 代码规范

### 文件命名

- 使用小写字母
- 单词间用连字符连接
- 示例：`code-review-skill`

### SKILL.md 格式

```markdown
---
name: skill-name
description: 简短描述
author: 作者名 (可选)
tags: 标签1, 标签2 (可选)
---

# Skill 名称

## 功能描述

## 使用方法

## 示例

## 配置 (如需要)

## 注意事项 (如需要)
```

## 🙏 感谢

感谢所有贡献者的付出！

---

如有任何问题，欢迎在 Issues 中提问。
