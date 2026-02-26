# Yuque AI Ecosystem — 语雀 AI 生态

> MCP Server · Skills · Plugin — 让 AI 无缝连接语雀，释放知识的力量。

🌐 [官网](https://yuque.github.io/yuque-ecosystem/)

## 🏗 生态概览

语雀 AI 生态由三层组成，从底层连接到上层场景，逐层构建：

```
┌─────────────────────────────────────────────┐
│  🔌 Plugin — AI 助手插件集成                │
├─────────────────────────────────────────────┤
│  🎯 Skills — 场景化 AI 工作流               │
├─────────────────────────────────────────────┤
│  ⚙️ MCP Server — 标准化 Tools               │
└─────────────────────────────────────────────┘
```

### ⚙️ [MCP Server](https://github.com/yuque/yuque-mcp-server)

底层连接层，提供标准化 Tools，覆盖语雀知识库的读写、搜索、管理等全部能力。

- npm：[yuque-mcp](https://www.npmjs.com/package/yuque-mcp)

### 🎯 [Skills](https://github.com/yuque/yuque-plugin)

场景化 AI 工作流，将多个 Tools 编排成开箱即用的解决方案。

- **个人版**：覆盖知识管理全生命周期（📥 输入 → 🧠 加工 → 📤 输出 → 🔄 维护）
- **团队版**：Coming Soon

### 🔌 [Plugin](https://github.com/yuque/yuque-plugin)

AI 助手插件集成，一键配置 MCP Server + Skills，开箱即用。当前支持 Claude Code。

## 📋 个人版 Skills

| 阶段 | Skill | 说明 |
|------|-------|------|
| 📥 输入 | 📖 阅读笔记 | 阅读文章后自动提取核心观点，生成结构化阅读笔记 |
| 📥 输入 | 💡 碎片捕捉 | 随时记录灵感想法，定期自动归类整理成主题笔记 |
| 🧠 加工 | ✨ 笔记打磨 | 把粗糙笔记打磨成高质量文档，优化结构与表达 |
| 🧠 加工 | 🕸️ 知识关联 | 分析文档间隐藏联系，构建交叉引用知识网络 |
| 🧠 加工 | ✍️ 风格提取 | 分析写作风格生成画像，保持一致文风 |
| 📤 输出 | 🔍 智能搜索 | 自然语言搜索知识库，秒找关键内容 |
| 📤 输出 | 📋 智能摘要 | 对文档或知识库生成不同粒度的摘要 |
| 🔄 维护 | 🔎 过期检测 | 扫描发现过期文档，生成健康报告 |

## 🚀 快速开始

- **使用 MCP Server** → 查看 [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) 获取配置指南
- **使用 Plugin** → 查看 [yuque-plugin](https://github.com/yuque/yuque-plugin) 一键安装
- **浏览官网** → [yuque.github.io/yuque-ecosystem](https://yuque.github.io/yuque-ecosystem/)

## 📦 相关仓库

| 仓库 | 说明 |
|------|------|
| [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) | MCP Server，底层连接层 |
| [yuque-plugin](https://github.com/yuque/yuque-plugin) | Plugin + Skills，AI 助手集成与场景化工作流 |
| [yuque-ecosystem](https://github.com/yuque/yuque-ecosystem) | 本仓库，生态官网 |

## License

MIT © [Yuque](https://www.yuque.com)
