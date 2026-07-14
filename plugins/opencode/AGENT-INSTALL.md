# OpenCode — Yuque Plugin Installation (Agent Guide)

> For AI agents to auto-install. Human-readable but optimized for machine execution.

---

## Prerequisites Check

Run these commands to verify your environment:

```bash
# Check OpenCode is available
opencode --version
# ✅ Expected: version string
# ❌ If "command not found": install OpenCode first (https://opencode.ai)

# Check Node.js version (>= 20 required; 18 is EOL)
node --version
# ✅ Expected: v20.x.x or higher
# ❌ If below 20: upgrade via nvm (`nvm install 20 && nvm use 20`)

# Check npx is available
npx --version
# ✅ Expected: version string
# ❌ If missing: comes with npm, reinstall Node.js

# Check the token is set
[ -n "$YUQUE_TOKEN" ] && echo "TOKEN=set" || echo "TOKEN=missing"
# ❌ If missing: export YUQUE_TOKEN="..." (get one at https://www.yuque.com/settings/tokens)
```

---

## Step 1: Configure MCP Server

The config uses OpenCode's `{env:YUQUE_TOKEN}` substitution — the token is resolved at runtime and never written into the file. **Do not** replace it with a literal token, especially in a project-level config that may get committed.

### Option A: Global Config (recommended)

```bash
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
```

> If `~/.config/opencode/opencode.json` already exists, merge the `mcp.yuque` entry into it instead of overwriting.

### Option B: Project-Level Config

Create or edit `opencode.json` in your project root with the same `mcp.yuque` entry as above.

### Option C: Copy Pre-Built Template

If you have this repository cloned:

```bash
cp shared/mcp-config/opencode.json ~/.config/opencode/opencode.json
```

### Verify MCP Connection

```bash
opencode mcp list
# ✅ Expected: "yuque" appears in the server list
# ❌ If not listed: check config file path and JSON syntax

opencode mcp debug yuque
# ✅ Expected: shows connection status and available tools
# ❌ If error: check token validity
```

---

## Step 2: Install Skills

Skills add high-level workflows on top of the MCP tools.

### Determine Skill Directory

```bash
# Project-level skills
SKILL_DIR=".opencode/skills"

# OR Global skills
SKILL_DIR="$HOME/.config/opencode/skills"

# Create if it doesn't exist
mkdir -p "$SKILL_DIR"
```

### Install Skills (8 skills)

```bash
# Requires this repo to be cloned
REPO_DIR="/path/to/yuque-ecosystem"  # Adjust this path

cp -r "$REPO_DIR/plugins/opencode/personal/skills/"* "$SKILL_DIR/"
ls "$SKILL_DIR"
# ✅ Expected: directories like smart-search/, smart-summary/, daily-capture/, etc.
```

After installation, OpenCode automatically discovers skills. No restart needed.

---

## Post-Installation Verification

### Test 1: MCP Tools

Inside an OpenCode session, try:

```
> Use the yuque_get_user tool to get my user info
```

Expected: Returns your Yuque user profile.

### Test 2: Skills

Inside an OpenCode session, try:

```
> Use the smart-search skill to search for "getting started"
```

Expected: Returns matching documents from your Yuque knowledge base.

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

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `yuque` not in `opencode mcp list` | Config file path or JSON syntax error | Validate JSON; check `~/.config/opencode/opencode.json` |
| MCP server fails to start | `YUQUE_TOKEN` not set in the environment | `export YUQUE_TOKEN="..."` and restart OpenCode |
| 401 from Yuque API | Token invalid or expired | Regenerate at <https://www.yuque.com/settings/tokens> |
| Skills not discovered | Wrong skills directory | Use `.opencode/skills/` (project) or `~/.config/opencode/skills/` (global) |
