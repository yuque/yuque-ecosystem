# MCP Configuration Templates

Pre-built MCP server configuration snippets for various AI code editors.

## Usage

Copy the appropriate config file and replace `YOUR_YUQUE_TOKEN` with your actual token from [yuque.com/settings/tokens](https://www.yuque.com/settings/tokens).

| Client | Config File | Destination |
|--------|-------------|-------------|
| Cursor | `cursor.json` | `.cursor/mcp.json` |
| Windsurf | `windsurf.json` | `.windsurf/mcp.json` |
| VS Code (Copilot) | `vscode.json` | `.vscode/mcp.json` |
| OpenCode | `opencode.json` | `opencode.json` (project) or `~/.config/opencode/opencode.json` (global) |

## Claude Code

For Claude Code, use the CLI directly:

```bash
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=YOUR_YUQUE_TOKEN
```

Or install the plugin from the Marketplace:

```bash
claude plugin marketplace add yuque/yuque-ecosystem
```

## OpenCode

Copy the config file to your project or global config directory:

```bash
# Project-level
cp opencode.json /path/to/your/project/opencode.json

# Global
cp opencode.json ~/.config/opencode/opencode.json
```

Then edit the file and replace `YOUR_YUQUE_TOKEN` with your actual token.

For more details, see [`plugins/opencode/README.md`](../../plugins/opencode/README.md).
