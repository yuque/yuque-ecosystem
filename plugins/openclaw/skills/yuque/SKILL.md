# Yuque Skill for OpenClaw

> 语雀知识管理 Agent Skill — 让 OpenClaw Agent 无缝操作语雀知识库

## Overview

This skill enables the OpenClaw Agent to interact with Yuque (语雀) knowledge bases through the yuque-mcp-server.

## Capabilities

- **Knowledge Search** — Search across personal and team knowledge bases
- **Document Management** — Create, read, update documents
- **Daily Capture** — Quick capture thoughts and notes
- **Reading Digest** — Summarize and organize reading notes

## Prerequisites

- `yuque-mcp` server configured and running
- Valid Yuque API token

## MCP Server Configuration

```json
{
  "mcpServers": {
    "yuque": {
      "command": "npx",
      "args": ["-y", "yuque-mcp", "--token=YOUR_TOKEN"]
    }
  }
}
```

## Usage

Once installed, the Agent can use natural language to interact with Yuque:

- "Search my Yuque notes about TypeScript"
- "Create a new document in my knowledge base"
- "Summarize the articles I read this week"
