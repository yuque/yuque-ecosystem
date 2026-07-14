[中文](./README.md) | [English](./README.en.md) | [🤖 Agent Install](./AGENT-INSTALL.md)

# Yuque Plugin for OpenCode

> Yuque AI Ecosystem — MCP Tools and Skills for [OpenCode](https://opencode.ai)

Integrate your Yuque knowledge base with OpenCode — the open-source AI coding agent. Get MCP tools for document management and 8 ready-to-use skills for knowledge workflows.

> **The team edition (group) is temporarily withdrawn**: its skills depend on group-statistics MCP tools that are not yet available in `yuque-mcp`. It will return once the underlying tools ship.

---

## MCP Server Setup

### Step 1: Get a Yuque API Token

1. Go to [yuque.com/settings/tokens](https://www.yuque.com/settings/tokens)
2. Create a new token with the permissions you need
3. Copy the token and export it:

```bash
export YUQUE_TOKEN="your_token_here"
```

### Step 2: Configure MCP Server

Add the following to your `opencode.json` (project-level or global `~/.config/opencode/opencode.json`):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "yuque": {
      "type": "local",
      "command": ["npx", "-y", "yuque-mcp", "--token={env:YUQUE_TOKEN}"],
      "enabled": true
    }
  }
}
```

> **Security note:** `{env:YUQUE_TOKEN}` is resolved by OpenCode at runtime, so no plaintext token lands in the config file. Never write a literal token into a project-level `opencode.json` — it is too easy to commit it by accident.

You can also copy the pre-built template:

```bash
cp shared/mcp-config/opencode.json ~/.config/opencode/opencode.json
```

### Step 3: Verify Connection

```bash
# List MCP servers and verify yuque is connected
opencode mcp list

# Debug the connection if needed
opencode mcp debug yuque
```

---

## Skills Installation

OpenCode skills live in `.opencode/skills/` (project-level) or `~/.config/opencode/skills/` (global).

### Option A: Install to a Project

```bash
cp -r plugins/opencode/personal/skills/* /path/to/your/project/.opencode/skills/
```

### Option B: Install Globally

```bash
mkdir -p ~/.config/opencode/skills
cp -r plugins/opencode/personal/skills/* ~/.config/opencode/skills/
```

After installation, OpenCode will automatically discover the skills. The agent can see the list and load them on demand.

> **Maintenance note:** the skills under this directory are copies synced from [`plugins/yuque-personal/skills/`](../yuque-personal/skills/) (the single source). Do not edit them directly — change the source and run `npm run sync-skills`.

---

## Available Skills (8)

| Skill | Description |
|-------|-------------|
| **smart-search** | Search personal knowledge bases with natural language and get summarized answers |
| **smart-summary** | Generate summaries at different granularity levels (one-liner, key points, detailed) |
| **daily-capture** | Capture fleeting ideas and organize them into structured thematic notes |
| **reading-digest** | Extract core insights and action items from articles into structured reading notes |
| **note-refine** | Polish rough notes into high-quality documents with better structure and formatting |
| **knowledge-connect** | Discover hidden connections between documents and suggest cross-references |
| **style-extract** | Analyze writing style from documents and generate a style profile |
| **stale-detector** | Find outdated documents and generate maintenance reports |

---

## Available MCP Tools

The `yuque-mcp` server provides tools across these categories:

| Category | Tools |
|----------|-------|
| User | `yuque_get_user` |
| Search | `yuque_search` |
| Books (知识库) | `yuque_list_books`, `yuque_get_book`, `yuque_create_book`, `yuque_update_book` |
| Docs | `yuque_list_docs`, `yuque_get_doc`, `yuque_create_doc`, `yuque_update_doc` |
| TOC | `yuque_get_toc`, `yuque_update_toc` |
| Notes (小记) | `yuque_list_notes`, `yuque_get_note`, `yuque_create_note`, `yuque_update_note` |
| Boards (画板) | `yuque_get_resource`, `yuque_create_resource`, `yuque_update_resource` |

---

## Compatibility Notes

- OpenCode's SKILL.md format is compatible with this project's skill format (frontmatter + markdown)
- OpenCode also reads `.claude/skills/` as a fallback, so Claude Code skills work in OpenCode too
- The MCP configuration uses OpenCode's native format (`command` array; `{env:VAR}` substitution)

## Links

- [OpenCode](https://opencode.ai) — Open-source AI coding agent
- [OpenCode Docs: MCP Servers](https://opencode.ai/docs/mcp-servers)
- [OpenCode Docs: Skills](https://opencode.ai/docs/skills)
- [Yuque AI Ecosystem Website](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server (npm)](https://www.npmjs.com/package/yuque-mcp)

## License

MIT © [Yuque](https://www.yuque.com)
