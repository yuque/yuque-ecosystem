---
name: stale-detector
description: Scan a Yuque knowledge base to find stale or potentially outdated documents, analyze their relevance, and generate a maintenance report with update or archive recommendations. For personal/individual use.
license: Apache-2.0
compatibility: Requires yuque-mcp server connected to a Yuque account with personal Token
metadata:
  author: chen201724
  version: "1.0"
---

# Stale Detector — Knowledge Base Freshness Audit

Scan a Yuque knowledge base to discover documents that haven't been updated in a long time, analyze whether their content may be outdated, and generate a maintenance report with actionable recommendations.

## When to Use

- User wants to clean up or maintain their knowledge base
- User says "帮我检查哪些文档过期了", "find stale docs", "知识库体检"
- User wants to identify documents that need updating or archiving
- User is doing a periodic knowledge base review

## Required MCP Tools

All tools are from the `yuque-mcp` server:

- `yuque_list_repos` — List user's knowledge bases
- `yuque_list_docs` — List all documents in a knowledge base with metadata
- `yuque_get_doc` — Read document content for staleness analysis
- `yuque_get_toc` — Get knowledge base structure

## Workflow

### Step 1: Identify the Target Knowledge Base

**Case A — User specifies a knowledge base:**
Extract `repo_id` (namespace) from the provided link or name.

**Case B — User wants to scan all knowledge bases:**
List all repos first:

```
Tool: yuque_list_repos
Parameters:
  user_id: "<user_id>"
```

Present the list and let the user choose, or scan them one by one if the user confirms.

**Case C — User is vague:**
Ask: "你想检查哪个知识库？我可以先列出你的所有知识库。"

### Step 2: Fetch Document List

Get all documents in the target knowledge base:

```
Tool: yuque_list_docs
Parameters:
  repo_id: "<namespace>"
```

Extract key metadata for each document:
- `title` — Document title
- `slug` — Document identifier
- `updated_at` — Last update timestamp
- `created_at` — Creation timestamp
- `word_count` — Document length
- `status` — Publication status

If the knowledge base is empty (no documents), inform the user: "这个知识库目前没有文档。"

### Step 3: Classify Documents by Freshness

Calculate the age of each document (days since last update) and classify:

| Category | Criteria | Label |
|----------|----------|-------|
| 🟢 **Fresh** | Updated within 90 days | 活跃 |
| 🟡 **Aging** | Updated 90-180 days ago | 老化中 |
| 🟠 **Stale** | Updated 180-365 days ago | 陈旧 |
| 🔴 **Dormant** | Not updated for 365+ days | 休眠 |

### Step 4: Deep Analysis of Stale Documents

For documents classified as 🟠 Stale or 🔴 Dormant, read the content of up to 10 documents (prioritize the oldest and most important-looking ones by title):

```
Tool: yuque_get_doc
Parameters:
  repo_id: "<namespace>"
  doc_id: "<slug>"
```

For each document, analyze:

1. **Time-sensitive content** — Does it reference specific dates, versions, or events that may have passed?
   - Software version numbers (e.g., "React 16", "Node 12")
   - Date references (e.g., "2023年计划", "Q3 目标")
   - Links that may be broken
   - Policies or processes that may have changed

2. **Evergreen content** — Is the content timeless?
   - Conceptual explanations, principles, personal reflections
   - These may be old but still valid

3. **Recommendation:**
   - **Update** — Content is valuable but contains outdated information
   - **Archive** — Content is no longer relevant, move to archive
   - **Keep** — Content is evergreen, no action needed despite age
   - **Review** — Uncertain, needs human judgment

If `yuque_get_doc` fails (404/403), note the document as inaccessible and skip.

### Step 5: Generate Maintenance Report

```markdown
## 🔍 知识库健康报告

**知识库**：[知识库名称](知识库链接)
**扫描时间**：YYYY-MM-DD HH:MM
**文档总数**：X 篇

### 📊 整体健康度

| 状态 | 数量 | 占比 |
|------|------|------|
| 🟢 活跃（90 天内更新） | X | XX% |
| 🟡 老化中（90-180 天） | X | XX% |
| 🟠 陈旧（180-365 天） | X | XX% |
| 🔴 休眠（365 天以上） | X | XX% |

**健康评分**：X/100
（计算方式：🟢×100 + 🟡×70 + 🟠×30 + 🔴×0，加权平均）

### 🔴 需要关注的文档

#### 建议更新

| 文档 | 上次更新 | 原因 |
|------|----------|------|
| [文档标题](链接) | YYYY-MM-DD | [e.g., 引用了 Node 12，当前已是 Node 22] |
| [文档标题](链接) | YYYY-MM-DD | [e.g., 包含 2023 年的计划，需要更新] |

#### 建议归档

| 文档 | 上次更新 | 原因 |
|------|----------|------|
| [文档标题](链接) | YYYY-MM-DD | [e.g., 已完成的项目记录，可归档] |

#### 建议保留（虽旧但有效）

| 文档 | 上次更新 | 原因 |
|------|----------|------|
| [文档标题](链接) | YYYY-MM-DD | [e.g., 通用方法论，内容不过时] |

#### 需要人工判断

| 文档 | 上次更新 | 原因 |
|------|----------|------|
| [文档标题](链接) | YYYY-MM-DD | [e.g., 无法确定内容是否仍然有效] |

### 💡 维护建议

1. [具体建议 1：e.g., 建议每季度审查一次「技术文档」分类下的文档]
2. [具体建议 2：e.g., 考虑创建一个「归档」知识库，将不再维护的文档迁移过去]
3. [具体建议 3：e.g., 有 X 篇文档超过 2 年未更新，建议集中处理]
```

### Step 6: Offer Follow-up Actions

After presenting the report, offer:

- "需要我帮你把建议归档的文档移到归档知识库吗？"
- "需要我帮你逐篇查看需要更新的文档，给出具体的更新建议吗？"
- "需要我定期（比如每月）帮你做一次知识库体检吗？"

These are suggestions only — do not take action without user confirmation.

## Guidelines

- Always answer in the same language the user used (Chinese or English)
- Be conservative with "archive" recommendations — when in doubt, suggest "review" instead
- Don't read every document in a large knowledge base — sample strategically
- The health score is a rough indicator, not a precise metric — present it as such
- Evergreen content (personal reflections, principles, methodologies) should not be flagged as stale just because of age
- Focus on actionable recommendations, not just listing old documents
- If the knowledge base has fewer than 5 documents, simplify the report format

## Error Handling

| Situation | Action |
|-----------|--------|
| Knowledge base not found | Inform user and suggest listing their repos with `yuque_list_repos` |
| Knowledge base is empty | Inform user: "这个知识库目前没有文档，无需体检" |
| `yuque_list_docs` returns error | Inform user of the issue, suggest checking the knowledge base link |
| Too many documents (100+) | Analyze metadata for all, but only deep-read the top 10 stalest documents |
| All documents are fresh | Congratulate the user: "知识库状态很健康！所有文档都在活跃维护中 🎉" |
| API rate limiting | Slow down requests, inform user if the scan takes longer than expected |
