# Claude Code — Yuque Plugin Installation (Agent Guide)

> For AI agents to auto-install. Human-readable but optimized for machine execution.

---

## Prerequisites Check

Run these commands to verify your environment:

```bash
# Check Claude Code CLI is available
claude --version
# ✅ Expected: version string
# ❌ If "command not found": install via `npm i -g @anthropic-ai/claude-code`

# Check Node.js version (>= 20 required; 18 is EOL)
node --version
# ✅ Expected: v20.x.x or higher
# ❌ If below 20: upgrade via nvm (`nvm install 20 && nvm use 20`)

# Check npx is available
npx --version
# ✅ Expected: version string
# ❌ If missing: comes with npm, reinstall Node.js
```

---

## Installation Method 1: Marketplace Plugin (Recommended)

Installs the `yuque-personal` plugin: MCP server + 8 skills.

### Step 1: Add the Marketplace

```bash
claude plugin marketplace add yuque/yuque-ecosystem
```

> **Important:** This only registers the marketplace. It does NOT install any plugin yet.

### Step 2: Install the Plugin

```bash
claude plugin install yuque-personal@yuque
```

### Step 3: Configure Token

The plugin's MCP server reads your token from the `YUQUE_TOKEN` environment variable:

```bash
export YUQUE_TOKEN="your_token_here"
```

Add it to your shell profile (`~/.zshrc` or `~/.bashrc`) for persistence. Get a token at <https://www.yuque.com/settings/tokens>.

### Step 4: Verify Installation

```bash
claude plugin list | grep yuque-personal
# ✅ Expected: "yuque-personal" appears in the list
# ❌ If not listed: re-run Step 2 and check its error output
```

---

## Installation Method 2: MCP Server Only

Use this if you only need the MCP tools without skills, or if the marketplace is unavailable.

### Install

```bash
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=$YUQUE_TOKEN
```

> **Important:** Make sure `$YUQUE_TOKEN` is set before running this command — the token value is captured at add time.

### Verify MCP Connection

```bash
claude mcp list | grep -i yuque
# ✅ Expected: "yuque-mcp" appears with a connected/configured status
# ❌ If not listed: check token and retry
```

---

## Post-Installation Verification

### Verify the token itself (independent of Claude Code)

```bash
curl -s -H "X-Auth-Token: $YUQUE_TOKEN" https://www.yuque.com/api/v2/user
# ✅ Expected: JSON with your Yuque user profile
# ❌ 401 response: token invalid or expired — regenerate it
```

### Functional test inside a Claude Code session

```
> Use the yuque_get_user tool to get my user info
```

Expected: Returns your Yuque user profile (username, avatar, etc.)

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

### Skills (Marketplace install only)

**yuque-personal (8):** smart-search, smart-summary, daily-capture, reading-digest, note-refine, knowledge-connect, style-extract, stale-detector

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `command not found: claude` | Claude Code CLI not installed | `npm i -g @anthropic-ai/claude-code` |
| MCP server fails to start | Token missing or invalid | Set `YUQUE_TOKEN` and regenerate at <https://www.yuque.com/settings/tokens> |
| `npx: command not found` | Node.js/npm not installed | Install Node.js >= 20 |
| Plugin not found in marketplace | Marketplace not added, or network issue | Re-run `claude plugin marketplace add yuque/yuque-ecosystem`; fallback to Method 2 |
| `ECONNREFUSED` or timeout | Network/firewall blocking `yuque.com` | Check connectivity: `curl -I https://www.yuque.com` |

---

## Uninstall

```bash
# Remove the plugin
claude plugin uninstall yuque-personal

# Remove the marketplace
claude plugin marketplace remove yuque

# Or remove the standalone MCP server (Method 2)
claude mcp remove yuque-mcp
```
