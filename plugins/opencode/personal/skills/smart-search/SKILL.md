---
name: smart-search
description: Search your personal Yuque knowledge bases with natural language queries and provide summarized answers with key points and source links. For personal/individual use — searches across your own documents.
license: Apache-2.0
compatibility: Requires yuque-mcp server connected to a Yuque account with personal Token
metadata:
  author: chen201724
  version: "2.0"
---

# Smart Search — Yuque Personal Knowledge Base Search & Q&A

Search across your personal Yuque knowledge bases using natural language, read relevant documents, and synthesize a clear answer with references.

## When to Use

- User asks a question that might be answered by their personal Yuque docs
- User wants to find specific information in their own knowledge base
- User says "搜一下我的文档", "search my Yuque", "我的知识库里有没有..."

## Required MCP Tools

All tools are from the `yuque-mcp` server:

- `yuque_search` — Search documents by keyword
- `yuque_get_doc` — Read full document content by slug/id

## Workflow

### Step 1: Extract Search Keywords

From the user's natural language query, extract 1-3 concise Chinese keywords. Yuque search works best with short, specific terms.

Examples:
- "我的部署流程文档在哪？" → keywords: `部署流程`
- "How do I handle error logging?" → keywords: `错误日志` or `日志处理`
- "我之前写的技术评审笔记" → keywords: `技术评审`

### Step 2: Search Documents

Call `yuque_search` with the extracted keywords:

```
Tool: yuque_search
Parameters:
  query: "<keywords>"
  type: "doc"
```

If the search returns no results:
1. Try alternative keywords (synonyms, broader terms)
2. Try splitting compound terms (e.g., "部署流程" → "部署" or "流程")
3. If still no results, tell the user honestly: "在你的语雀知识库中未找到相关文档，建议尝试其他关键词或确认文档是否存在。"

### Step 3: Filter and Rank Results

From the search results, select the top 3-5 most relevant documents based on:
- Title relevance to the query
- Document update time (prefer recent)
- Repository context (focus on user's personal repos)

### Step 4: Read Document Content

For each selected document, fetch the full content:

```
Tool: yuque_get_doc
Parameters:
  repo_id: "<namespace>"    # e.g., "username/my-notes" (from search result's book.namespace)
  doc_id: "<slug>"          # e.g., "api" (from search result's target.slug)
```

Note: The search result contains nested data. Extract these key fields:
- `target.slug` → use as `doc_id`
- `target.book.namespace` → use as `repo_id`
- `target.title` → document title
- `target.updated_at` → last update time

Read up to 3 documents. If the first document fully answers the question, you may skip the rest.

### Step 5: Synthesize and Respond

Compose the answer in the following format:

```markdown
## 回答

[直接回答用户的问题，2-4 句话，简洁明了]

## 关键要点

- **要点 1**：[从文档中提取的关键信息]
- **要点 2**：[从文档中提取的关键信息]
- **要点 3**：[从文档中提取的关键信息]

## 参考文档

1. [文档标题](文档链接) — 来自「知识库名称」，更新于 YYYY-MM-DD
2. [文档标题](文档链接) — 来自「知识库名称」，更新于 YYYY-MM-DD
```

## Guidelines

- Always answer in the same language the user used (Chinese or English)
- Quote specific content from documents when relevant — use `>` blockquotes
- If documents contain conflicting information, note the discrepancy and mention which doc is more recent
- If the answer is only partially found, say what you found and what's missing
- Never fabricate information not present in the documents
- Include document links so the user can read the full source
- This skill searches the user's personal knowledge bases — for team knowledge bases, use the `smart-search` skill in the `yuque-group` plugin

## Error Handling

| Situation | Action |
|-----------|--------|
| `yuque_search` returns empty | Try alternative keywords, then inform user |
| `yuque_get_doc` fails (404) | Skip this doc, note it may have been deleted |
| `yuque_get_doc` fails (403) | Tell user they may lack permission to access this doc |
| API timeout | Retry once, then inform user of connectivity issue |
| Too many results | Focus on top 3 by relevance, mention there are more results available |
