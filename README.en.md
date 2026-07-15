[中文](./README.md) | [English](./README.en.md) | [🤖 Agent Install](./AGENT-INSTALL.md)

# Yuque AI Ecosystem

> The official distribution repository for Yuque AI integrations — one set of skills, ready to use in any AI client, plus the website that presents them.

[![Website](https://img.shields.io/badge/Website-yuque.github.io-blue)](https://yuque.github.io/yuque-ecosystem/)
[![npm](https://img.shields.io/npm/v/yuque-mcp)](https://www.npmjs.com/package/yuque-mcp)

📖 **[Yuque + AI: From Documentation Tool to Your Second Brain](https://www.yuque.com/yuque/ai/yuque-ai-ecosystem-final)** — Explore the full vision of the Yuque AI Ecosystem

## Positioning

**Skills are the asset, client integrations are distribution, the website is the storefront.** Capability and experience live in separate repositories: [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) defines what the AI *can do* (MCP tools); this repository defines how users *get it* (skill workflows, install docs, and the website).

| Layer | Content | Location |
|---|---|---|
| Capability | MCP Server (npm: `yuque-mcp`) | [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) |
| Asset | Knowledge-management skills (single source, standard SKILL.md format) | [`skills/`](./skills/) |
| Distribution | Claude Code Marketplace packaging + all-client install guide | [`plugins/yuque-personal/`](./plugins/yuque-personal/) · [`AGENT-INSTALL.md`](./AGENT-INSTALL.md) |
| Storefront | Website (showcase + install guides) | [`website/`](./website/) |

SKILL.md is a cross-client format — OpenCode, OpenClaw, and any other skills-capable client can copy [`skills/`](./skills/) into their own skills directory directly; no dedicated adapter layer needed. Claude Code is the one channel with formal packaging (one-command marketplace install with updates).

## Repository Structure

```
yuque-ecosystem/
├── skills/                   # ★ The asset: 8 knowledge-management skills (single source)
├── AGENT-INSTALL.md          # All-client install guide (directly executable by agents)
├── plugins/
│   └── yuque-personal/       # Claude Code Marketplace packaging
│       ├── .claude-plugin/   #   plugin.json
│       ├── .mcp.json         #   MCP server config
│       └── skills/           #   synced copy (do not edit; CI checks drift)
├── shared/
│   └── mcp-config/           # MCP config templates for Cursor / VS Code / Windsurf, etc.
├── scripts/                  # sync-skills.mjs — skills/ → plugin copy
├── website/                  # Official website (GitHub Pages)
└── .claude-plugin/           # Claude Code Marketplace entry
```

> **The team edition (yuque-group) is temporarily withdrawn**: its skills depend on group-statistics MCP tools (`yuque_group_*`) that are not yet available in `yuque-mcp`. It will return once the underlying tools ship. See git history for the previous code.

## Quick Start

### Claude Code (recommended — the formally packaged channel)

```bash
claude plugin marketplace add yuque/yuque-ecosystem
claude plugin install yuque-personal@yuque
export YUQUE_TOKEN="your_token"   # the plugin reads the token from this env var
```

MCP tools only, no skills:

```bash
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=YOUR_TOKEN
```

### Any other client (OpenCode / OpenClaw / Cursor / VS Code / Windsurf …)

Two generic steps: ① configure `yuque-mcp` using a template from [`shared/mcp-config/`](./shared/mcp-config/); ② if the client supports skills, copy [`skills/`](./skills/) into its skills directory.

Per-client commands live in [`AGENT-INSTALL.md`](./AGENT-INSTALL.md) — hand that file to your AI agent and it will install everything.

## Development

```bash
# Website development
cd website && npm install && npm run dev

# After editing skills, sync the plugin copy (CI checks drift)
npm run sync-skills
```

## Links

- [npm: yuque-mcp](https://www.npmjs.com/package/yuque-mcp)
- [Website](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server)

## License

MIT © [Yuque](https://www.yuque.com)
