# MCP Configuration — Yuque Integration (Agent Guide)

> For AI agents to auto-configure Yuque MCP server in various editors. Human-readable but optimized for machine execution.

This guide covers: **Cursor**, **VS Code (Copilot)**, **Windsurf**, and other MCP-compatible editors.

> For **Claude Code**, see [plugins/claude-code/AGENT-INSTALL.md](../../plugins/claude-code/AGENT-INSTALL.md).
> For **OpenCode**, see [plugins/opencode/AGENT-INSTALL.md](../../plugins/opencode/AGENT-INSTALL.md).

---

## Prerequisites Check

```bash
# Check Node.js version (>= 18 required)
node --version
# ✅ Expected: v18.x.x or higher

# Check npx is available
npx --version
# ✅ Expected: version string

# Verify YUQUE_TOKEN is set
echo $YUQUE_TOKEN
# ✅ Expected: your token string
# ❌ If empty: export YUQUE_TOKEN="your_token_here"
```

---

## Detect Your Editor

```bash
# Check what's available
[ -n "$CURSOR_SESSION" ] && echo "EDITOR=cursor"
[ -n "$VSCODE_PID" ] && echo "EDITOR=vscode"
command -v cursor >/dev/null && echo "cursor CLI available"
command -v code >/dev/null && echo "VS Code CLI available"
```

---

## Cursor

### Config File Location

- **Project-level:** `.cursor/mcp.json` (in project root)
- **Global:** `~/.cursor/mcp.json`

### Install

```bash
# Project-level
mkdir -p .cursor
cat > .cursor/mcp.json << EOF
{
  "mcpServers": {
    "yuque-mcp": {
      "command": "npx",
      "args": ["-y", "yuque-mcp", "--token=$YUQUE_TOKEN"]
    }
  }
}
EOF
echo "✅ Cursor MCP config written to .cursor/mcp.json"
```

### Verify

1. Open Cursor
2. Go to **Settings → MCP Servers**
3. `yuque-mcp` should appear and show as connected

---

## VS Code (GitHub Copilot)

### Config File Location

- **Project-level:** `.vscode/mcp.json` (in project root)
- **Global:** `~/.vscode/mcp.json`

### Install

```bash
# Project-level
mkdir -p .vscode
cat > .vscode/mcp.json << EOF
{
  "mcpServers": {
    "yuque-mcp": {
      "command": "npx",
      "args": ["-y", "yuque-mcp", "--token=$YUQUE_TOKEN"]
    }
  }
}
EOF
echo "✅ VS Code MCP config written to .vscode/mcp.json"
```

### Verify

1. Open VS Code
2. Open the Copilot chat panel
3. Yuque tools should appear in the available tools list

---

## Windsurf

### Config File Location

- **Project-level:** `.windsurf/mcp.json` (in project root)
- **Global:** `~/.windsurf/mcp.json`

### Install

```bash
# Project-level
mkdir -p .windsurf
cat > .windsurf/mcp.json << EOF
{
  "mcpServers": {
    "yuque-mcp": {
      "command": "npx",
      "args": ["-y", "yuque-mcp", "--token=$YUQUE_TOKEN"]
    }
  }
}
EOF
echo "✅ Windsurf MCP config written to .windsurf/mcp.json"
```

### Verify

1. Open Windsurf
2. Check MCP server status in settings
3. `yuque-mcp` should appear and show as connected

---

## Generic MCP Config (Other Editors)

If your editor supports MCP but isn't listed above, use this generic config format:

```json
{
  "mcpServers": {
    "yuque-mcp": {
      "command": "npx",
      "args": ["-y", "yuque-mcp", "--token=YOUR_YUQUE_TOKEN"]
    }
  }
}
```

Replace `YOUR_YUQUE_TOKEN` with your actual token.

---

## Copy Pre-Built Templates

If you have this repository cloned, you can copy the pre-built config files:

```bash
REPO_DIR="/path/to/yuque-ecosystem"  # Adjust this path

# Cursor
mkdir -p .cursor
cp "$REPO_DIR/shared/mcp-config/cursor.json" .cursor/mcp.json

# VS Code
mkdir -p .vscode
cp "$REPO_DIR/shared/mcp-config/vscode.json" .vscode/mcp.json

# Windsurf
mkdir -p .windsurf
cp "$REPO_DIR/shared/mcp-config/windsurf.json" .windsurf/mcp.json

# OpenCode
cp "$REPO_DIR/shared/mcp-config/opencode.json" ./opencode.json

# Then replace token in all files
find . -name "mcp.json" -o -name "opencode.json" | \
  xargs sed -i'' -e "s/YOUR_YUQUE_TOKEN/$YUQUE_TOKEN/g"

echo "✅ All config files installed and token replaced"
```

---

## Post-Installation: Available MCP Tools (25)

Once connected, the following tools are available to the AI agent:

| Category | Tools |
|----------|-------|
| Document Management | `yuque_search`, `yuque_get_doc`, `yuque_create_doc`, `yuque_update_doc`, `yuque_delete_doc`, `yuque_get_doc_history` |
| Knowledge Base | `yuque_list_repos`, `yuque_get_repo`, `yuque_create_repo`, `yuque_update_repo`, `yuque_delete_repo`, `yuque_get_toc` |
| User & Group | `yuque_get_user`, `yuque_list_groups`, `yuque_get_group`, `yuque_list_group_repos` |
| Collaboration | `yuque_list_comments`, `yuque_create_comment`, `yuque_delete_comment` |
| Statistics | `yuque_get_doc_stats`, `yuque_get_repo_stats`, `yuque_get_group_stats`, `yuque_get_group_member_stats`, `yuque_get_trending_docs`, `yuque_get_active_members` |

> **Note:** MCP-only installations provide tools but not skills. For skills, use the [Claude Code plugin](../../plugins/claude-code/) or [OpenCode plugin](../../plugins/opencode/).

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| MCP server not appearing | Config file in wrong location | Verify path matches your editor's expected location |
| `npx: command not found` | Node.js not installed | Install Node.js >= 18 |
| Token error / 401 | Invalid or expired token | Regenerate at <https://www.yuque.com/settings/tokens> |
| JSON parse error | Malformed config | Validate: `cat .cursor/mcp.json \| python3 -m json.tool` |
| Connection timeout | Network issue | Check: `curl -I https://www.yuque.com` |
| Tools not showing in chat | MCP not enabled in editor | Check editor settings to enable MCP support |

---

## Uninstall

Remove the MCP config file or delete the `yuque-mcp` entry from your config:

```bash
# Cursor
rm .cursor/mcp.json  # or edit to remove yuque-mcp entry

# VS Code
rm .vscode/mcp.json

# Windsurf
rm .windsurf/mcp.json
```
