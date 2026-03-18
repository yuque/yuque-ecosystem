---
name: style-extract
description: Analyze a user's writing style from their Yuque documents — vocabulary habits, sentence patterns, tone characteristics — and generate a style profile that can be used to maintain consistent voice when writing new content. For personal/individual use.
license: Apache-2.0
compatibility: Requires yuque-mcp server connected to a Yuque account with personal Token
metadata:
  author: chen201724
  version: "1.0"
---

# Style Extract — Your Writing Style Profile

Analyze your existing Yuque documents to extract your unique writing style — vocabulary habits, sentence structures, tone characteristics. Generate a reusable style profile that helps you (or AI) maintain a consistent voice when writing new content.

## When to Use

- User wants to understand their own writing style
- User says "分析一下我的写作风格", "我的文风是什么样的", "extract my writing style"
- User wants AI to write in their voice: "用我的风格写一篇...", "write like me"
- User wants to ensure consistency across documents
- User says "帮我生成一个风格画像", "create my style profile"

## Required MCP Tools

All tools are from the `yuque-mcp` server:

- `yuque_list_repos` — List user's knowledge bases
- `yuque_get_repo_docs` — List documents in a knowledge base
- `yuque_get_doc` — Read document content for style analysis
- `yuque_search` — Find specific types of documents for analysis
- `yuque_create_doc` — Save the style profile as a document

## Workflow

### Step 1: Gather Writing Samples

Ask the user for source material:

**Case A — Specific documents:**
User provides links to documents they consider representative of their style.

**Case B — Entire knowledge base:**
User specifies a knowledge base. Sample documents from it.

**Case C — Auto-detect best samples:**
If the user isn't sure, search for their most substantial documents:

```
Tool: yuque_list_repos
```

```
Tool: yuque_get_repo_docs
Parameters:
  repo_id: "<namespace>"
```

Select 5-10 documents that are:
- Written by the user (not copied/quoted content)
- Substantial in length (> 500 characters)
- Diverse in topic (to capture general style, not topic-specific patterns)

For each selected document:

```
Tool: yuque_get_doc
Parameters:
  repo_id: "<namespace>"
  doc_id: "<slug>"
```

### Step 2: Analyze Writing Dimensions

Analyze the collected writing samples across these dimensions:

#### Vocabulary (用词习惯)
- **Formality level** — Casual, semi-formal, or formal?
- **Jargon density** — Heavy use of domain terms or plain language?
- **Favorite words** — Recurring words or phrases the user gravitates toward
- **Filler patterns** — Common transitions, connectors, hedging words
- **Language mixing** — Do they mix Chinese/English? In what pattern?

#### Sentence Structure (句式结构)
- **Average sentence length** — Short and punchy or long and flowing?
- **Complexity** — Simple sentences or nested clauses?
- **Paragraph length** — Brief paragraphs or dense blocks?
- **List usage** — Frequent bullet points or prose-heavy?
- **Question usage** — Do they use rhetorical questions?

#### Tone & Voice (语气特点)
- **Perspective** — First person, second person, or impersonal?
- **Confidence level** — Assertive ("X is Y") or hedged ("X might be Y")?
- **Humor** — Dry wit, playful, or strictly serious?
- **Engagement style** — Conversational or lecture-like?
- **Emotional range** — Neutral/analytical or expressive/passionate?

#### Structural Habits (结构习惯)
- **Opening style** — How do they start articles? (Question, statement, story, context)
- **Closing style** — How do they end? (Summary, call-to-action, open question)
- **Heading style** — Descriptive, concise, or creative headings?
- **Use of examples** — Frequent concrete examples or abstract reasoning?
- **Formatting preferences** — Heavy use of bold, quotes, code blocks, tables?

### Step 3: Generate Style Profile

Create a structured style profile:

```markdown
# ✍️ 写作风格画像

> 基于 [N] 篇文档分析生成
> 分析日期：YYYY-MM-DD

## 一句话风格概括

[用一句话描述用户的整体写作风格，如 "简洁直接的技术写作者，偏好短句和大量代码示例，语气自信但不傲慢"]

## 用词习惯

- **正式程度**：[描述 + 示例]
- **术语密度**：[描述 + 示例]
- **高频词汇**：[列出 5-10 个标志性用词]
- **过渡词偏好**：[常用的连接词和过渡表达]
- **中英混用**：[模式描述，如 "技术名词用英文，解释用中文"]

## 句式特征

- **句子长度**：[平均字数/句，与参考值对比]
- **段落长度**：[平均句数/段]
- **复杂度**：[简单句为主 / 复合句为主]
- **标志性句式**：[用户常用的句式模式，附原文示例]

## 语气画像

- **视角**：[第一人称 / 第二人称 / 无人称]
- **自信度**：[断言型 / 探讨型 / 谦逊型]
- **幽默感**：[描述]
- **互动性**：[对话式 / 独白式 / 教学式]

## 结构偏好

- **开头方式**：[描述 + 示例]
- **结尾方式**：[描述 + 示例]
- **标题风格**：[描述]
- **举例频率**：[高 / 中 / 低]
- **格式偏好**：[常用的 Markdown 元素]

## 风格指纹（供 AI 参考）

当需要模仿此风格写作时，遵循以下规则：

1. [具体规则 1，如 "每段不超过 4 句话"]
2. [具体规则 2，如 "技术概念首次出现时用中文解释 + 英文原词"]
3. [具体规则 3，如 "多用反问句引导思考"]
4. [具体规则 4，如 "避免使用'众所周知'等套话"]
5. [具体规则 5，如 "结尾倾向于提出开放性问题而非总结"]

## 示例对比

### 原文片段
> [从用户文档中摘取的典型段落]

### 风格要素标注
[标注该段落中体现的风格特征]
```

### Step 4: Present and Refine

Show the style profile to the user and ask:

"这个风格画像准确吗？有没有哪些地方需要调整？"

Iterate based on user feedback. They might say:
- "我觉得我没那么正式" → Adjust formality assessment
- "这个高频词不是我的风格，是那篇文章特有的" → Remove outliers
- "我希望新内容比我现在的风格更简洁" → Note as a style aspiration

### Step 5: Save Style Profile (Optional)

Ask the user: "要把风格画像保存到语雀吗？以后写作时可以参考。"

If confirmed:

```
Tool: yuque_create_doc
Parameters:
  repo_id: "<target namespace>"
  title: "✍️ 我的写作风格画像"
  body: "<style profile in markdown>"
```

Confirm: "风格画像已保存到「[知识库名称]」：[文档链接]"

### Using the Style Profile

When the user later asks to write content in their style:

1. Retrieve the saved style profile
2. Apply the "风格指纹" rules when generating content
3. After drafting, self-check against the profile dimensions
4. Present the draft with notes on which style elements were applied

## Guidelines

- Always answer in the same language the user used (Chinese or English)
- Analyze at least 5 documents for a reliable profile — fewer may produce skewed results
- Distinguish between the user's natural style and topic-specific writing (a tech doc vs. a personal reflection will differ)
- High-frequency words should be genuinely characteristic, not just common words everyone uses
- The style profile should be descriptive, not prescriptive — describe what the user does, don't judge it
- When the user asks to "write like me", use the profile as a guide but don't produce robotic imitations
- Update the profile periodically — writing style evolves over time

## Error Handling

| Situation | Action |
|-----------|--------|
| Document not found (404) | Skip and note it; continue with other documents |
| Permission denied (403) | Tell user they may lack permission to access this document |
| Too few documents (< 3) | Inform user: "文档数量较少，风格分析可能不够准确。建议提供至少 5 篇文档" |
| Documents are mostly copied/quoted content | Inform user: "这些文档大部分是引用内容，需要你原创的文档来分析风格" |
| `yuque_create_doc` fails | Present the style profile in chat for manual saving |
| Mixed authorship | Ask user to confirm which documents are their own writing |
