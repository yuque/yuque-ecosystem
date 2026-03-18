---
name: note-refine
description: Polish rough notes into high-quality documents — add structure, improve expression, and enhance formatting while preserving the original meaning. For personal/individual use.
license: Apache-2.0
compatibility: Requires yuque-mcp server connected to a Yuque account with personal Token
metadata:
  author: chen201724
  version: "1.0"
---

# Note Refine — Polish Rough Notes into Quality Documents

Transform rough, unstructured notes into well-organized, readable documents. Adds proper headings, table of contents, improves expression, and enhances formatting — all while preserving the original meaning.

## When to Use

- User has a rough draft or messy notes they want to clean up
- User says "帮我整理一下这篇笔记", "polish my notes", "把这个文档排版优化一下"
- User wants to improve readability of an existing Yuque document
- User has bullet points or fragments they want turned into a proper document

## Required MCP Tools

All tools are from the `yuque-mcp` server:

- `yuque_get_doc` — Read the original document content
- `yuque_update_doc` — Update the document with refined content

## Workflow

### Step 1: Get the Source Notes

**Case A — Yuque document link:**
Extract `repo_id` and `doc_id` from the URL and fetch the content:

```
Tool: yuque_get_doc
Parameters:
  repo_id: "<namespace>"
  doc_id: "<slug>"
```

**Case B — User pastes text directly:**
Use the provided text as the source content. No tool call needed.

If the document is not found (404) or permission denied (403), inform the user and stop.

### Step 2: Analyze the Current State

Before refining, assess the notes on these dimensions:

| Dimension | What to Check |
|-----------|---------------|
| **Structure** | Are there headings? Is there a logical flow? |
| **Completeness** | Are sentences complete? Are there dangling thoughts? |
| **Formatting** | Consistent use of lists, code blocks, emphasis? |
| **Readability** | Paragraph length, sentence clarity, jargon usage? |
| **Organization** | Is related content grouped together? |

Mentally categorize the refinement level needed:

- **Light polish** — Good structure, just needs formatting and minor wording fixes
- **Medium refine** — Has content but needs reorganization and better headings
- **Heavy restructure** — Fragments and bullet points that need to become a proper document

### Step 3: Refine the Content

Apply the following improvements while strictly preserving the original meaning:

**Structure improvements:**
- Add a clear title if missing
- Add hierarchical headings (H2, H3) to break content into logical sections
- Reorder content so related ideas are grouped together
- Add a brief introduction paragraph if the document jumps straight into details

**Expression improvements:**
- Complete sentence fragments into full sentences
- Fix grammatical errors and typos
- Replace vague language with precise terms
- Smooth transitions between sections
- Keep the author's voice and tone — don't make casual notes sound like academic papers

**Formatting improvements:**
- Use bullet lists for parallel items
- Use numbered lists for sequential steps
- Use code blocks for code, commands, or technical content
- Use tables for structured comparisons
- Use bold for key terms on first mention
- Use blockquotes for important callouts
- Ensure consistent formatting throughout

**What NOT to change:**
- Do not add new information or opinions not present in the original
- Do not remove content the author wrote (unless it's clearly a duplicate)
- Do not change technical terms or proper nouns
- Do not alter the author's conclusions or viewpoints
- Do not over-formalize casual notes if the user didn't ask for it

### Step 4: Present the Refined Version

Show the user a comparison summary and the refined document:

```markdown
## ✨ 笔记优化完成

### 优化概览

| 项目 | 优化前 | 优化后 |
|------|--------|--------|
| 结构 | [e.g., 无标题，纯文本] | [e.g., 3 个章节，层级清晰] |
| 段落数 | X | Y |
| 字数 | ~X 字 | ~Y 字 |

### 主要改动

1. [改动 1：e.g., 添加了三级标题结构]
2. [改动 2：e.g., 将零散要点整合为完整段落]
3. [改动 3：e.g., 统一了列表格式]

---

[完整的优化后文档内容]
```

### Step 5: Save Changes (Optional)

Ask the user: "要把优化后的内容更新到原文档吗？"

**If the user confirms and the source was a Yuque document:**

```
Tool: yuque_update_doc
Parameters:
  repo_id: "<namespace>"
  doc_id: "<slug>"
  body: "<refined content in markdown>"
```

After saving, confirm: "文档已更新：[文档链接]"

**If the user wants to keep the original and save as a new version:**
Inform the user: "语雀会自动保留历史版本，更新后你仍然可以在版本历史中查看原始内容。"

**If the source was pasted text:**
Just present the refined version in chat. If the user wants to save it, ask which knowledge base and use `yuque_create_doc`.

## Guidelines

- Always answer in the same language as the original notes (Chinese or English)
- The golden rule: **preserve meaning, improve form**
- Show the user what you changed and why — transparency builds trust
- For light polish, don't over-engineer — sometimes notes just need minor fixes
- For heavy restructure, confirm the proposed structure with the user before saving
- If the notes contain TODO items or unfinished thoughts, preserve them as-is (mark with `<!-- TODO -->` if needed)
- Respect the author's writing style — don't turn informal notes into formal reports unless asked

## Error Handling

| Situation | Action |
|-----------|--------|
| Document not found (404) | Inform user the document may have been deleted or the link is incorrect |
| Permission denied (403) | Tell user they may lack permission to access or edit this document |
| Document content is empty | Inform user: "该文档内容为空，没有可优化的内容" |
| `yuque_update_doc` fails | Present the refined content in chat and suggest the user copy-paste it manually |
| Content is already well-structured | Tell the user: "这篇文档结构已经很清晰了，只做了少量微调" — don't force unnecessary changes |
| Content is too short (< 50 chars) | Inform user the content is too brief to meaningfully refine, ask if they want to expand it instead |
