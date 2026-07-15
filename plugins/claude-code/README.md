[中文](./README.md) | [English](./README.en.md) | [🤖 Agent Install](./AGENT-INSTALL.md)

# Yuque Plugin for Claude Code

> 语雀 AI 生态 — MCP Tools and Skills for Claude Code

## 插件

### yuque-personal（个人版）

个人知识库 AI 集成 — MCP Tools + 8 Skills。

📂 [`../yuque-personal/`](../yuque-personal/)

> **团队版（yuque-group）已暂时下线**：其依赖的团队统计类 MCP 工具尚未在 `yuque-mcp` 中提供，待底层工具就绪后再重新上架。

## 安装

```bash
# 1. 添加 marketplace
claude plugin marketplace add yuque/yuque-ecosystem

# 2. 安装插件（marketplace add 只是注册市场，必须再执行 install）
claude plugin install yuque-personal@yuque

# 3. 设置 Token（插件通过 YUQUE_TOKEN 环境变量读取）
export YUQUE_TOKEN="your_token_here"
```

验证：

```bash
claude plugin list | grep yuque-personal
```

## 相关链接

- [Yuque AI Ecosystem Website](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server (npm)](https://www.npmjs.com/package/yuque-mcp)

## License

MIT © yuque
