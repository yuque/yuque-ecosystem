---
name: weekly-report
description: Generate group weekly reports from Yuque activity data including document stats and member contributions. For group use — aggregates team-wide documentation activity. Requires group Token with statistic:read permission.
license: Apache-2.0
compatibility: Requires yuque-mcp server. Yuque API Token must be a group Token with `statistic:read` permission for group stats.
metadata:
  author: chen201724
  version: "2.0"
---

# Weekly Report — Team Documentation Activity Report

Collect group activity data from Yuque (document stats, member contributions) and generate a structured weekly report, then save it to Yuque.

## When to Use

- User asks for a group weekly report based on Yuque activity
- User says "生成团队周报", "group weekly report", "本周团队文档活动总结"
- End of week group documentation activity review

## Required MCP Tools

All tools are from the `yuque-mcp` server:

- `yuque_group_doc_stats` — Get document activity stats for a group
- `yuque_group_member_stats` — Get member contribution stats for a group
- `yuque_list_repos` — List repos in the group (for context)
- `yuque_create_doc` — Create the weekly report document

## Workflow

### Step 1: Identify the Team/Group

Ask the user or determine from context:
- **Group login** (e.g., `my-team`) — required for API calls
- **Report period** — default to the current week (Monday to Sunday)

If the user doesn't specify a group, ask: "请告诉我团队的语雀团队标识（group login），我来生成团队周报。"

### Step 2: Collect Data

Make these API calls in sequence:

#### 2a. Document Activity Stats

```
Tool: yuque_group_doc_stats
Parameters:
  login: "<group_login>"
```

This returns: new docs created, docs updated, total views, etc.

#### 2b. Member Contribution Stats

```
Tool: yuque_group_member_stats
Parameters:
  login: "<group_login>"
```

This returns: per-member doc count, word count, activity metrics.

#### 2c. Repository List (for context)

```
Tool: yuque_list_repos
Parameters:
  login: "<group_login>"
  type: "group"
```

This provides repo names for richer context in the report.

### Step 3: Analyze the Data

Calculate and identify:
- **Total new documents** this week
- **Total updates** this week
- **Most active members** (top 3-5 by contribution)
- **Most active repos** (if data available)
- **Week-over-week trends** (if previous data available)
- **Notable highlights** (any unusually high activity, new repos, etc.)

### Step 4: Generate the Report

Use this template:

```markdown
# 📊 团队知识周报

> **团队**：[团队名称]
> **周期**：YYYY-MM-DD（周一）至 YYYY-MM-DD（周日）
> **生成时间**：YYYY-MM-DD HH:MM

---

## 📈 本周概览

| 指标 | 本周 | 上周 | 变化 |
|------|------|------|------|
| 新建文档 | XX 篇 | - | - |
| 更新文档 | XX 篇 | - | - |
| 总浏览量 | XX 次 | - | - |
| 活跃成员 | XX 人 | - | - |

---

## 📝 文档动态

### 新建文档

| # | 文档标题 | 作者 | 知识库 | 创建时间 |
|---|---------|------|--------|----------|
| 1 | [标题] | [作者] | [库名] | MM-DD |
| 2 | [标题] | [作者] | [库名] | MM-DD |

### 热门更新

| # | 文档标题 | 更新者 | 更新次数 |
|---|---------|--------|----------|
| 1 | [标题] | [作者] | X 次 |

---

## 👥 成员贡献

| 排名 | 成员 | 新建文档 | 更新文档 | 字数贡献 |
|------|------|----------|----------|----------|
| 🥇 | [姓名] | X 篇 | X 篇 | ~X 字 |
| 🥈 | [姓名] | X 篇 | X 篇 | ~X 字 |
| 🥉 | [姓名] | X 篇 | X 篇 | ~X 字 |

---

## 📊 趋势分析

- [对本周数据的简要分析，2-3 句话]
- [与上周对比的变化趋势]
- [值得关注的亮点或问题]

---

## 💡 建议

1. **[建议 1]**：[具体建议内容]
2. **[建议 2]**：[具体建议内容]

---

> 📌 本报告基于语雀团队活动数据自动生成，数据截至 YYYY-MM-DD。
```

### Step 5: Save to Yuque

Ask the user which repo to save to, or suggest a "周报" / "团队管理" repo if one exists.

```
Tool: yuque_create_doc
Parameters:
  repo_id: "<namespace>"    # e.g., "mygroup/mybook"
  title: "团队知识周报 YYYY-MM-DD ~ YYYY-MM-DD"
  body: "<formatted report>"
  format: "markdown"
```

### Step 6: Confirm

```markdown
✅ 团队周报已生成并保存！

📄 **[团队知识周报 日期范围](文档链接)**
📚 已归档到：「知识库名称」

### 本周亮点
- 共新建 X 篇文档，更新 X 篇
- 最活跃成员：[姓名]（X 篇文档）
- [其他亮点]
```

## Guidelines

- If week-over-week comparison data is not available, omit the "上周" and "变化" columns — don't fabricate numbers
- Keep suggestions constructive and specific (e.g., "建议 XX 知识库补充 API 文档" rather than generic "多写文档")
- If a group has many members, show top 5 in the main table and mention total count
- Use emoji in headers for visual scanning but keep the tone professional
- Default report language is Chinese
- For personal weekly reports, use the `weekly-report` skill in the `yuque-personal` plugin

## Error Handling

| Situation | Action |
|-----------|--------|
| `yuque_group_doc_stats` fails | Inform user, check if group login is correct and group Token is configured |
| `yuque_group_member_stats` fails | Generate report without member breakdown, note the gap |
| Group has no activity this week | Create a brief report noting zero activity, suggest reasons |
| User doesn't know group login | Use `yuque_list_repos` with their personal login to find groups |
| API returns partial data | Generate report with available data, note what's missing |
| Team Token missing statistic:read | Inform user the Token needs `statistic:read` permission |
