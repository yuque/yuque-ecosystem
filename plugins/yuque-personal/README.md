# 语雀个人版 Plugin / Yuque Personal Plugin

个人知识库 AI 集成 — MCP Tools + 8 Skills。

> **本目录是 Claude Code Marketplace 的打包层**：`skills/` 是从仓库根目录 [`skills/`](../../skills/)（唯一源）同步的副本，请勿直接修改——改动请提交到唯一源后运行 `npm run sync-skills`（CI 会校验漂移）。

语雀 = 第二大脑，Skills = AI 认知能力。

## Skills

按知识管理生命周期组织：

### 📥 输入

| Skill | 描述 |
|-------|------|
| `reading-digest` | 阅读文章后自动提取核心观点、金句、行动项，生成结构化阅读笔记 |
| `daily-capture` | 碎片想法收集，定期整理成主题笔记，帮你把灵感变成知识 |

### 🧠 加工

| Skill | 描述 |
|-------|------|
| `note-refine` | 把粗糙笔记打磨成高质量文档，补充结构、优化表达、改善排版 |
| `knowledge-connect` | 分析知识库文档间的关联，发现隐藏联系，建议交叉引用，构建知识网络 |
| `style-extract` | 分析你的写作风格，生成风格画像，帮你保持一致的文风写新内容 |

### 📤 输出

| Skill | 描述 |
|-------|------|
| `smart-search` | 自然语言搜索个人语雀文档，智能摘要回答 |
| `smart-summary` | 对任意文档/知识库生成不同粒度的摘要（一句话、要点、详细） |

### 🔄 维护

| Skill | 描述 |
|-------|------|
| `stale-detector` | 扫描知识库发现过期文档，生成健康报告，建议更新或归档 |

## 配置

需要设置 `YUQUE_TOKEN` 环境变量：

```bash
export YUQUE_TOKEN="your-personal-token"
```

获取方式：登录 [语雀](https://www.yuque.com) → 个人设置 → Token → 新建

> **从旧版本升级？** v1.0.x 读取的是 `YUQUE_PERSONAL_TOKEN`，v1.1.0 起统一为 `YUQUE_TOKEN`（与其余文档一致）。请重命名你的环境变量。
