---
name: knowledge-report
description: Generate comprehensive monthly knowledge management reports by analyzing team Yuque activity data including group stats, member contributions, knowledge base health, and document trends. For team use — requires team Token with statistic:read permission.
license: Apache-2.0
compatibility: Requires yuque-mcp server. Yuque API Token must be a team Token with `statistic:read` permission for group stats.
metadata:
  author: chen201724
  version: "2.0"
---

# Knowledge Report — Team Knowledge Management Monthly Report

Collect comprehensive team data from Yuque (group stats, member contributions, knowledge base metrics, document activity) and generate a detailed monthly knowledge management report.

## When to Use

- User wants a monthly knowledge management report
- User says "生成知识月报", "knowledge report", "团队知识管理月报"
- Monthly review of team documentation health and activity

## Required MCP Tools

All tools are from the `yuque-mcp` server:

- `yuque_group_stats` — Get overall group statistics
- `yuque_group_member_stats` — Get per-member contribution data
- `yuque_group_book_stats` — Get per-knowledge-base statistics
- `yuque_group_doc_stats` — Get document activity statistics
- `yuque_create_doc` — Create the monthly report document

## Workflow

### Step 1: Identify the Team and Period

Gather from the user:
- **Group login** (required)
- **Report month** (default: previous month)

If the user doesn't specify: "请告诉我团队的语雀团队标识（group login），我来生成知识月报。"

### Step 2: Collect All Data

Make these API calls:

#### 2a. Overall Group Stats

```
Tool: yuque_group_stats
Parameters:
  login: "<group_login>"
```

Returns: total members, total docs, total repos, overall activity metrics.

#### 2b. Member Contribution Stats

```
Tool: yuque_group_member_stats
Parameters:
  login: "<group_login>"
```

Returns: per-member doc count, word count, activity breakdown.

#### 2c. Knowledge Base Stats

```
Tool: yuque_group_book_stats
Parameters:
  login: "<group_login>"
```

Returns: per-repo doc count, update frequency, growth metrics.

#### 2d. Document Activity Stats

```
Tool: yuque_group_doc_stats
Parameters:
  login: "<group_login>"
```

Returns: new docs, updated docs, views, popular documents.

### Step 3: Analyze the Data

Compute the following insights:

**Overall Health**
- Total documents and month-over-month growth
- Active contributor ratio (active members / total members)
- Documentation velocity (docs per week)

**Member Analysis**
- Top contributors (by docs created, words written)
- Contribution distribution (is it concentrated or spread out?)
- Inactive members (0 contributions this month)

**Knowledge Base Analysis**
- Most active repos
- Stale repos (no updates this month)
- Repo growth rates

**Trends**
- Week-by-week activity within the month
- Comparison with previous month (if data available)

### Step 4: Generate the Report

Use this template:

```markdown
# 📊 团队知识管理月报

> **团队**：[团队名称]
> **报告周期**：YYYY 年 MM 月
> **生成时间**：YYYY-MM-DD HH:MM

---

## 📈 月度概览

| 指标 | 本月 | 上月 | 环比变化 |
|------|------|------|----------|
| 总文档数 | XXX 篇 | - | - |
| 新建文档 | XX 篇 | - | - |
| 更新文档 | XX 篇 | - | - |
| 总浏览量 | X,XXX 次 | - | - |
| 活跃成员 | XX / XX 人 | - | - |
| 知识库数 | XX 个 | - | - |

### 健康度评分

| 维度 | 评分 | 说明 |
|------|------|------|
| 📝 文档产出 | ⭐⭐⭐⭐ | [简评] |
| 👥 参与度 | ⭐⭐⭐ | [简评] |
| 📚 覆盖度 | ⭐⭐⭐⭐ | [简评] |
| 🔄 更新频率 | ⭐⭐⭐ | [简评] |

---

## 👥 成员贡献

### Top 贡献者

| 排名 | 成员 | 新建文档 | 更新文档 | 字数贡献 | 活跃天数 |
|------|------|----------|----------|----------|----------|
| 🥇 | [姓名] | X 篇 | X 篇 | ~X 字 | X 天 |
| 🥈 | [姓名] | X 篇 | X 篇 | ~X 字 | X 天 |
| 🥉 | [姓名] | X 篇 | X 篇 | ~X 字 | X 天 |

### 贡献分布

- **高活跃**（≥5 篇文档）：X 人
- **中活跃**（1-4 篇文档）：X 人
- **低活跃**（仅更新）：X 人
- **未活跃**（0 贡献）：X 人

---

## 📚 知识库分析

### 活跃知识库

| 知识库 | 新建 | 更新 | 总文档 | 活跃度 |
|--------|------|------|--------|--------|
| [库名] | X 篇 | X 篇 | XX 篇 | 🟢 高 |
| [库名] | X 篇 | X 篇 | XX 篇 | 🟡 中 |

### 需要关注的知识库

| 知识库 | 总文档 | 上次更新 | 建议 |
|--------|--------|----------|------|
| [库名] | XX 篇 | XX 天前 | [建议] |

---

## 📊 趋势分析

### 周度活动趋势

| 周次 | 新建文档 | 更新文档 | 活跃人数 |
|------|----------|----------|----------|
| 第 1 周 | X | X | X |
| 第 2 周 | X | X | X |
| 第 3 周 | X | X | X |
| 第 4 周 | X | X | X |

### 关键发现

1. [趋势发现 1]
2. [趋势发现 2]
3. [趋势发现 3]

---

## 💡 建议

### 短期建议（本月可执行）

1. **[建议标题]**
   - 现状：[描述]
   - 建议：[具体行动]
   - 预期效果：[效果]

2. **[建议标题]**
   - 现状：[描述]
   - 建议：[具体行动]

### 长期建议（持续改进）

1. **[建议标题]**：[描述]
2. **[建议标题]**：[描述]

---

## 📎 附录

### 数据说明

- 数据来源：语雀团队 API
- 统计周期：YYYY-MM-DD 至 YYYY-MM-DD
- 活跃定义：当月有创建或更新文档的行为

---

> 📌 本报告基于语雀团队活动数据自动生成。如有疑问请联系团队管理员。
```

### Step 5: Save to Yuque

```
Tool: yuque_create_doc
Parameters:
  repo_id: "<namespace>"    # e.g., "mygroup/mybook"
  title: "团队知识管理月报 - YYYY年MM月"
  body: "<formatted report>"
  format: "markdown"
```

### Step 6: Confirm

```markdown
✅ 知识月报已生成！

📄 **[团队知识管理月报 - YYYY年MM月](文档链接)**
📚 已归档到：「知识库名称」

### 本月亮点
- 共产出 X 篇新文档，X 篇更新
- 活跃成员 X 人，占比 X%
- 最活跃知识库：[库名]
- 最大贡献者：[姓名]
```

## Guidelines

- Health scores (⭐) are subjective assessments based on the data — be honest but constructive
- For contribution distribution, highlight if knowledge creation is too concentrated (bus factor risk)
- Suggestions should be specific and actionable, not generic platitudes
- If month-over-month data is unavailable, omit comparison columns — don't fabricate
- Keep the tone professional but encouraging — celebrate achievements, frame gaps as opportunities
- Default language is Chinese

## Error Handling

| Situation | Action |
|-----------|--------|
| `yuque_group_stats` fails | Inform user, check group login and team Token |
| Any stats API returns partial data | Generate report with available data, note gaps |
| Group has very low activity | Still generate report, focus suggestions on how to improve |
| User doesn't know group login | Help them find it via `yuque_list_books` |
| Multiple groups | Ask user which group to report on |
| Team Token missing statistic:read | Inform user the Token needs `statistic:read` permission |
