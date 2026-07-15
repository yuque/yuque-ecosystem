[中文](./README.md) | [English](./README.en.md) | [🤖 Agent Install](./AGENT-INSTALL.md)

# MCP Configuration Templates

Pre-built MCP server configuration snippets for various AI code editors.

## Usage

Copy the appropriate config file and replace `YOUR_YUQUE_TOKEN` with your actual token from [yuque.com/settings/tokens](https://www.yuque.com/settings/tokens)（OpenCode 模板除外，它通过 `{env:YUQUE_TOKEN}` 读取环境变量）。

> **注意：** 项目级配置文件替换后会包含明文 token，请将其加入 `.gitignore`，避免误提交。

| Client | Config File | Destination |
|--------|-------------|-------------|
| Cursor | `cursor.json` | `.cursor/mcp.json` |
| Windsurf | `windsurf.json` | `.windsurf/mcp.json` |
| GitHub Copilot (VS Code) | `vscode.json` | `.vscode/mcp.json` |
| OpenCode | `opencode.json` | `opencode.json` (project) or `~/.config/opencode/opencode.json` (global) |

> **Note:** VS Code itself does not support MCP natively; MCP support is provided through the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension. Make sure GitHub Copilot is installed in VS Code before using the `vscode.json` configuration.

## Claude Code

For Claude Code, use the CLI directly:

```bash
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=YOUR_YUQUE_TOKEN
```

Or install the plugin from the Marketplace:

```bash
claude plugin marketplace add yuque/yuque-ecosystem
claude plugin install yuque-personal@yuque
```

## OpenCode

Copy the config file to your project or global config directory:

```bash
# Project-level
cp opencode.json /path/to/your/project/opencode.json

# Global
cp opencode.json ~/.config/opencode/opencode.json
```

The OpenCode template uses `{env:YUQUE_TOKEN}` — just `export YUQUE_TOKEN="your_token"`, no need to edit the file.

For more details, see [`plugins/opencode/README.md`](../../plugins/opencode/README.md).
