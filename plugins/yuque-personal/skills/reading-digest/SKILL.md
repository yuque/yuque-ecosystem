---
name: reading-digest
description: Extract core insights, golden quotes, and action items from articles, then generate structured reading notes and save them to a specified Yuque knowledge base. For personal/individual use.
license: Apache-2.0
compatibility: Requires yuque-mcp server connected to a Yuque account with personal Token
metadata:
  author: chen201724
  version: "1.0"
---

# Reading Digest — Structured Reading Notes Generator

Read an article or document, extract core insights, golden quotes, and action items, then generate structured reading notes and optionally save them to a Yuque knowledge base.

## When to Use

- User has finished reading an article and wants to capture key takeaways
- User says "帮我做阅读笔记", "extract key points from this article", "读书笔记"
- User shares a Yuque document link and wants structured notes
- User wants to build a personal reading notes knowledge base

## Required MCP Tools

All tools are from the `yuque-mcp` server:

- `yuque_get_doc` — Read full document content
- `yuque_list_repos` — List user's knowledge bases (to find the target repo for saving)
- `yuque_create_doc` — Create a new document (to save reading notes)
- `yuque_search` — Search for existing reading notes to avoid duplicates

## Workflow

### Step 1: Get the Source Article

**Case A — Yuque document link:**
Extract `repo_id` and `doc_id` from the URL and fetch the content:

```
Tool: yuque_get_doc
Parameters:
  repo_id: "<namespace>"
  doc_id: "<slug>"
```

**Case B — User pastes article text directly:**
Use the provided text as the source content. No tool call needed.

**Case C — User provides an external URL:**
Inform the user: "我目前只能处理语雀文档链接或直接粘贴的文本。如果是外部文章，请把内容粘贴给我。"

If the document is not found (404) or permission denied (403), inform the user and stop.

### Step 2: Analyze and Extract

Read through the full content and extract the following elements:

1. **Core Insights (核心观点)** — The main arguments or ideas the author presents (3-7 items)
2. **Golden Quotes (金句)** — Memorable, well-crafted sentences worth saving (2-5 items)
3. **Action Items (行动项)** — Concrete things the reader can do based on this article (0-5 items)
4. **Key Concepts (关键概念)** — Important terms or frameworks introduced (0-5 items)
5. **Personal Relevance (个人关联)** — How this might connect to the reader's existing knowledge

### Step 3: Generate Structured Reading Notes

Format the reading notes as follows:

```markdown
# 📖 阅读笔记：[原文标题]

> **来源**：[文档标题](文档链接)
> **作者**：[原文作者]
> **阅读日期**：YYYY-MM-DD
> **阅读耗时**：约 X 分钟（按 300 字/分钟估算）

## 一句话总结

[用一句话概括这篇文章的核心价值]

## 核心观点

1. **[观点标题]**：[展开说明，2-3 句话]
2. **[观点标题]**：[展开说明，2-3 句话]
3. **[观点标题]**：[展开说明，2-3 句话]

## 金句摘录

> [原文金句 1]

> [原文金句 2]

> [原文金句 3]

## 关键概念

| 概念 | 解释 |
|------|------|
| [概念 1] | [简要解释] |
| [概念 2] | [简要解释] |

## 行动项

- [ ] [具体可执行的行动 1]
- [ ] [具体可执行的行动 2]
- [ ] [具体可执行的行动 3]

## 我的思考

[基于文章内容，提出 1-2 个延伸思考问题，帮助读者深入反思]

---
*由 AI 辅助生成的阅读笔记*
```

If the article has no clear action items, omit that section. If there are no notable golden quotes, omit that section too. Adapt the template to fit the content.

### Step 4: Save to Knowledge Base (Optional)

Ask the user: "要把这份阅读笔记保存到语雀知识库吗？如果要，请告诉我保存到哪个知识库。"

If the user specifies a knowledge base:

First, check if a reading notes document for this article already exists:

```
Tool: yuque_search
Parameters:
  query: "[原文标题] 阅读笔记"
  type: "doc"
```

If a duplicate is found, ask the user: "已经存在一份关于这篇文章的阅读笔记，要覆盖还是创建新的？"

Then create the document:

```
Tool: yuque_create_doc
Parameters:
  repo_id: "<target namespace>"
  title: "📖 阅读笔记：[原文标题]"
  body: "<generated reading notes in markdown>"
```

After saving, confirm: "阅读笔记已保存到「[知识库名称]」：[新文档链接]"

If the user doesn't want to save, just present the reading notes in the chat.

## Guidelines

- Always answer in the same language the user used (Chinese or English)
- Golden quotes must be exact quotes from the original text — never paraphrase them
- Action items should be specific and actionable, not vague ("学习 React hooks" not "多学习")
- Core insights should capture the author's intent, not your interpretation
- Estimate reading time based on ~300 Chinese characters/minute or ~200 English words/minute
- If the article is very short (< 200 words), simplify the output — skip sections that don't apply
- The "我的思考" section should pose genuine questions, not rhetorical ones

## Error Handling

| Situation | Action |
|-----------|--------|
| Document not found (404) | Inform user the document may have been deleted or the link is incorrect |
| Permission denied (403) | Tell user they may lack permission to access this document |
| Document content is empty | Inform user: "该文档内容为空，无法生成阅读笔记" |
| Target repo not found when saving | List user's repos with `yuque_list_repos` and ask them to pick one |
| `yuque_create_doc` fails | Inform user the save failed, present the notes in chat instead |
| Article is not text-based (e.g., pure images) | Inform user: "该文档主要是图片内容，无法提取文字进行分析" |
