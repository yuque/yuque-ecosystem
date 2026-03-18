[中文](./README.md) | [English](./README.en.md)

# 语雀 OpenClaw Plugin

> 语雀知识管理 — Agent Skills for OpenClaw

## 概述

将语雀知识管理能力集成到 OpenClaw Agent 生态，提供 8 个开箱即用的个人知识管理 Skills。

## 前置条件

- [OpenClaw](https://github.com/nicepkg/openclaw) 已安装并运行
- 语雀账号及 [个人 Token](https://www.yuque.com/settings/tokens)
- [yuque-mcp](https://www.npmjs.com/package/yuque-mcp) 已配置为 MCP Server

## 安装

```bash
openclaw plugins install @yuque/openclaw-plugin
```

## Skills

| Skill | 说明 |
|-------|------|
| **smart-search** | 自然语言搜索个人知识库，返回摘要答案和来源链接 |
| **smart-summary** | 对任意文档或知识库生成不同粒度的摘要 |
| **reading-digest** | 从文章中提取核心观点、金句和行动项，生成结构化阅读笔记 |
| **daily-capture** | 收集碎片想法，定期整理为结构化主题笔记 |
| **note-refine** | 将粗糙笔记打磨为高质量文档 |
| **knowledge-connect** | 发现文档间的隐藏关联，建议交叉引用链接 |
| **style-extract** | 分析写作风格，生成风格画像 |
| **stale-detector** | 扫描知识库中过时文档，生成维护报告 |

## MCP Server 配置

在 OpenClaw 的 `mcpServers` 配置中添加 yuque-mcp：

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

> Token 通过 MCP Server 的环境变量传入，插件本身不需要配置 Token。

## 目录结构

```
plugins/openclaw/
├── openclaw.plugin.json   # 插件清单
├── index.ts               # 插件入口（jiti 运行时加载）
├── skills/                # 8 个 Agent Skills
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

## 相关链接

- [语雀 AI 生态官网](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server (npm)](https://www.npmjs.com/package/yuque-mcp)

## License

MIT © yuque
