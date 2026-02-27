# 语雀 AI 生态 — OpenClaw 适配

> 让 OpenClaw 无缝连接语雀知识库，释放 AI + 知识管理的力量。

## 🎯 概述

本目录提供语雀 AI 生态的 OpenClaw 适配，包括:

- **mcporter 配置** - 通过 MCP 协议连接 yuque-mcp-server
- **8 个 Skills** - 覆盖知识管理全生命周期的场景化工作流

## 🚀 一键安装

```bash
curl -fsSL https://raw.githubusercontent.com/yuque/yuque-ecosystem/main/openclaw/install.sh | bash
```

或者手动安装：

```bash
# 克隆仓库
git clone https://github.com/yuque/yuque-ecosystem.git
cd yuque-ecosystem

# 运行安装脚本
bash openclaw/install.sh
```

## ⚙️ 配置 Token

安装完成后，需要配置语雀 API Token：

```bash
# 1. 获取 Token: https://www.yuque.com/settings/tokens

# 2. 配置环境变量 (二选一)

# 方式一: 临时使用
export YUQUE_TOKEN="your-token-here"

# 方式二: 永久配置 (推荐)
echo 'export YUQUE_TOKEN="your-token-here"' >> ~/.zshrc
source ~/.zshrc
```

## ✅ 验证安装

```bash
# 检查 Skills 是否加载
openclaw skills list | grep yuque

# 测试 MCP 连接
mcporter call yuque.yuque_hello
```

## 📦 Skills 列表

| Skill | 阶段 | 说明 |
|-------|------|------|
| 📖 [yuque-reading-digest](skills/yuque-reading-digest/) | 输入 | 阅读文章自动生成结构化笔记 |
| 💡 [yuque-daily-capture](skills/yuque-daily-capture/) | 输入 | 随时记录灵感，定期自动整理 |
| ✨ [yuque-note-refine](skills/yuque-note-refine/) | 加工 | 把粗糙笔记打磨成高质量文档 |
| 🕸️ [yuque-knowledge-connect](skills/yuque-knowledge-connect/) | 加工 | 分析文档关联，构建知识网络 |
| ✍️ [yuque-style-extract](skills/yuque-style-extract/) | 加工 | 分析写作风格，保持一致文风 |
| 🔍 [yuque-smart-search](skills/yuque-smart-search/) | 输出 | 自然语言搜索知识库 |
| 📋 [yuque-smart-summary](skills/yuque-smart-summary/) | 输出 | 生成不同粒度的摘要 |
| 🔎 [yuque-stale-detector](skills/yuque-stale-detector/) | 维护 | 扫描过期文档，生成健康报告 |

## 🔧 MCP Tools

通过 mcporter 可调用 25 个语雀 API:

```bash
# 搜索文档
mcporter call yuque.yuque_search query="关键词"

# 获取文档
mcporter call yuque.yuque_get_doc repo_id="namespace" doc_id="slug"

# 创建文档
mcporter call yuque.yuque_create_doc repo_id="notes" title="标题" body="内容"

# 更多命令
mcporter list yuque --schema
```

## 📱 飞书集成示例

配合 OpenClaw 飞书通道，可以在飞书中直接使用语雀能力:

```
@OpenClaw 帮我在语雀搜索关于 RAG 的笔记

@OpenClaw 把这篇文章做成阅读笔记存到语雀 https://...

@OpenClaw 检查一下我的语雀知识库有哪些过期文档
```

## ⏰ Cron 自动化

可配置定时任务自动维护知识库:

```json
{
  "id": "yuque-weekly-organize",
  "schedule": "0 10 * * 1",
  "prompt": "整理语雀快速捕捉笔记，归类到对应主题"
}
```

## 📚 相关链接

- [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) - MCP Server 源码
- [yuque-plugin](https://github.com/yuque/yuque-plugin) - Claude Code Plugin
- [OpenClaw 文档](https://docs.openclaw.ai/) - OpenClaw 官方文档
- [mcporter](https://mcporter.dev/) - MCP 工具 CLI

## License

MIT © [Yuque](https://www.yuque.com)

