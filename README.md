[中文](./README.md) | [English](./README.en.md) | [🤖 Agent Install](./AGENT-INSTALL.md)

# Yuque AI Ecosystem — 语雀 AI 生态

> 语雀 AI 集成的官方分发仓库 — 一套 Skills，多客户端开箱即用，外加承载它们的官网。

[![Website](https://img.shields.io/badge/Website-yuque.github.io-blue)](https://yuque.github.io/yuque-ecosystem/)
[![npm](https://img.shields.io/npm/v/yuque-mcp)](https://www.npmjs.com/package/yuque-mcp)

📖 **[语雀 + AI：从文档工具到你的第二大脑](https://www.yuque.com/yuque/ai/yuque-ai-ecosystem-final)** — 了解语雀 AI 生态的完整愿景

## 定位

**Skills 是资产，客户端接入是分发，官网是门面。** 能力与体验分属两个仓库：[yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) 定义 AI *能做什么*（MCP 工具），本仓库定义用户*怎么用上*（Skills 编排、客户端接入、安装文档与官网）。

| 层 | 内容 | 位置 |
|---|---|---|
| 能力层 | MCP Server（npm: `yuque-mcp`） | [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) |
| 资产层 | 知识管理 Skills（唯一源） | [`plugins/yuque-personal/skills/`](./plugins/yuque-personal/skills/) |
| 分发层 | Claude Code / OpenCode / OpenClaw 接入 | [`plugins/`](./plugins/)（由脚本同步） |
| 门面层 | 官网（展示 + 安装引导） | [`website/`](./website/) |

两条判据：新客户端只要能承载同一套 Skills + 一份 MCP 配置，即可作为薄适配层加入；官网只展示当下可安装、可验证的能力。

## Repository Structure

```
yuque-ecosystem/
├── website/                  # Official website (GitHub Pages)
├── plugins/
│   ├── yuque-personal/       # Claude Code 插件（个人版）— skills 唯一源
│   │   ├── .claude-plugin/   #   plugin.json
│   │   ├── .mcp.json         #   MCP server 配置
│   │   └── skills/           #   8 个 Skills（canonical，其余客户端由脚本同步）
│   ├── claude-code/          # Claude Code 安装文档
│   ├── opencode/             # OpenCode 接入（MCP 配置 + skills 副本）
│   └── openclaw/             # OpenClaw 插件（skills 副本）
├── shared/
│   └── mcp-config/           # MCP config templates for various editors
├── scripts/                  # sync-skills.mjs — 同步 canonical skills 到各客户端
├── .claude-plugin/           # Claude Code Marketplace entry
└── package.json              # npm workspaces root
```

> **团队版（yuque-group）已暂时下线**：其 skills 依赖的团队统计类 MCP 工具（`yuque_group_*`）尚未在 `yuque-mcp` 中提供，待底层工具就绪后再重新上架。历史代码见 git 记录。

## Quick Start

### Claude Code

```bash
# Option 1: Install via Marketplace（MCP Tools + Skills）
claude plugin marketplace add yuque/yuque-ecosystem
claude plugin install yuque-personal@yuque
export YUQUE_TOKEN="your_token"   # 插件通过该环境变量读取 Token

# Option 2: Add MCP Server directly（仅 MCP Tools，无 Skills）
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=YOUR_TOKEN
```

### OpenCode

Add to your `opencode.json`:

```jsonc
{
  "mcp": {
    "yuque": {
      "type": "local",
      "command": ["npx", "-y", "yuque-mcp", "--token=YOUR_TOKEN"]
    }
  }
}
```

See [`plugins/opencode/`](./plugins/opencode/) for skills installation and full setup guide.

### Other Editors

See [`shared/mcp-config/`](./shared/mcp-config/) for configuration templates for Cursor, Windsurf, GitHub Copilot (VS Code), and more.

## Modules

| Module | Description | Link |
|---|---|---|
| 🌐 Website | Official ecosystem website | [`website/`](./website/) |
| 🔌 Claude Code Plugin | Claude Code Marketplace plugin | [`plugins/claude-code/`](./plugins/claude-code/) |
| 🟢 OpenCode Plugin | OpenCode MCP + Skills integration | [`plugins/opencode/`](./plugins/opencode/) |
| 🤖 OpenClaw Plugin | OpenClaw Agent integration | [`plugins/openclaw/`](./plugins/openclaw/) |
| 📋 MCP Config | Editor configuration templates | [`shared/mcp-config/`](./shared/mcp-config/) |

## Development

```bash
# Website development
cd website
npm install
npm run dev

# OpenClaw Plugin development
cd plugins/openclaw
npm install
npm run build
```

## Links

- [npm: yuque-mcp](https://www.npmjs.com/package/yuque-mcp)
- [Website](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server)

## License

MIT © [Yuque](https://www.yuque.com)
