[中文](./README.md) | [English](./README.en.md) | [🤖 Agent Install](./AGENT-INSTALL.md)

# Yuque AI Ecosystem — 语雀 AI 生态

> 语雀 AI 集成的官方分发仓库 — 一套 Skills，任意客户端开箱即用，外加承载它们的官网。

[![Website](https://img.shields.io/badge/Website-yuque.github.io-blue)](https://yuque.github.io/yuque-ecosystem/)
[![npm](https://img.shields.io/npm/v/yuque-mcp)](https://www.npmjs.com/package/yuque-mcp)

📖 **[语雀 + AI：从文档工具到你的第二大脑](https://www.yuque.com/yuque/ai/yuque-ai-ecosystem-final)** — 了解语雀 AI 生态的完整愿景

## 定位

**Skills 是资产，客户端接入是分发，官网是门面。** 能力与体验分属两个仓库：[yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) 定义 AI *能做什么*（MCP 工具），本仓库定义用户*怎么用上*（Skills 编排、安装文档与官网）。

| 层 | 内容 | 位置 |
|---|---|---|
| 能力层 | MCP Server（npm: `yuque-mcp`） | [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) |
| 资产层 | 知识管理 Skills（唯一源，标准 SKILL.md 格式） | [`skills/`](./skills/) |
| 分发层 | AGENT-INSTALL.md 全客户端安装指南（复制 skills/ 即安装） | [`AGENT-INSTALL.md`](./AGENT-INSTALL.md) |
| 门面层 | 官网（展示 + 安装引导） | [`website/`](./website/) |

SKILL.md 是跨客户端的通用格式——OpenCode、OpenClaw 等客户端直接把 [`skills/`](./skills/) 拷进各自的 skills 目录即可，无需专门的适配层。所有客户端统一走「配 MCP + 复制 skills/」两步。

## Repository Structure

```
yuque-ecosystem/
├── skills/                   # ★ 资产：8 个知识管理 Skills（唯一源）
├── AGENT-INSTALL.md          # 全客户端安装指南（agent 可直接执行）
├── website/                  # 官网（GitHub Pages）
├── scripts/                  # 校验脚本
└── .github/                  # CI、预览与部署工作流
```

> **团队版（yuque-group）已暂时下线**：其 skills 依赖的团队统计类 MCP 工具（`yuque_group_*`）尚未在 `yuque-mcp` 中提供，待底层工具就绪后再重新上架。历史代码见 git 记录。

## Quick Start

### Claude Code

```bash
# 1. 配置 MCP
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=$YUQUE_TOKEN

# 2. 复制 Skills
REPO_DIR="/path/to/yuque-ecosystem"
mkdir -p ~/.claude/skills
cp -r "$REPO_DIR/skills/"* ~/.claude/skills/
```

### 其他客户端（OpenCode / OpenClaw / Cursor / VS Code / Windsurf …）

两步通用：① 配好 `yuque-mcp`；② 客户端若支持 skills，把 [`skills/`](./skills/) 拷进它的 skills 目录。

各客户端的具体命令见 [`AGENT-INSTALL.md`](./AGENT-INSTALL.md) —— 把这个文件直接丢给你的 AI agent，它就会装。

## Development

```bash
# 官网开发
cd website && npm install && npm run dev
```

## Links

- [npm: yuque-mcp](https://www.npmjs.com/package/yuque-mcp)
- [Website](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server)

## License

MIT © [Yuque](https://www.yuque.com)
