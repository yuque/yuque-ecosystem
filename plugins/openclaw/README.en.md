[中文](./README.md) | [English](./README.en.md)

# Yuque Plugin for OpenClaw

> Yuque AI Ecosystem — MCP Tools + Agent Skills for OpenClaw

## Overview

This plugin integrates Yuque knowledge management into the OpenClaw Agent ecosystem, providing:

- **Agent Skills** — Natural language workflows for knowledge management
- **MCP Integration** — Powered by [yuque-mcp-server](https://www.npmjs.com/package/yuque-mcp)

## Structure

```
plugins/openclaw/
├── openclaw.plugin.json   # Plugin manifest
├── src/
│   └── index.ts           # Plugin entry point
├── skills/
│   └── yuque/
│       └── SKILL.md       # Agent skill definition
├── package.json
└── tsconfig.json
```

## Setup

1. Install the plugin in OpenClaw
2. Configure your Yuque API token
3. The Agent will automatically have access to Yuque skills

## Development

```bash
npm install
npm run build
```

## Links

- [Yuque AI Ecosystem Website](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server (npm)](https://www.npmjs.com/package/yuque-mcp)

## License

MIT © yuque
