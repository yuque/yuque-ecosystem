---
name: onboarding-guide
description: Automatically compile a team's core Yuque documents into a structured onboarding reading guide for new group members. For group use — scans group knowledge bases and generates a prioritized reading plan. Requires group Token.
license: Apache-2.0
compatibility: Requires yuque-mcp server connected to a Yuque account with group Token (group-level access)
metadata:
  author: chen201724
  version: "2.0"
---

# Onboarding Guide — New Member Reading Guide Generator

Scan a team's Yuque knowledge bases, identify core documents, and generate a structured onboarding reading guide organized by week and priority.

## When to Use

- A new group member is joining and needs a reading list
- User says "帮新人整理入职文档", "create onboarding guide", "新人入职知识包"
- Team lead wants to create a standard onboarding reading plan

## Required MCP Tools

All tools are from the `yuque-mcp` server:

- `yuque_list_repos` — List all knowledge bases in the team
- `yuque_get_toc` — Get the table of contents for each knowledge base
- `yuque_get_doc` — (Optional) Read specific docs for summary
- `yuque_group_members` — Get group member list (for mentor assignment)
- `yuque_create_doc` — Create the onboarding guide document

## Workflow

### Step 1: Identify the Team and Context

Gather from the user:

| Field | Required | Description |
|-------|----------|-------------|
| 团队标识 (Group login) | Yes | The team's Yuque group login |
| 新人角色 (Role) | No | e.g., 前端开发、后端开发、产品经理、设计师 |
| 入职日期 (Start date) | No | For timeline planning |
| 特殊关注 (Focus areas) | No | Any specific topics to prioritize |

If the user doesn't specify a group login, ask: "请告诉我团队的语雀团队标识（group login），我来生成入职阅读指南。"

If the user doesn't specify a role, generate a general-purpose guide.

### Step 2: Scan Knowledge Bases

#### 2a. List All Repos

```
Tool: yuque_list_repos
Parameters:
  login: "<group_login>"
  type: "group"
```

#### 2b. Get TOC for Each Repo

For each knowledge base returned, get its table of contents:

```
Tool: yuque_get_toc
Parameters:
  namespace: "<repo_namespace>"
```

Collect all document titles, slugs, and hierarchy information.

#### 2c. Get Team Members

```
Tool: yuque_group_members
Parameters:
  login: "<group_login>"
```

Use this to suggest a mentor or point of contact for the new member.

### Step 3: Categorize and Prioritize Documents

Classify documents into priority tiers based on title and location:

**Tier 1 — 第一周必读 (Week 1: Must Read)**
Keywords to look for in titles/paths:
- 入职、新人、指南、规范、流程
- README, Getting Started, Overview
- 团队介绍、组织架构、文化
- 开发环境、环境搭建、Quick Start
- 代码规范、提交规范、Review 流程

**Tier 2 — 第二周推荐 (Week 2: Recommended)**
Keywords:
- 架构、设计、技术方案
- 产品文档、需求文档
- 部署、发布、运维
- API 文档、接口文档

**Tier 3 — 第三周扩展 (Week 3: Extended)**
Keywords:
- 历史决策、技术选型
- 复盘、总结、经验
- 进阶、深入、原理

If the user specified a role, boost documents relevant to that role.

### Step 4: (Optional) Read Key Documents for Summaries

For Tier 1 documents (up to 5), optionally read them to provide brief summaries:

```
Tool: yuque_get_doc
Parameters:
  namespace: "<book_slug>"
  slug: "<doc_slug>"
```

Generate a 1-2 sentence summary for each.

### Step 5: Generate the Onboarding Guide

Use this template:

```markdown
# 🎯 新人入职阅读指南

> **团队**：[团队名称]
> **适用角色**：[角色，如"通用" / "前端开发"]
> **生成日期**：YYYY-MM-DD
> **预计阅读周期**：3 周

---

## 📖 使用说明

欢迎加入团队！这份阅读指南是根据团队知识库自动整理的，帮助你快速了解团队的技术栈、工作流程和核心知识。

建议按周计划阅读，遇到问题随时问团队成员。

---

## 📅 第一周：快速上手

> 目标：了解团队基本情况，搭建开发环境，熟悉工作流程

### 必读文档

| # | 文档 | 知识库 | 简介 | 预计时间 |
|---|------|--------|------|----------|
| 1 | [文档标题](链接) | [库名] | [一句话简介] | ~X 分钟 |
| 2 | [文档标题](链接) | [库名] | [一句话简介] | ~X 分钟 |

### ✅ 第一周 Checklist

- [ ] 阅读团队介绍文档
- [ ] 完成开发环境搭建
- [ ] 了解代码提交规范
- [ ] 熟悉项目目录结构

---

## 📅 第二周：深入了解

> 目标：理解系统架构，熟悉核心业务逻辑

### 推荐文档

| # | 文档 | 知识库 | 简介 | 预计时间 |
|---|------|--------|------|----------|
| 1 | [文档标题](链接) | [库名] | [一句话简介] | ~X 分钟 |

### ✅ 第二周 Checklist

- [ ] 理解系统整体架构
- [ ] 熟悉核心业务流程
- [ ] 完成第一个小任务

---

## 📅 第三周：扩展阅读

> 目标：了解技术决策背景，建立全局视野

### 扩展文档

| # | 文档 | 知识库 | 简介 |
|---|------|--------|------|
| 1 | [文档标题](链接) | [库名] | [一句话简介] |

---

## 🗺️ 知识库导航

| 知识库 | 描述 | 文档数 | 推荐度 |
|--------|------|--------|--------|
| [库名](链接) | [描述] | X 篇 | ⭐⭐⭐ |
| [库名](链接) | [描述] | X 篇 | ⭐⭐ |

---

## 💡 Tips

- 🔍 善用语雀搜索功能，遇到问题先搜一搜
- 📝 阅读过程中发现文档过时，欢迎直接更新
- 💬 有疑问随时在文档下方评论，或找 [mentor 姓名] 交流
- 📚 这份指南是自动生成的，如有遗漏请反馈

---

> 📌 本指南基于团队语雀知识库自动生成，生成时间：YYYY-MM-DD
```

### Step 6: Save to Yuque

```
Tool: yuque_create_doc
Parameters:
  repo_id: "<namespace>"    # e.g., "mygroup/mybook"
  title: "新人入职阅读指南 - [角色] - YYYY-MM-DD"
  body: "<formatted guide>"
  format: "markdown"
```

### Step 7: Confirm

```markdown
✅ 入职阅读指南已生成！

📄 **[新人入职阅读指南](文档链接)**
📚 已保存到：「知识库名称」

### 概览
- 扫描了 X 个知识库，共 X 篇文档
- 筛选出 X 篇核心文档
- 按 3 周计划组织阅读路径
```

## Guidelines

- Prioritize breadth over depth — the guide should cover all important repos, not just one
- Estimate reading time: ~5 min for short docs, ~15 min for long ones, ~30 min for complex technical docs
- If a repo has no clear "getting started" doc, note it as a gap
- Tailor the checklist items to the specified role
- Keep the guide actionable — every item should have a clear link
- Use group member info from `yuque_group_members` to suggest a mentor

## Error Handling

| Situation | Action |
|-----------|--------|
| `yuque_list_repos` returns empty | Ask user to verify group login and group Token |
| `yuque_get_toc` fails for a repo | Skip that repo, note it in the guide |
| `yuque_group_members` fails | Skip mentor suggestion, still generate the guide |
| Team has very few docs (<10) | Create a simpler guide, suggest the group build more docs |
| Team has many docs (>100) | Be more selective, focus on top 20-30 most important |
| No docs match the specified role | Fall back to general guide, note role-specific docs are missing |
| Group login not provided | Ask user for the team's group login |
| Team Token not configured | Inform user that group features require a team-level Token |
