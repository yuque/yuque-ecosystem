---
name: yuque-stale-detector
description: "扫描知识库发现过期文档，生成健康报告，建议更新或归档。Use when: 用户说「检查过期文档」「知识库健康检查」「哪些文档需要更新」。"
metadata:
  {
    "openclaw":
      {
        "emoji": "🔎",
        "requires": { "mcp": ["yuque"] },
        "install":
          [
            {
              "id": "mcporter",
              "kind": "mcporter",
              "server": "yuque",
              "label": "Configure Yuque MCP via mcporter",
            },
          ],
      },
  }
---

# 过期检测 Skill

扫描知识库发现过期文档，生成健康报告，建议更新或归档。

## 触发条件

✅ **USE this skill when:**

- 用户说「检查过期文档」「哪些文档过期了」
- 用户说「知识库健康检查」「文档审计」
- 用户说「哪些文档需要更新」
- 定期维护知识库时

❌ **DON'T use this skill when:**

- 用户想要更新特定文档（使用 yuque-note-refine）
- 用户想要搜索内容（使用 yuque-smart-search）

## 检测规则

| 状态 | 条件 | 建议操作 |
|------|------|----------|
| 🔴 **严重过期** | >365天未更新 + 技术类 | 立即审核或归档 |
| 🟠 **可能过期** | >180天未更新 | 检查是否需要更新 |
| 🟡 **值得关注** | >90天未更新 + 高访问 | 建议定期维护 |
| 🟢 **健康** | <90天更新 | 无需操作 |

## 工作流程

1. **扫描知识库** - 获取所有文档列表和元数据
2. **分析时效性** - 检查更新时间、内容类型
3. **识别问题** - 标记过期链接、过时技术
4. **生成报告** - 输出健康报告和建议
5. **可选操作** - 批量归档或标记待更新

## MCP 调用

```bash
# 获取知识库所有文档
mcporter call yuque.yuque_list_docs repo_id="knowledge-base"

# 获取文档详情（包含更新时间）
mcporter call yuque.yuque_get_doc repo_id="kb" doc_id="doc-slug"

# 搜索特定关键词（检测过时技术）
mcporter call yuque.yuque_search query="deprecated" scope="repo:kb"
```

## 健康报告格式

```markdown
# 📊 知识库健康报告

> 扫描时间: 2026-02-27
> 知识库: 技术文档库
> 文档总数: 156 篇

## 📈 总体评分: 72/100

### 🔴 严重过期 (5 篇)

| 文档 | 最后更新 | 问题 |
|------|----------|------|
| [Webpack 3 配置](link) | 2023-05-12 | 技术已过时 |
| [Node 14 部署](link) | 2023-08-20 | 版本已 EOL |
| ... | | |

**建议**: 立即更新或归档这些文档

### 🟠 可能过期 (12 篇)

| 文档 | 最后更新 | 建议 |
|------|----------|------|
| [API 文档 v2](link) | 2025-06-15 | 检查是否最新版 |
| ... | | |

### 🟡 值得关注 (8 篇)

高访问但较久未更新的文档...

### 🟢 健康文档 (131 篇)

近 90 天内有更新...

## 🔗 失效链接检测

发现 3 个失效外链...

## 📝 建议行动

1. [ ] 更新 Webpack 配置文档到 v5
2. [ ] 归档 Node 14 相关文档
3. [ ] 修复 3 个失效链接
```

## Cron 自动化

配置 OpenClaw 定期检测:

```json
{
  "id": "yuque-health-check",
  "schedule": "0 10 1 * *",
  "prompt": "对语雀知识库进行健康检查，生成报告发送到群聊",
  "channel": "feishu",
  "to": "oc_xxxx"
}
```

