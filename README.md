<div align="center">

<a href="https://yuque.github.io/yuque-ecosystem/"><img src="https://avatars.githubusercontent.com/u/34602419?s=200&v=4" width="88" alt="Yuque logo"></a>

<h1>Yuque AI Ecosystem</h1>

The official distribution repository for Yuque AI integrations —<br>one set of knowledge-management skills, ready to use in any AI client.

[![Website][website-image]][website-url] [![Deploy][deploy-image]][deploy-url] [![npm][npm-image]][npm-url]

[🌐 Website](https://yuque.github.io/yuque-ecosystem/) · [🚀 Quick Start](#quick-start) · [🤖 Agent Install](./AGENT-INSTALL.md) · [📖 Full Vision](https://www.yuque.com/yuque/ai/yuque-ai-ecosystem-final) · [中文](./README.zh-CN.md)

<a href="https://yuque.github.io/yuque-ecosystem/"><img src=".github/assets/website.png" alt="Yuque AI Ecosystem website"></a>

</div>

## Skills (8)

- 📥 **daily-capture** — Capture fleeting ideas and periodically organize them into structured knowledge
- 🔍 **smart-search** — Search your Yuque knowledge bases with natural language and synthesize answers
- 📝 **smart-summary** — Summarize a doc or book at one-line, key-point, or detailed level
- 📚 **reading-digest** — Extract core insights, golden quotes, and action items into reading notes
- ✨ **note-refine** — Polish rough notes into structured documents while preserving your voice
- 🔗 **knowledge-connect** — Uncover related topics and complementary notes, build cross-links
- 🧹 **stale-detector** — Scan a knowledge base for outdated documents and recommend updates
- 🎨 **style-extract** — Distill your vocabulary, sentence, and tone patterns into a personal style guide

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

## Positioning

**Skills are the asset, client integrations are distribution, the website is the storefront.** Capability and experience live in separate repositories: [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) defines what the AI *can do* (MCP tools); this repository defines how users *get it* (skill workflows, install docs, and the website).

| Layer        | Content                                                       | Location                                                      |
| ------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| Capability   | MCP Server (npm: `yuque-mcp`)                                 | [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) |
| Asset        | Knowledge-management skills (single source, SKILL.md format)  | [`skills/`](./skills/)                                        |
| Distribution | All-client install guide (copy skills/ to install)            | [`AGENT-INSTALL.md`](./AGENT-INSTALL.md)                      |
| Storefront   | Website (showcase + install guides)                           | [`website/`](./website/)                                      |

SKILL.md is a cross-client format — OpenCode, OpenClaw, and any other skills-capable client can copy [`skills/`](./skills/) into their own skills directory directly; no dedicated adapter layer needed. Every client uses the same two steps: configure MCP and copy `skills/`.

<details>
<summary>Repository structure</summary>

```
yuque-ecosystem/
├── skills/                   # ★ The asset: 8 knowledge-management skills (single source)
├── AGENT-INSTALL.md          # All-client install guide (directly executable by agents)
├── website/                  # Official website (GitHub Pages)
├── scripts/                  # Validation scripts (skills frontmatter & MCP tool references)
└── .github/                  # CI, preview, and deployment workflows
```

</details>

## Development

```bash
# Website development
cd website && npm install && npm run dev

# Validate skills
node scripts/validate-skills.mjs
```

## Links

- [npm: yuque-mcp](https://www.npmjs.com/package/yuque-mcp)
- [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) — the capability layer: MCP server source
- [Yuque + AI: From Documentation Tool to Your Second Brain](https://www.yuque.com/yuque/ai/yuque-ai-ecosystem-final)

## License

MIT © [Yuque](https://www.yuque.com)

[website-image]: https://img.shields.io/badge/website-yuque.github.io-00B96B?style=flat-square
[website-url]: https://yuque.github.io/yuque-ecosystem/
[deploy-image]: https://img.shields.io/github/actions/workflow/status/yuque/yuque-ecosystem/deploy-website.yml?style=flat-square&label=deploy
[deploy-url]: https://github.com/yuque/yuque-ecosystem/actions/workflows/deploy-website.yml
[npm-image]: https://img.shields.io/npm/v/yuque-mcp?style=flat-square&label=yuque-mcp
[npm-url]: https://www.npmjs.com/package/yuque-mcp
