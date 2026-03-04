# Yuque AI Ecosystem — 语雀 AI 生态

> The unified home for everything in the Yuque AI ecosystem — website, plugins, skills, and shared resources.

[![Website](https://img.shields.io/badge/Website-yuque.github.io-blue)](https://yuque.github.io/yuque-ecosystem/)
[![npm](https://img.shields.io/npm/v/yuque-mcp)](https://www.npmjs.com/package/yuque-mcp)

📖 **[语雀 + AI：从文档工具到你的第二大脑](https://www.yuque.com/yuque/ai/yuque-ai-ecosystem-final)** — 了解语雀 AI 生态的完整愿景

## Architecture

This is a **Stripe-style monorepo**: one core SDK ([yuque-mcp-server](https://github.com/yuque/yuque-mcp-server)) + one ecosystem repository (this repo) containing all client integrations.

| Repository | Purpose | Stripe Analogy |
|---|---|---|
| [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) | Core MCP Server (npm package) | stripe-node (SDK) |
| **yuque-ecosystem** (this repo) | Website + All Client Plugins + Skills | stripe-examples + docs |

## Repository Structure

```
yuque-ecosystem/
├── website/                  # Official website (GitHub Pages)
├── plugins/
│   ├── claude-code/          # Claude Code Plugin (Marketplace)
│   │   ├── personal/         # Personal edition — 25 Tools + 8 Skills
│   │   └── group/            # Team edition — 25 Tools + 6 Skills
│   ├── opencode/             # OpenCode Plugin (MCP + Skills)
│   │   ├── personal/         # Personal edition — 25 Tools + 8 Skills
│   │   └── group/            # Team edition — 25 Tools + 6 Skills
│   └── openclaw/             # OpenClaw Plugin (Agent Skills)
├── shared/
│   └── mcp-config/           # MCP config templates for various editors
├── .claude-plugin/           # Claude Code Marketplace entry
└── package.json              # npm workspaces root
```

## Quick Start

### Claude Code

```bash
# Option 1: Install via Marketplace
claude plugin marketplace add yuque/yuque-ecosystem

# Option 2: Add MCP Server directly
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
