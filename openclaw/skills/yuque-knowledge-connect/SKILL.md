---
name: yuque-knowledge-connect
description: "分析知识库文档间的隐藏联系，建议交叉引用链接，构建知识网络。Use when: 用户说「关联」「连接」「知识图谱」「交叉引用」或想要发现文档间的联系。"
metadata:
  {
    "openclaw":
      {
        "emoji": "🕸️",
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

# 知识关联 Skill

分析知识库文档间的隐藏联系，建议交叉引用链接，构建知识网络。

## 触发条件

✅ **USE this skill when:**

- 用户说「帮我关联文档」「建立连接」
- 用户说「知识图谱」「知识网络」
- 用户说「找找相关文档」「交叉引用」
- 用户想要发现知识库中的隐藏联系

❌ **DON'T use this skill when:**

- 用户只想搜索特定内容（使用 yuque-smart-search）
- 用户想要整理单篇文档（使用 yuque-note-refine）

## 工作流程

1. **扫描知识库** - 调用 `yuque.yuque_list_docs` 获取文档列表
2. **提取关键词** - 分析每篇文档的核心概念和关键词
3. **计算关联** - 基于关键词重叠、主题相似度计算关联强度
4. **生成建议** - 输出关联建议和交叉引用链接
5. **更新文档** - 可选：自动添加「相关文档」章节

## 关联类型

| 类型 | 说明 | 示例 |
|------|------|------|
| 🔗 **概念关联** | 共享核心概念 | React → React Hooks |
| 📚 **主题关联** | 属于同一主题 | API设计 → REST最佳实践 |
| 🔄 **引用关联** | 已有相互引用 | 教程 → API文档 |
| 🧩 **补充关联** | 互为补充 | 理论篇 → 实践篇 |

## MCP 调用

```bash
# 获取知识库所有文档
mcporter call yuque.yuque_list_docs repo_id="knowledge-base"

# 获取文档内容用于分析
mcporter call yuque.yuque_get_doc repo_id="kb" doc_id="doc-slug"

# 更新文档添加相关链接
mcporter call yuque.yuque_update_doc \
  repo_id="kb" \
  doc_id="doc-slug" \
  body="原内容 + 相关文档章节"
```

## 输出格式

```markdown
## 📊 知识关联分析报告

### 高关联文档对 (相似度 > 0.8)

1. 「React 入门」↔️「React Hooks 详解」
   - 关联类型: 概念关联
   - 建议: 在入门文档末尾添加 Hooks 链接

2. 「API 设计原则」↔️「REST 最佳实践」
   - 关联类型: 主题关联
   - 建议: 创建「API 设计」目录统一管理

### 孤岛文档 (无明显关联)

- 「会议记录 2024-01」
- 「临时草稿」

### 建议添加的交叉引用

| 源文档 | 目标文档 | 锚文本 |
|--------|----------|--------|
| React 入门 | React Hooks | 进阶学习 Hooks |
```

## 使用示例

```
用户: 帮我分析一下知识库的文档关联

助手:
1. 扫描知识库获取所有文档
2. 分析文档关键词和主题
3. 计算关联矩阵
4. 生成关联报告
5. 询问是否自动添加交叉引用
```

