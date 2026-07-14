[中文](./README.md) | [English](./README.en.md) | [🤖 Agent Install](./AGENT-INSTALL.md)

# Yuque Plugin for Claude Code

> Yuque AI Ecosystem — MCP Tools and Skills for Claude Code

## Plugins

### yuque-personal

AI-powered personal knowledge base integration — MCP Tools + 8 Skills.

📂 [`../yuque-personal/`](../yuque-personal/)

> **The team edition (yuque-group) is temporarily withdrawn**: its skills depend on group-statistics MCP tools that are not yet available in `yuque-mcp`. It will return once the underlying tools ship.

## Installation

```bash
# 1. Add the marketplace
claude plugin marketplace add yuque/yuque-ecosystem

# 2. Install the plugin (marketplace add only registers the marketplace — the install step is required)
claude plugin install yuque-personal@yuque

# 3. Set your token (the plugin reads it from the YUQUE_TOKEN env var)
export YUQUE_TOKEN="your_token_here"
```

Verify:

```bash
claude plugin list | grep yuque-personal
```

## Links

- [Yuque AI Ecosystem Website](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server (npm)](https://www.npmjs.com/package/yuque-mcp)

## License

MIT © yuque
