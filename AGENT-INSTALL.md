# Yuque AI — Agent Installation Guide

> One file for every client. Designed for AI agents to read and auto-install; human-readable too.
>
> **TL;DR for agents:** the canonical skills live in [`skills/`](./skills/) (standard SKILL.md format — frontmatter + markdown). Any client that supports skills can copy them directly. The MCP server is `npx -y yuque-mcp` with a Yuque token. Client-specific steps below.

---

## Step 0: Prerequisites (all clients)

```bash
# Node.js >= 20 (18 is EOL)
node --version

# npx available
npx --version

# Yuque token set (get one at https://www.yuque.com/settings/tokens)
[ -n "$YUQUE_TOKEN" ] && echo "TOKEN=set" || echo "TOKEN=missing"
```

Verify the token independently of any client:

```bash
curl -s -H "X-Auth-Token: $YUQUE_TOKEN" https://www.yuque.com/api/v2/user
# ✅ JSON with your user profile   ❌ 401 = invalid token, regenerate it
```

> Note for MCP configs: the `yuque-mcp` server process reads the token from `--token=...` or the `YUQUE_PERSONAL_TOKEN` env var (not `YUQUE_TOKEN` — configs below handle the mapping).

---

## Claude Code (recommended path)

The only formally packaged distribution — one command installs MCP server + all skills, with updates.

```bash
# 1. Register the marketplace (this alone installs nothing)
claude plugin marketplace add yuque/yuque-ecosystem

# 2. Install the plugin — required step
claude plugin install yuque-personal@yuque

# 3. Token via env var
export YUQUE_TOKEN="your_token_here"   # add to ~/.zshrc for persistence
```

Verify:

```bash
claude plugin list | grep yuque-personal
# ✅ "yuque-personal" appears   ❌ re-run step 2 and check its error output
```

MCP-only alternative (no skills):

```bash
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=$YUQUE_TOKEN
claude mcp list | grep -i yuque
```

Uninstall: `claude plugin uninstall yuque-personal`, `claude plugin marketplace remove yuque`, or `claude mcp remove yuque-mcp`.

---

## OpenCode

```bash
# 1. MCP server — global config uses {env:YUQUE_TOKEN}, resolved at runtime,
#    so no plaintext token lands in the file
mkdir -p ~/.config/opencode
cat > ~/.config/opencode/opencode.json << 'EOF'
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
EOF
# (merge the mcp.yuque entry instead if the file already exists)

# 2. Skills — copy the canonical directory
REPO_DIR="/path/to/yuque-ecosystem"   # cloned checkout
mkdir -p ~/.config/opencode/skills
cp -r "$REPO_DIR/skills/"* ~/.config/opencode/skills/
```

Project-level variants: `opencode.json` in the project root, skills in `.opencode/skills/`. Never write a literal token into a project-level config — it is too easy to commit.

Verify: `opencode mcp list` shows `yuque`; `opencode mcp debug yuque` shows tools.

---

## OpenClaw

```bash
# 1. Skills — copy the canonical directory into OpenClaw's skills dir
REPO_DIR="/path/to/yuque-ecosystem"
mkdir -p ~/.openclaw/skills
cp -r "$REPO_DIR/skills/"* ~/.openclaw/skills/
```

2. MCP server — add to OpenClaw's `mcpServers` config:

```json
{
  "mcpServers": {
    "yuque-mcp": {
      "command": "npx",
      "args": ["-y", "yuque-mcp"],
      "env": { "YUQUE_PERSONAL_TOKEN": "your-yuque-token" }
    }
  }
}
```

---

## Cursor / VS Code (Copilot) / Windsurf / other MCP editors

Copy the matching template from [`shared/mcp-config/`](./shared/mcp-config/) and replace `YOUR_YUQUE_TOKEN`:

| Client | Template | Destination |
|--------|----------|-------------|
| Cursor | `cursor.json` | `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global) |
| VS Code (requires GitHub Copilot extension) | `vscode.json` | `.vscode/mcp.json` |
| Windsurf | `windsurf.json` | `.windsurf/mcp.json` |

> **Security:** project-level configs contain a plaintext token after replacement — add them to `.gitignore`:
>
> ```bash
> printf '%s\n' '.cursor/mcp.json' '.vscode/mcp.json' '.windsurf/mcp.json' >> .gitignore
> ```

These editors get MCP tools only. If the client supports skills (SKILL.md), also copy [`skills/`](./skills/) into its skills directory.

---

## Any other agent

1. **MCP tools:** run `npx -y yuque-mcp --token=$YUQUE_TOKEN` as a stdio MCP server, or set `YUQUE_PERSONAL_TOKEN` in its env.
2. **Skills:** copy [`skills/`](./skills/) into wherever your client discovers SKILL.md files. Each skill is self-contained (frontmatter `name`/`description` + workflow instructions) and only assumes the `yuque-mcp` tools are available.

---

## Available After Installation

### MCP Tools (from `yuque-mcp`)

| Category | Tools |
|----------|-------|
| User | `yuque_get_user` |
| Search | `yuque_search` |
| Books (知识库) | `yuque_list_books`, `yuque_get_book`, `yuque_create_book`, `yuque_update_book` |
| Docs | `yuque_list_docs`, `yuque_get_doc`, `yuque_create_doc`, `yuque_update_doc` |
| TOC | `yuque_get_toc`, `yuque_update_toc` |
| Notes (小记) | `yuque_list_notes`, `yuque_get_note`, `yuque_create_note`, `yuque_update_note` |
| Boards (画板) | `yuque_get_resource`, `yuque_create_resource`, `yuque_update_resource` |

### Skills (8)

smart-search, smart-summary, daily-capture, reading-digest, note-refine, knowledge-connect, style-extract, stale-detector

Functional test inside any client session:

```
> Use the yuque_get_user tool to get my user info
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `node: command not found` | Node.js not installed | Install Node.js >= 20 via nvm (`nvm install 20`) |
| Token test returns 401 | Invalid or expired token | Regenerate at <https://www.yuque.com/settings/tokens> |
| MCP server fails to start | Token not reaching the process | Pass `--token=...` or set `YUQUE_PERSONAL_TOKEN` in the server env |
| Plugin not found in marketplace | Marketplace not registered | Re-run `claude plugin marketplace add yuque/yuque-ecosystem` |
| Skills not discovered | Wrong skills directory | Check your client's skills path (see its section above) |
| `ECONNREFUSED` / timeout | Network blocking yuque.com | `curl -I https://www.yuque.com` |
