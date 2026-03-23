# Claude Code — Yuque Plugin Installation (Agent Guide)

> For AI agents to auto-install. Human-readable but optimized for machine execution.

---

## Prerequisites Check

Run these commands to verify your environment:

```bash
# Check Claude Code CLI is available
claude --version
# ✅ Expected: version string (e.g., "claude-code 1.x.x")
# ❌ If "command not found": install via `npm i -g @anthropic-ai/claude-code`

# Check Node.js version (>= 18 required)
node --version
# ✅ Expected: v18.x.x or higher
# ❌ If below 18: upgrade via nvm (`nvm install 18 && nvm use 18`)

# Check npx is available
npx --version
# ✅ Expected: version string
# ❌ If missing: comes with npm, reinstall Node.js
```

---

## Installation Method 1: Marketplace Plugin (Recommended)

This installs both the MCP server and all skills (personal + group editions).

### Install

```bash
claude plugin marketplace add yuque/yuque-ecosystem
```

### Verify Installation

```bash
claude plugin list | grep -i yuque
# ✅ Expected: "yuque/yuque-ecosystem" appears in the list
# ❌ If not listed: retry installation or use Method 2
```

### Configure Token

After marketplace installation, you still need to set your Yuque API token:

```bash
# Set the token as an environment variable
export YUQUE_TOKEN="your_token_here"
```

> **Note:** The marketplace plugin reads the token from the `YUQUE_TOKEN` environment variable. Add it to your shell profile (`~/.zshrc` or `~/.bashrc`) for persistence.

---

## Installation Method 2: MCP Server Only

Use this if you only need the 16 MCP tools without skills, or if the marketplace is unavailable.

### Install

```bash
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=$YUQUE_TOKEN
```

> **Important:** Make sure `$YUQUE_TOKEN` is set before running this command. If not:
> ```bash
> export YUQUE_TOKEN="your_token_here"
> claude mcp add yuque-mcp -- npx -y yuque-mcp --token=$YUQUE_TOKEN
> ```

### Verify MCP Connection

```bash
claude mcp list | grep -i yuque
# ✅ Expected: "yuque-mcp" appears with status "connected" or "configured"
# ❌ If not listed: check token and retry
```

---

## Post-Installation Verification

After either installation method, verify the integration is working:

### Test 1: Check MCP Tools Are Available

```bash
claude mcp list
# Look for "yuque-mcp" in the output
# Should show ~16 tools available
```

### Test 2: Quick Functional Test

Inside a Claude Code session, try calling a Yuque tool:

```
> Use the yuque_get_user tool to get my user info
```

Expected: Returns your Yuque user profile (username, avatar, etc.)

---

## Skills Installation (Optional — for Method 2)

If you used Method 2 (MCP only), you can manually add skills:

```bash
# Clone or navigate to the ecosystem repo
cd /path/to/yuque-ecosystem

# Skills are in plugins/yuque-personal/skills/ and plugins/yuque-group/skills/
# Claude Code auto-discovers skills from the plugin directory
```

> **Note:** Method 1 (Marketplace) includes all skills automatically.

---

## Available After Installation

### MCP Tools (16)

| Category | Tools |
|----------|-------|
| User | `yuque_get_user` |
| Search | `yuque_search` |
| Books (知识库) | `yuque_list_books`, `yuque_get_book`, `yuque_create_book`, `yuque_update_book` |
| Docs | `yuque_list_docs`, `yuque_get_doc`, `yuque_create_doc`, `yuque_update_doc` |
| TOC | `yuque_get_toc`, `yuque_update_toc` |
| Notes (小记) | `yuque_list_notes`, `yuque_get_note`, `yuque_create_note`, `yuque_update_note` |

### Skills (Marketplace install only)

**Personal (8):** smart-search, smart-summary, daily-capture, reading-digest, note-refine, knowledge-connect, style-extract, stale-detector

**Group (6):** smart-search, weekly-report, knowledge-report, meeting-notes, tech-design, onboarding-guide

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `command not found: claude` | Claude Code CLI not installed | `npm i -g @anthropic-ai/claude-code` |
| `YUQUE_TOKEN not set` | Missing API token | `export YUQUE_TOKEN="your_token"` |
| `npx: command not found` | Node.js/npm not installed | Install Node.js >= 18 |
| MCP server fails to start | Token invalid or expired | Regenerate at <https://www.yuque.com/settings/tokens> |
| Plugin not found in marketplace | Network or registry issue | Try Method 2 (MCP direct) as fallback |
| `ECONNREFUSED` or timeout | Network/firewall blocking `yuque.com` | Check connectivity: `curl -I https://www.yuque.com` |

---

## Uninstall

```bash
# Remove marketplace plugin
claude plugin remove yuque/yuque-ecosystem

# Or remove MCP server
claude mcp remove yuque-mcp
```
