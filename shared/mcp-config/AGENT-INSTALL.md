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

> **Important:** VS Code does not natively support MCP. MCP support requires the GitHub Copilot extension. Ensure GitHub Copilot is installed before proceeding.

### Prerequisites

```bash
# Check if GitHub Copilot extension is installed
code --list-extensions 2>/dev/null | grep -i "github.copilot"
# ✅ Expected: GitHub.copilot listed
# ❌ If not found: install from https://marketplace.visualstudio.com/items?itemName=GitHub.copilot
```

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

1. Ensure the GitHub Copilot extension is installed and active
2. Open VS Code
3. Open the Copilot chat panel
4. Yuque tools should appear in the available tools list

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

## Post-Installation: Available MCP Tools (16)

Once connected, the following tools are available to the AI agent:

| Category | Tools |
|----------|-------|
| User | `yuque_get_user` |
| Search | `yuque_search` |
| Books (知识库) | `yuque_list_books`, `yuque_get_book`, `yuque_create_book`, `yuque_update_book` |
| Docs | `yuque_list_docs`, `yuque_get_doc`, `yuque_create_doc`, `yuque_update_doc` |
| TOC | `yuque_get_toc`, `yuque_update_toc` |
| Notes (小记) | `yuque_list_notes`, `yuque_get_note`, `yuque_create_note`, `yuque_update_note` |

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
