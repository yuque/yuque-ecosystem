---
name: yuque-smart-search
description: "自然语言搜索语雀知识库，秒找到并总结关键内容。Use when: 用户想要搜索语雀文档、查找知识库内容、或询问与语雀相关的问题。"
metadata:
  {
    "openclaw":
      {
        "emoji": "🔍",
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

# 智能搜索 Skill

自然语言搜索语雀个人知识库，秒找到并总结关键内容。

## 触发条件

✅ **USE this skill when:**

- 用户说「搜索语雀」「在语雀里找」「查一下知识库」
- 用户询问「我之前写过关于 X 的笔记吗」
- 用户说「帮我找」+ 语雀/知识库相关关键词
- 用户想要快速定位知识库中的特定内容

❌ **DON'T use this skill when:**

- 用户只是想创建新文档（使用 yuque-daily-capture）
- 用户想要编辑已知文档（使用 yuque-note-refine）
- 用户想要网络搜索（使用 web search）

## 工作流程

1. **理解用户意图** - 提取搜索关键词和上下文
2. **执行搜索** - 调用 `yuque.yuque_search` 搜索相关文档
3. **获取详情** - 对匹配的文档调用 `yuque.yuque_get_doc` 获取内容
4. **总结呈现** - 总结关键内容并返回文档链接

## 使用示例

### 基础搜索

```
用户: 帮我在语雀里搜索关于 React Hooks 的笔记

助手: 
1. 调用 mcporter call yuque.yuque_search query="React Hooks"
2. 获取搜索结果中的文档详情
3. 总结内容并提供链接
```

### 智能问答

```
用户: 我之前记录过哪些 AI 工具？

助手:
1. 搜索关键词: "AI 工具" "人工智能" "AI assistant"
2. 汇总搜索结果
3. 返回分类整理的 AI 工具列表
```

## MCP 调用

```bash
# 搜索文档
mcporter call yuque.yuque_search query="关键词" scope="user"

# 获取文档内容
mcporter call yuque.yuque_get_doc repo_id="namespace" doc_id="slug"
```

## 输出格式

搜索结果应包含:

- 📄 **文档标题** + 链接
- 📝 **内容摘要** (前 200 字)
- 📅 **更新时间**
- 📚 **所属知识库**

## 注意事项

- 首次使用需配置 YUQUE_TOKEN 环境变量
- 搜索范围默认为当前用户的所有知识库
- 支持中英文混合搜索

