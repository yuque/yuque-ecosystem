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
| 分发层 | Claude Code Marketplace 打包 + 全客户端安装指南 | [`plugins/yuque-personal/`](./plugins/yuque-personal/) · [`AGENT-INSTALL.md`](./AGENT-INSTALL.md) |
| 门面层 | 官网（展示 + 安装引导） | [`website/`](./website/) |

SKILL.md 是跨客户端的通用格式——OpenCode、OpenClaw 等客户端直接把 [`skills/`](./skills/) 拷进各自的 skills 目录即可，无需专门的适配层。Claude Code 是唯一保留正式打包的渠道（marketplace 一键安装 + 更新机制）。

## Repository Structure

```
yuque-ecosystem/
├── skills/                   # ★ 资产：8 个知识管理 Skills（唯一源）
├── AGENT-INSTALL.md          # 全客户端安装指南（agent 可直接执行）
├── plugins/
│   └── yuque-personal/       # Claude Code Marketplace 打包
│       ├── .claude-plugin/   #   plugin.json
│       ├── .mcp.json         #   MCP server 配置
│       └── skills/           #   同步副本（勿直接修改，CI 校验漂移）
├── shared/
│   └── mcp-config/           # Cursor / VS Code / Windsurf 等 MCP 配置模板
├── scripts/                  # sync-skills.mjs — skills/ → 插件目录
├── website/                  # 官网（GitHub Pages）
└── .claude-plugin/           # Claude Code Marketplace 入口
```

> **团队版（yuque-group）已暂时下线**：其 skills 依赖的团队统计类 MCP 工具（`yuque_group_*`）尚未在 `yuque-mcp` 中提供，待底层工具就绪后再重新上架。历史代码见 git 记录。

## Quick Start

### Claude Code（推荐，正式打包渠道）

```bash
claude plugin marketplace add yuque/yuque-ecosystem
claude plugin install yuque-personal@yuque
export YUQUE_TOKEN="your_token"   # 插件通过该环境变量读取 Token
```

仅要 MCP 工具、不要 Skills：

```bash
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=YOUR_TOKEN
```

### 其他客户端（OpenCode / OpenClaw / Cursor / VS Code / Windsurf …）

两步通用：① 用 [`shared/mcp-config/`](./shared/mcp-config/) 的模板配好 `yuque-mcp`；② 客户端若支持 skills，把 [`skills/`](./skills/) 拷进它的 skills 目录。

各客户端的具体命令见 [`AGENT-INSTALL.md`](./AGENT-INSTALL.md) —— 把这个文件直接丢给你的 AI agent，它就会装。

## Development

```bash
# 官网开发
cd website && npm install && npm run dev

# 修改 skills 后同步插件副本（CI 会校验漂移）
npm run sync-skills
```

## Links

- [npm: yuque-mcp](https://www.npmjs.com/package/yuque-mcp)
- [Website](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server)

## License

MIT © [Yuque](https://www.yuque.com)
