[中文](./README.md) | [English](./README.en.md)

# Yuque OpenClaw Plugin

> Yuque Knowledge Management — Agent Skills for OpenClaw

## Overview

Integrates Yuque knowledge management into the OpenClaw Agent ecosystem with 8 ready-to-use personal knowledge management Skills.

## Prerequisites

- [OpenClaw](https://github.com/nicepkg/openclaw) installed and running
- Yuque account with a [personal Token](https://www.yuque.com/settings/tokens)
- [yuque-mcp](https://www.npmjs.com/package/yuque-mcp) configured as MCP Server

## Installation

```bash
openclaw plugins install @yuque/openclaw-plugin
```

## Skills

| Skill | Description |
|-------|-------------|
| **smart-search** | Search personal knowledge bases with natural language, get summarized answers with source links |
| **smart-summary** | Generate summaries of any document or knowledge base at different granularity levels |
| **reading-digest** | Extract core insights, golden quotes, and action items into structured reading notes |
| **daily-capture** | Collect fleeting ideas throughout the day, organize into structured thematic notes |
| **note-refine** | Polish rough notes into high-quality documents with better structure and formatting |
| **knowledge-connect** | Discover hidden connections between documents, suggest cross-reference links |
| **style-extract** | Analyze writing style from documents, generate a reusable style profile |
| **stale-detector** | Scan knowledge bases for stale documents, generate maintenance reports |

## MCP Server Configuration

Add yuque-mcp to your OpenClaw `mcpServers` configuration:

```json
{
  "mcpServers": {
    "yuque-mcp": {
      "command": "npx",
      "args": ["-y", "yuque-mcp"],
      "env": {
        "YUQUE_TOKEN": "your-yuque-token",
        "YUQUE_API_URL": "https://www.yuque.com/api/v2"
      }
    }
  }
}
```

> Token is passed via MCP Server environment variables. The plugin itself does not require token configuration.

## Directory Structure

```
plugins/openclaw/
├── openclaw.plugin.json   # Plugin manifest
├── index.ts               # Plugin entry point (loaded by jiti at runtime)
├── skills/                # 8 Agent Skills
│   ├── smart-search/
│   ├── smart-summary/
│   ├── reading-digest/
│   ├── daily-capture/
│   ├── note-refine/
│   ├── knowledge-connect/
│   ├── style-extract/
│   └── stale-detector/
├── package.json
└── README.md
```

## Links

- [Yuque AI Ecosystem Website](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server (npm)](https://www.npmjs.com/package/yuque-mcp)

## License

MIT © yuque
