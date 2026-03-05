---
name: knowledge-connect
description: Analyze documents in your Yuque knowledge base, discover hidden connections between them (similar topics, complementary content), and suggest cross-reference links to build a knowledge network. For personal/individual use.
license: Apache-2.0
compatibility: Requires yuque-mcp server connected to a Yuque account with personal Token
metadata:
  author: chen201724
  version: "1.0"
---

# Knowledge Connect — Discover Links Between Your Notes

Analyze documents in your Yuque knowledge base, find hidden connections between them — similar topics, complementary content, shared concepts — and suggest cross-reference links to help you build a connected knowledge network.

## When to Use

- User wants to find connections between their notes
- User says "帮我找找文档之间的关联", "哪些笔记是相关的", "connect my notes"
- User just finished writing a document and wants to link it to related ones
- User says "这篇文档和哪些笔记有关", "find related documents"
- User wants to build a knowledge graph from their existing notes

## Required MCP Tools

All tools are from the `yuque-mcp` server:

- `yuque_list_repos` — List user's knowledge bases
- `yuque_get_repo_docs` — List all documents in a knowledge base
- `yuque_get_doc` — Read document content for analysis
- `yuque_search` — Search for potentially related documents
- `yuque_update_doc` — Add cross-reference links to documents

## Workflow

### Step 1: Determine the Scope

Ask the user what to analyze:

**Case A — Single document:**
User provides a specific document link. Find connections for this one document.

**Case B — Entire knowledge base:**
User specifies a knowledge base. Analyze all documents within it.

**Case C — Across knowledge bases:**
User wants cross-repo connections. Analyze documents across multiple repos.

For Case B/C, first list available repos:

```
Tool: yuque_list_repos
```

Then list documents in the target repo(s):

```
Tool: yuque_get_repo_docs
Parameters:
  repo_id: "<namespace>"
```

### Step 2: Analyze Documents

For each document in scope, fetch its content:

```
Tool: yuque_get_doc
Parameters:
  repo_id: "<namespace>"
  doc_id: "<slug>"
```

Extract the following from each document:

| Element | Description |
|---------|-------------|
| **Topics** | Main subjects the document covers |
| **Key Concepts** | Important terms, frameworks, or ideas |
| **Questions** | Questions raised but not fully answered |
| **References** | External sources or concepts mentioned |
| **Domain** | The knowledge area (tech, management, personal, etc.) |

### Step 3: Discover Connections

Compare documents pairwise and identify these types of connections:

| Connection Type | Description | Example |
|----------------|-------------|---------|
| 🔄 **Same Topic** | Documents covering the same subject from different angles | Two articles about "distributed systems" |
| 🧩 **Complementary** | One document answers questions raised in another | A "why microservices" doc + a "microservices pitfalls" doc |
| 📚 **Sequential** | Documents that form a natural reading sequence | "Intro to X" → "Advanced X" → "X in Practice" |
| 🌱 **Evolution** | Earlier and later thinking on the same topic | A draft idea → a refined version months later |
| 🔗 **Shared Concept** | Documents that reference the same key concept | Multiple docs mentioning "second brain" methodology |

For single-document analysis, also search for related documents:

```
Tool: yuque_search
Parameters:
  query: "[key topics from the document]"
  type: "doc"
```

### Step 4: Present Connection Map

Present the discovered connections to the user:

```markdown
## 🕸️ 知识关联分析

分析范围：[知识库名称] — [N] 篇文档
发现 [X] 组关联

### 关联 1：[主题/概念名称]

| 文档 | 关联类型 | 关联强度 |
|------|----------|----------|
| [文档 A 标题](链接) | 🔄 同主题 | ⭐⭐⭐ |
| [文档 B 标题](链接) | 🧩 互补 | ⭐⭐⭐ |
| [文档 C 标题](链接) | 🔗 共享概念 | ⭐⭐ |

**关联说明**：[为什么这些文档相关，它们之间的具体联系是什么]

**建议**：[具体的交叉引用建议，如 "在文档 A 的第二节末尾添加指向文档 B 的链接"]

### 关联 2：[主题/概念名称]

...

### 🏝️ 孤岛文档

以下文档暂未发现明显关联：
- [文档标题](链接) — 可能需要补充更多内容后再分析

### 💡 建议

1. [建议 1：如 "建议创建一篇索引文档，串联关于 X 主题的 5 篇笔记"]
2. [建议 2：如 "文档 A 和文档 B 观点互补，可以合并成一篇完整的指南"]
```

### Step 5: Add Cross-References (Optional)

Ask the user: "要自动在相关文档中添加交叉引用链接吗？"

If confirmed, for each document that needs cross-references:

```
Tool: yuque_get_doc
Parameters:
  repo_id: "<namespace>"
  doc_id: "<slug>"
```

Append a "Related Notes" section at the end:

```markdown

---

## 📎 相关笔记

- 🔄 [相关文档标题](链接) — [一句话说明关联]
- 🧩 [相关文档标题](链接) — [一句话说明关联]

*由 AI 分析生成的关联推荐 — YYYY-MM-DD*
```

```
Tool: yuque_update_doc
Parameters:
  repo_id: "<namespace>"
  doc_id: "<slug>"
  body: "<original content + related notes section>"
```

Confirm: "已为 [N] 篇文档添加了交叉引用链接 ✅"

## Guidelines

- Always answer in the same language the user used (Chinese or English)
- Connection strength should be based on actual content overlap, not just title similarity
- Be specific about why documents are connected — vague "they're related" is not helpful
- Don't force connections — if two documents aren't meaningfully related, don't link them
- For large knowledge bases (> 50 docs), suggest analyzing in batches by topic area
- The "孤岛文档" section is valuable — it helps users identify notes that need more context
- When adding cross-references, never modify the original content — only append at the end
- Suggest creating index/hub documents for topics with 3+ related notes

## Error Handling

| Situation | Action |
|-----------|--------|
| Document not found (404) | Skip the document and note it in the report |
| Permission denied (403) | Tell user they may lack permission to access this document |
| Knowledge base is empty | Inform user: "该知识库还没有文档，先写几篇笔记再来分析关联吧" |
| Knowledge base has < 3 documents | Inform user: "文档数量较少，建议积累更多笔记后再做关联分析，效果会更好" |
| `yuque_update_doc` fails | Present the suggested cross-references in chat for manual adding |
| Too many documents to analyze at once | Suggest narrowing scope: "知识库文档较多，建议先选一个主题方向分析" |
