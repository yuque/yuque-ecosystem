[中文](./README.md) | [English](./README.en.md) | [🤖 Agent Install](./AGENT-INSTALL.md)

# Yuque AI Ecosystem

> The official distribution repository for Yuque AI integrations — one set of skills, ready to use across multiple AI clients, plus the website that presents them.

[![Website](https://img.shields.io/badge/Website-yuque.github.io-blue)](https://yuque.github.io/yuque-ecosystem/)
[![npm](https://img.shields.io/npm/v/yuque-mcp)](https://www.npmjs.com/package/yuque-mcp)

📖 **[Yuque + AI: From Documentation Tool to Your Second Brain](https://www.yuque.com/yuque/ai/yuque-ai-ecosystem-final)** — Explore the full vision of the Yuque AI Ecosystem

## Positioning

**Skills are the asset, client integrations are distribution, the website is the storefront.** Capability and experience live in separate repositories: [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) defines what the AI *can do* (MCP tools); this repository defines how users *get it* (skill workflows, client integrations, install docs, and the website).

| Layer | Content | Location |
|---|---|---|
| Capability | MCP Server (npm: `yuque-mcp`) | [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) |
| Asset | Knowledge-management skills (single source) | [`plugins/yuque-personal/skills/`](./plugins/yuque-personal/skills/) |
| Distribution | Claude Code / OpenCode / OpenClaw integrations | [`plugins/`](./plugins/) (synced by script) |
| Storefront | Website (showcase + install guides) | [`website/`](./website/) |

Two ground rules: a new client joins as a thin adapter as long as it can carry the same skills plus one MCP config; the website only shows what is installable and verified today.

## Repository Structure

```
yuque-ecosystem/
├── website/                  # Official website (GitHub Pages)
├── plugins/
│   ├── yuque-personal/       # Claude Code plugin (personal edition) — canonical skills source
│   │   ├── .claude-plugin/   #   plugin.json
│   │   ├── .mcp.json         #   MCP server config
│   │   └── skills/           #   8 skills (canonical — other clients are synced by script)
│   ├── claude-code/          # Claude Code install docs
│   ├── opencode/             # OpenCode integration (MCP config + skills copies)
│   └── openclaw/             # OpenClaw plugin (skills copies)
├── shared/
│   └── mcp-config/           # MCP config templates for various editors
├── scripts/                  # sync-skills.mjs — sync canonical skills to client copies
├── .claude-plugin/           # Claude Code Marketplace entry
└── package.json              # npm workspaces root
```

> **The team edition (yuque-group) is temporarily withdrawn**: its skills depend on group-statistics MCP tools (`yuque_group_*`) that are not yet available in `yuque-mcp`. It will return once the underlying tools ship. See git history for the previous code.

## Quick Start

### Claude Code

```bash
# Option 1: Install via Marketplace (MCP tools + skills)
claude plugin marketplace add yuque/yuque-ecosystem
claude plugin install yuque-personal@yuque
export YUQUE_TOKEN="your_token"   # the plugin reads the token from this env var

# Option 2: Add MCP Server directly (MCP tools only, no skills)
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

See [`plugins/opencode/`](./plugins/opencode/) for skills installation and the full setup guide.

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
