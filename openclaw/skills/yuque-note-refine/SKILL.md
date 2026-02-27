---
name: yuque-note-refine
description: "把粗糙笔记打磨成高质量文档，补充结构、优化表达、改善排版。Use when: 用户说「帮我优化」「润色」「打磨」「重写」某篇语雀文档。"
metadata:
  {
    "openclaw":
      {
        "emoji": "✨",
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

# 笔记打磨 Skill

把粗糙笔记打磨成高质量文档，补充结构、优化表达、改善排版。

## 触发条件

✅ **USE this skill when:**

- 用户说「帮我优化这篇文档」「润色」「打磨」
- 用户分享语雀文档链接要求改进
- 用户说「重新整理」「优化结构」「改善排版」
- 用户要求将草稿升级为正式文档

❌ **DON'T use this skill when:**

- 用户要求从零创建新文档
- 用户只是想查看文档内容

## 工作流程

1. **获取原文** - 调用 `yuque.yuque_get_doc` 读取文档
2. **分析问题** - 识别结构、表达、排版问题
3. **制定方案** - 列出优化建议供用户确认
4. **执行优化** - 重写内容，优化结构
5. **更新文档** - 调用 `yuque.yuque_update_doc` 保存

## 优化维度

### 📐 结构优化

- 添加/调整标题层级
- 重新组织段落顺序
- 补充过渡句和小结
- 添加目录导航

### ✍️ 表达优化

- 简化冗长句子
- 统一术语用法
- 消除歧义表达
- 增强可读性

### 🎨 排版优化

- 添加合适的列表和表格
- 优化代码块格式
- 添加引用和强调
- 调整段落间距

## MCP 调用

```bash
# 获取文档内容
mcporter call yuque.yuque_get_doc repo_id="notes" doc_id="draft-doc"

# 更新优化后的内容
mcporter call yuque.yuque_update_doc \
  repo_id="notes" \
  doc_id="draft-doc" \
  body="优化后的内容" \
  _force_asl=1
```

## 使用示例

```
用户: 帮我优化这篇文档 https://www.yuque.com/user/repo/doc

助手:
1. 获取文档内容
2. 分析发现:
   - 缺少清晰的标题结构
   - 部分段落过长
   - 代码块未标注语言
3. 询问用户确认优化方案
4. 执行优化并更新文档
5. 返回优化前后对比
```

## 版本保护

- 优化前自动检查文档版本历史
- 建议用户确认后再执行更新
- 提供回滚说明以防需要恢复

