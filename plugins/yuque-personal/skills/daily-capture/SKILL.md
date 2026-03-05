---
name: daily-capture
description: Collect fleeting ideas and thoughts throughout the day, then periodically organize them into structured thematic notes in your Yuque knowledge base. For personal/individual use.
license: Apache-2.0
compatibility: Requires yuque-mcp server connected to a Yuque account with personal Token
metadata:
  author: chen201724
  version: "1.0"
---

# Daily Capture — Fleeting Ideas to Structured Notes

Capture random thoughts, inspirations, and fragments throughout the day. Periodically organize and merge them into structured thematic notes saved to your Yuque knowledge base.

## When to Use

- User wants to quickly jot down an idea or thought
- User says "记一下", "随手记", "我有个想法", "capture this", "先记着"
- User wants to review and organize accumulated captures
- User says "整理一下我最近的想法", "把碎片笔记归类", "organize my captures"

## Required MCP Tools

All tools are from the `yuque-mcp` server:

- `yuque_search` — Search for existing capture documents or thematic notes
- `yuque_get_doc` — Read existing capture log or thematic notes
- `yuque_create_doc` — Create new capture log or thematic notes
- `yuque_update_doc` — Append to capture log or update thematic notes
- `yuque_list_repos` — List knowledge bases to find the target repo

## Workflow

### Phase A: Quick Capture

When the user shares a fleeting idea or thought:

#### Step 1: Receive the Input

Accept the user's input as-is. It can be:
- A sentence or fragment
- A question they want to explore later
- A link with a brief comment
- A random observation or insight

#### Step 2: Classify the Capture

Assign a lightweight tag based on content:

| Tag | When to Use |
|-----|-------------|
| 💡 想法 | Original ideas, hypotheses, "what if" thoughts |
| 📌 待办 | Things to do or follow up on |
| 🔗 参考 | Links, references, things to read later |
| 💬 摘录 | Quotes or snippets from conversations |
| ❓ 问题 | Questions to research or think about |
| 🎯 灵感 | Creative sparks, project ideas |

#### Step 3: Append to Capture Log

Find or create a daily capture log document:

```
Tool: yuque_search
Parameters:
  query: "每日碎片 YYYY-MM-DD"
  type: "doc"
```

If no log exists for today, create one:

```
Tool: yuque_create_doc
Parameters:
  repo_id: "<target namespace>"
  title: "📝 每日碎片 — YYYY-MM-DD"
  body: "<capture log template>"
```

If the log exists, append the new capture:

```
Tool: yuque_update_doc
Parameters:
  repo_id: "<namespace>"
  doc_id: "<slug>"
  body: "<existing content + new capture entry>"
```

Each capture entry format:

```markdown
### [HH:MM] [Tag] 简短标题

[用户的原始内容]

---
```

Confirm to the user: "已记录 ✅ — [tag] [简短标题]"

### Phase B: Organize and Merge

When the user asks to organize their captures, or when there are enough accumulated entries:

#### Step 1: Gather Recent Captures

Search for recent capture logs:

```
Tool: yuque_search
Parameters:
  query: "每日碎片"
  type: "doc"
```

Fetch the content of recent capture logs (last 7 days or as specified by the user).

#### Step 2: Analyze and Group

Read through all captures and group them by theme:

1. **Identify themes** — Find captures that relate to the same topic, project, or idea
2. **Detect connections** — Note captures that build on each other or are complementary
3. **Flag actionable items** — Separate TODO items from reflective thoughts

Present the grouping to the user:

```markdown
## 📊 碎片整理预览

过去 [N] 天共 [X] 条碎片，归为 [Y] 个主题：

### 主题 1：[主题名称]（[N] 条相关）
- [碎片摘要 1]
- [碎片摘要 2]
- [碎片摘要 3]

### 主题 2：[主题名称]（[N] 条相关）
- [碎片摘要 1]
- [碎片摘要 2]

### 🔮 未归类（[N] 条）
- [碎片摘要]

要把哪些主题合并成正式笔记？
```

#### Step 3: Generate Thematic Notes

For each theme the user confirms, generate a structured note:

```markdown
# [主题标题]

> 📅 整理自 YYYY-MM-DD ~ YYYY-MM-DD 的碎片笔记
> 📝 包含 [N] 条相关想法

## 核心想法

[将相关碎片整合成连贯的叙述，保留原始洞察]

## 关键要点

1. **[要点 1]**：[展开说明]
2. **[要点 2]**：[展开说明]
3. **[要点 3]**：[展开说明]

## 待探索

- [ ] [从碎片中提取的待办或待研究项]
- [ ] [延伸问题]

## 原始碎片

<details>
<summary>查看原始记录</summary>

[按时间排列的原始碎片内容]

</details>
```

#### Step 4: Save Thematic Notes

```
Tool: yuque_create_doc
Parameters:
  repo_id: "<target namespace>"
  title: "[主题标题]"
  body: "<structured thematic note>"
```

Confirm: "主题笔记「[主题标题]」已保存到「[知识库名称]」：[文档链接]"

## Guidelines

- Always answer in the same language the user used (Chinese or English)
- Quick capture should be instant — don't over-process, just record and confirm
- Preserve the user's original wording in captures — don't rephrase their thoughts
- When organizing, respect the user's intent — ask before merging if themes are ambiguous
- Don't force organization — some captures are standalone and that's fine
- The "未归类" category is valid — not everything needs a theme
- Suggest organizing when captures accumulate (e.g., > 15 unorganized items)

## Error Handling

| Situation | Action |
|-----------|--------|
| Document not found (404) | Create a new capture log for today |
| Permission denied (403) | Tell user they may lack permission to access or edit this document |
| Target repo not found | List user's repos with `yuque_list_repos` and ask them to pick one |
| `yuque_create_doc` fails | Present the capture/note in chat and suggest manual saving |
| No captures found for organization | Inform user: "最近没有找到碎片记录，先随手记几条吧！" |
| Capture content is empty | Ask user: "你想记录什么？" |
