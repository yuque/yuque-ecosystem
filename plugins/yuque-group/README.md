# 语雀团队版 Plugin / Yuque Group Plugin

团队知识库 AI 集成 — 25 MCP Tools + 6 Skills。

## Skills

| Skill | 描述 |
|-------|------|
| `smart-search` | 自然语言搜索团队语雀文档，智能摘要回答 |
| `meeting-notes` | 从会议内容自动生成结构化会议纪要，保存到团队知识库 |
| `weekly-report` | 汇总团队一周文档活动，生成团队周报 |
| `tech-design` | 根据需求生成技术方案文档，保存到团队知识库 |
| `onboarding-guide` | 扫描团队知识库，为新成员生成入职阅读指南 |
| `knowledge-report` | 分析团队知识库健康度，生成知识管理月报 |

## 配置

需要设置 `YUQUE_GROUP_TOKEN` 环境变量：

```bash
export YUQUE_GROUP_TOKEN="your-group-token"
```

获取方式：登录 [语雀](https://www.yuque.com) → 团队设置 → Token → 新建（需要团队管理员权限）
