---
name: yuque-smart-summary
description: "对任意语雀文档或知识库生成不同粒度的摘要：一句话、要点、详细。Use when: 用户说「总结」「摘要」「概括」某篇语雀文档或整个知识库。"
metadata:
  {
    "openclaw":
      {
        "emoji": "📋",
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

# 智能摘要 Skill

对任意语雀文档或知识库生成不同粒度的摘要。

## 触发条件

✅ **USE this skill when:**

- 用户说「总结这篇文档」「概括一下」
- 用户说「给我一个摘要」「快速了解」
- 用户要求总结整个知识库的内容
- 用户分享语雀链接要求总结

❌ **DON'T use this skill when:**

- 用户想要搜索内容（使用 yuque-smart-search）
- 用户想要创建新内容

## 摘要粒度

| 粒度 | 长度 | 适用场景 |
|------|------|----------|
| 🔹 **一句话** | 20-50 字 | 快速了解、分享 |
| 🔸 **要点式** | 3-5 条 | 会议汇报、备忘 |
| 🔹 **详细版** | 200-500 字 | 深入了解、存档 |

## 工作流程

### 单文档摘要

1. **获取文档** - 调用 `yuque.yuque_get_doc`
2. **分析内容** - 提取核心观点和关键信息
3. **生成摘要** - 按指定粒度生成摘要
4. **返回结果** - 可选保存为独立文档

### 知识库摘要

1. **获取目录** - 调用 `yuque.yuque_get_toc`
2. **批量获取** - 获取所有文档内容
3. **分层总结** - 先总结每篇，再综合总结
4. **输出报告** - 生成知识库概览

## MCP 调用

```bash
# 获取单篇文档
mcporter call yuque.yuque_get_doc repo_id="notes" doc_id="doc-slug"

# 获取知识库目录
mcporter call yuque.yuque_get_toc repo_id="knowledge-base"

# 获取知识库所有文档
mcporter call yuque.yuque_list_docs repo_id="knowledge-base"
```

## 输出格式

### 一句话摘要

```
📋 这篇文档介绍了 React Hooks 的核心概念和最佳实践，适合已掌握 React 基础的开发者。
```

### 要点式摘要

```markdown
## 📋 文档摘要

**核心要点:**
1. ⚡ useState 和 useEffect 是最常用的两个 Hook
2. 🎯 自定义 Hook 可以复用状态逻辑
3. ⚠️ Hook 必须在组件顶层调用
4. 🔄 useCallback 和 useMemo 用于性能优化
5. 📦 Hook 规则: 只在 React 函数中调用 Hook
```

### 详细摘要

```markdown
## 📋 详细摘要

### 概述
本文档全面介绍了 React Hooks 的概念、使用方法和最佳实践...

### 核心内容
1. **Hook 基础** - useState, useEffect 的用法...
2. **高级 Hook** - useContext, useReducer...
3. **性能优化** - useMemo, useCallback...

### 关键结论
...

### 适用人群
...
```

## 使用示例

```
用户: 帮我总结一下这个知识库 https://www.yuque.com/user/repo

助手:
1. 获取知识库目录结构
2. 分析知识库主题和规模
3. 生成知识库概览摘要
4. 按章节提供详细摘要
```

