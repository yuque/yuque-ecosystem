# Yuque AI Ecosystem — Agent Installation Guide

> This document is designed for AI agents (Claude Code, OpenCode, OpenClaw, etc.) to read and automatically install Yuque integration. Human-readable but optimized for machine execution.

## Step 1: Identify Your Environment

Determine which AI coding client you are running in and follow the corresponding guide:

- **Claude Code** → See [plugins/claude-code/AGENT-INSTALL.md](./plugins/claude-code/AGENT-INSTALL.md)
- **OpenCode** → See [plugins/opencode/AGENT-INSTALL.md](./plugins/opencode/AGENT-INSTALL.md)
- **Cursor / GitHub Copilot (VS Code) / Windsurf / Other Editors** → See [shared/mcp-config/AGENT-INSTALL.md](./shared/mcp-config/AGENT-INSTALL.md)
- **OpenClaw** → Coming soon

### How to Detect Your Client

```bash
# Check if Claude Code is available
claude --version 2>/dev/null && echo "CLIENT=claude-code"

# Check if OpenCode is available
opencode --version 2>/dev/null && echo "CLIENT=opencode"

# Check if running inside Cursor
[ -n "$CURSOR_SESSION" ] && echo "CLIENT=cursor"

# Check if running inside VS Code
[ -n "$VSCODE_PID" ] && echo "CLIENT=vscode"

# Check if GitHub Copilot extension is installed (required for MCP support in VS Code)
code --list-extensions 2>/dev/null | grep -i "github.copilot" && echo "COPILOT=installed"
```

## Step 2: Prerequisites

Before proceeding with any installation method, ensure the following:

```bash
# Check Node.js version (>= 18 required)
node --version
# Expected output: v18.x.x or higher

# Check npm is available
npm --version

# Check npx is available
npx --version
```

If Node.js is not installed or version is below 18:

```bash
# Install via nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc  # or ~/.zshrc
nvm install 18
nvm use 18
```

## Step 3: Get a Yuque API Token

1. Navigate to <https://www.yuque.com/settings/tokens>
2. Click **"Create New Token"**
3. Grant the following permissions:
   - ✅ Read documents
   - ✅ Write documents
   - ✅ Read knowledge bases
   - ✅ Manage knowledge bases (optional, for create/delete operations)
4. Copy the generated token
5. Store it securely:

```bash
# Option A: Set as environment variable (recommended)
export YUQUE_TOKEN="your_token_here"

# Option B: Add to your shell profile for persistence
echo 'export YUQUE_TOKEN="your_token_here"' >> ~/.zshrc  # or ~/.bashrc
source ~/.zshrc
```

## Step 4: Verify Token

```bash
# Quick test — should return your user info
npx -y yuque-mcp --token=$YUQUE_TOKEN --test
```

## Step 5: Follow Client-Specific Guide

Now proceed to the guide for your specific client (see Step 1 links above).

---

## Quick Reference: All Installation Methods

| Client | Method | Command |
|--------|--------|---------|
| Claude Code | Marketplace | `claude plugin marketplace add yuque/yuque-ecosystem` |
| Claude Code | MCP Direct | `claude mcp add yuque-mcp -- npx -y yuque-mcp --token=$YUQUE_TOKEN` |
| OpenCode | Config File | Add to `opencode.json` (see OpenCode guide) |
| Cursor | Config File | Add to `.cursor/mcp.json` (see MCP config guide) |
| VS Code | Config File | Add to `.vscode/mcp.json` (requires GitHub Copilot extension; see MCP config guide) |
| Windsurf | Config File | Add to `.windsurf/mcp.json` (see MCP config guide) |

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `node: command not found` | Node.js not installed | Install Node.js >= 18 via nvm or package manager |
| `npx: command not found` | npm/npx not in PATH | Reinstall Node.js or add to PATH |
| Token test fails with 401 | Invalid or expired token | Regenerate token at yuque.com/settings/tokens |
| Token test fails with network error | Firewall or proxy issue | Check network connectivity to `www.yuque.com` |
