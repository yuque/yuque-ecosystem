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
| Distribution | AGENT-INSTALL.md all-client install guide (copy skills/ to install) | [`AGENT-INSTALL.md`](./AGENT-INSTALL.md) |
| Storefront | Website (showcase + install guides) | [`website/`](./website/) |

SKILL.md is a cross-client format — OpenCode, OpenClaw, and any other skills-capable client can copy [`skills/`](./skills/) into their own skills directory directly; no dedicated adapter layer needed. Every client uses the same two steps: configure MCP and copy `skills/`.

## Repository Structure

```
yuque-ecosystem/
├── skills/                   # ★ The asset: 8 knowledge-management skills (single source)
├── AGENT-INSTALL.md          # All-client install guide (directly executable by agents)
├── website/                  # Official website (GitHub Pages)
├── scripts/                  # Validation scripts
└── .github/                  # CI, preview, and deployment workflows
```

> **The team edition (yuque-group) is temporarily withdrawn**: its skills depend on group-statistics MCP tools (`yuque_group_*`) that are not yet available in `yuque-mcp`. It will return once the underlying tools ship. See git history for the previous code.

## Quick Start

### Claude Code

```bash
# 1. Configure MCP
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=$YUQUE_TOKEN

# 2. Copy skills
REPO_DIR="/path/to/yuque-ecosystem"
mkdir -p ~/.claude/skills
cp -r "$REPO_DIR/skills/"* ~/.claude/skills/
```

### Any other client (OpenCode / OpenClaw / Cursor / VS Code / Windsurf …)

Two generic steps: ① configure `yuque-mcp`; ② if the client supports skills, copy [`skills/`](./skills/) into its skills directory.

Per-client commands live in [`AGENT-INSTALL.md`](./AGENT-INSTALL.md) — hand that file to your AI agent and it will install everything.

## Development

```bash
# Website development
cd website && npm install && npm run dev
```

## Links

- [npm: yuque-mcp](https://www.npmjs.com/package/yuque-mcp)
- [Website](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server)

## License

MIT © [Yuque](https://www.yuque.com)
