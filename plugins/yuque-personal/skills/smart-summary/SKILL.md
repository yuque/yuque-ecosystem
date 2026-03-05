---
name: smart-summary
description: Generate summaries of any Yuque document or knowledge base at different granularity levels — one-liner, key points, or detailed summary. For personal/individual use.
license: Apache-2.0
compatibility: Requires yuque-mcp server connected to a Yuque account with personal Token
metadata:
  author: chen201724
  version: "1.0"
---

# Smart Summary — Yuque Document & Knowledge Base Summarization

Generate summaries at different granularity levels for any Yuque document or entire knowledge base. Supports one-liner, key points extraction, and detailed summary modes.

## When to Use

- User wants a quick summary of a Yuque document or knowledge base
- User says "帮我总结一下这篇文档", "summarize this doc", "这个知识库讲了什么"
- User shares a Yuque document link and asks for a summary
- User wants to quickly understand the content of a repo without reading everything

## Required MCP Tools

All tools are from the `yuque-mcp` server:

- `yuque_get_doc` — Read full document content by slug/id
- `yuque_get_repo` — Get knowledge base metadata
- `yuque_list_docs` — List all documents in a knowledge base
- `yuque_get_toc` — Get the table of contents of a knowledge base

## Workflow

### Step 1: Identify the Target

Determine what the user wants summarized:

**Case A — Single Document:**
The user provides a document link or specifies a document by name. Extract `repo_id` (namespace) and `doc_id` (slug) from the link.

Yuque doc URL pattern: `https://www.yuque.com/{namespace}/{slug}`

**Case B — Entire Knowledge Base:**
The user provides a knowledge base link or name. Extract `repo_id` (namespace).

Yuque repo URL pattern: `https://www.yuque.com/{namespace}`

If the user's input is ambiguous, ask: "你想总结单篇文档还是整个知识库？"

### Step 2: Determine Summary Granularity

Check if the user specified a granularity level. If not, default to **key points**.

| Level | Trigger Phrases | Output |
|-------|----------------|--------|
| **one-liner** (一句话摘要) | "一句话总结", "简单说说", "TL;DR" | 1 sentence, ≤50 words |
| **key-points** (要点提取) | "要点", "关键点", "summarize" (default) | 5-10 bullet points |
| **detailed** (详细摘要) | "详细总结", "完整摘要", "deep summary" | Structured multi-section summary |

### Step 3: Fetch Content

**For a single document:**

```
Tool: yuque_get_doc
Parameters:
  repo_id: "<namespace>"
  doc_id: "<slug>"
```

**For an entire knowledge base:**

First, get the TOC to understand the structure:

```
Tool: yuque_get_toc
Parameters:
  repo_id: "<namespace>"
```

Then list all documents:

```
Tool: yuque_list_docs
Parameters:
  repo_id: "<namespace>"
```

For knowledge base summaries, read up to 10 key documents (prioritize by TOC order and recent updates). Do NOT try to read every document in a large repo.

```
Tool: yuque_get_doc
Parameters:
  repo_id: "<namespace>"
  doc_id: "<slug>"
```

If `yuque_get_doc` returns a 404, skip the document and note it may have been deleted.
If `yuque_get_doc` returns a 403, note the user may lack permission.

### Step 4: Generate Summary

**One-liner format:**

```markdown
📝 **一句话摘要**：[一句话概括文档/知识库的核心内容]
```

**Key-points format:**

```markdown
## 📋 要点摘要

**文档**：[文档标题](文档链接)
**知识库**：[知识库名称]
**更新时间**：YYYY-MM-DD

### 核心要点

1. **[要点标题]**：[简要说明，1-2 句话]
2. **[要点标题]**：[简要说明，1-2 句话]
3. **[要点标题]**：[简要说明，1-2 句话]
...

### 一句话总结

[用一句话概括全文核心观点]
```

**Detailed format:**

```markdown
## 📖 详细摘要

**文档**：[文档标题](文档链接)
**知识库**：[知识库名称]
**更新时间**：YYYY-MM-DD
**字数**：约 X 字

### 背景与目的

[文档的背景、写作目的，2-3 句话]

### 主要内容

#### [章节 1 标题]
[该章节的核心内容摘要]

#### [章节 2 标题]
[该章节的核心内容摘要]

...

### 核心结论

- [结论 1]
- [结论 2]
- [结论 3]

### 一句话总结

[用一句话概括全文]
```

**For knowledge base summaries, use this format:**

```markdown
## 📚 知识库摘要

**知识库**：[知识库名称](知识库链接)
**文档数量**：X 篇
**最近更新**：YYYY-MM-DD

### 知识库概览

[2-3 句话描述这个知识库的主题和用途]

### 内容结构

1. **[分类/目录 1]**（X 篇）：[简要描述]
2. **[分类/目录 2]**（X 篇）：[简要描述]
...

### 重点文档

1. [文档标题](链接) — [一句话描述]
2. [文档标题](链接) — [一句话描述]
3. [文档标题](链接) — [一句话描述]
```

## Guidelines

- Always answer in the same language the user used (Chinese or English)
- For knowledge base summaries, focus on structure and key documents rather than trying to summarize every single doc
- Preserve the original document's terminology and key concepts
- If the document is very short (< 100 words), just present the content directly instead of summarizing
- Never fabricate content not present in the original document
- Include links back to the original document(s) so the user can read the full source
- When summarizing a knowledge base, respect the TOC order as it reflects the author's intended structure

## Error Handling

| Situation | Action |
|-----------|--------|
| Document not found (404) | Inform user the document may have been deleted or the link is incorrect |
| Permission denied (403) | Tell user they may lack permission to access this document |
| Knowledge base is empty | Inform user: "这个知识库目前没有文档" |
| Knowledge base has 50+ docs | Read only the top 10 by TOC order, note that summary covers key documents only |
| Document content is empty | Skip and note: "该文档内容为空" |
| API timeout | Retry once, then inform user of connectivity issue |
