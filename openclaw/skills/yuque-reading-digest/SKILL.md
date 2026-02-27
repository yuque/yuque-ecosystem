---
name: yuque-reading-digest
description: "阅读文章后自动提取核心观点、金句、行动项，生成结构化阅读笔记并保存到语雀。Use when: 用户分享文章链接、粘贴文章内容、或说「帮我做阅读笔记」。"
metadata:
  {
    "openclaw":
      {
        "emoji": "📖",
        "requires": { "mcp": ["yuque"] },
        "install":
          [
            {
              "id": "mcporter",
              "kind": "mcporter",
              "server": "yuque",
              "label": "Configure Yuque MCP via mcporter",
            },
          ],
      },
  }
---

# 阅读笔记 Skill

阅读文章后自动提取核心观点、金句、行动项，生成结构化阅读笔记。

## 触发条件

✅ **USE this skill when:**

- 用户分享文章链接并说「帮我做笔记」
- 用户粘贴文章内容要求整理
- 用户说「阅读笔记」「读书笔记」「提取要点」
- 用户说「总结这篇文章」并想要保存到语雀

❌ **DON'T use this skill when:**

- 用户只想要口头总结，不需要保存
- 用户想要编辑已有笔记（使用 yuque-note-refine）

## 工作流程

1. **获取内容** - 抓取文章链接或接收粘贴内容
2. **智能分析** - 提取核心观点、金句、行动项
3. **生成笔记** - 按模板结构化整理
4. **保存到语雀** - 调用 `yuque.yuque_create_doc` 创建文档

## 笔记模板

```markdown
# 📖 {文章标题}

> 原文链接: {url}
> 阅读日期: {date}
> 阅读时长: {estimated_time}

## 📌 核心观点

1. ...
2. ...
3. ...

## 💎 金句摘录

> "..."
> — 出处

## ✅ 行动项

- [ ] ...
- [ ] ...

## 💭 我的思考

{留空供用户补充}

## 🏷️ 标签

#阅读笔记 #{category}
```

## MCP 调用

```bash
# 搜索目标知识库
mcporter call yuque.yuque_list_repos

# 创建阅读笔记
mcporter call yuque.yuque_create_doc \
  repo_id="reading-notes" \
  title="📖 文章标题" \
  body="笔记内容" \
  format="markdown"
```

## 使用示例

```
用户: 帮我把这篇文章做成阅读笔记 https://example.com/article

助手:
1. 抓取文章内容
2. 分析提取要点
3. 生成结构化笔记
4. 保存到语雀「阅读笔记」知识库
5. 返回笔记链接
```

## 注意事项

- 默认保存到「阅读笔记」知识库，如不存在会自动创建
- 支持网页、PDF、微信公众号文章
- 长文章会自动分段处理

