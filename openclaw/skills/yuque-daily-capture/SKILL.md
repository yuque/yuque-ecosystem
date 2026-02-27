---
name: yuque-daily-capture
description: "随时记录灵感和想法到语雀，定期自动归类整理，合并成结构化的主题笔记。Use when: 用户说「记一下」「记录」「灵感」「想法」「备忘」等关键词。"
metadata:
  {
    "openclaw":
      {
        "emoji": "💡",
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

# 碎片捕捉 Skill

随时记录灵感和想法，定期自动归类整理，合并成结构化的主题笔记。

## 触发条件

✅ **USE this skill when:**

- 用户说「记一下」「帮我记录」「备忘」
- 用户说「灵感」「想法」「idea」
- 用户快速口述内容要求保存
- 用户说「存到语雀」「记到语雀」

❌ **DON'T use this skill when:**

- 用户要求写完整文章（使用 yuque-note-refine）
- 用户要求搜索已有内容（使用 yuque-smart-search）

## 工作流程

### 快速记录模式

1. **接收内容** - 接收用户口述或输入的碎片内容
2. **智能标记** - 自动添加时间戳和初步分类标签
3. **追加保存** - 追加到当日「快速捕捉」文档

### 整理归档模式

1. **扫描碎片** - 读取近期「快速捕捉」文档
2. **智能归类** - 按主题聚类相关碎片
3. **生成笔记** - 合并成结构化主题笔记
4. **更新索引** - 更新知识库目录

## 快速捕捉格式

```markdown
# 📝 快速捕捉 - 2026-02-27

## 09:15
💡 想法: 可以用 OpenClaw + 语雀做一个自动化写作助手
#idea #openclaw

## 14:30
📌 备忘: 下周三前完成 API 文档
#todo #工作

## 18:45
💭 思考: 为什么 RAG 比微调更适合知识库场景？
#thinking #AI
```

## MCP 调用

```bash
# 搜索今日快速捕捉文档
mcporter call yuque.yuque_search query="快速捕捉 $(date +%Y-%m-%d)"

# 追加内容到文档
mcporter call yuque.yuque_update_doc \
  repo_id="inbox" \
  doc_id="daily-capture" \
  body="追加的内容"

# 创建新的主题笔记
mcporter call yuque.yuque_create_doc \
  repo_id="notes" \
  title="主题笔记标题" \
  body="整理后的内容"
```

## 使用示例

```
用户: 记一下，下周要给团队做 OpenClaw 分享

助手:
1. 添加时间戳: 14:32
2. 分类标签: #todo #分享
3. 追加到今日快速捕捉
4. 返回确认: ✅ 已记录到语雀
```

## 自动整理

可配置 OpenClaw Cron 任务，每周自动整理：

```json
{
  "id": "yuque-weekly-organize",
  "schedule": "0 10 * * 1",
  "prompt": "整理过去一周的语雀快速捕捉，归类到对应主题笔记"
}
```

