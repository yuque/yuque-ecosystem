#!/bin/bash
# 语雀 OpenClaw 插件一键安装脚本
# https://github.com/yuque/yuque-ecosystem

set -e

REPO_URL="https://github.com/yuque/yuque-ecosystem"
OPENCLAW_SKILLS_DIR="$HOME/.openclaw/skills"
MCPORTER_CONFIG_DIR="$HOME/.mcporter"

echo "🦞 语雀 OpenClaw 插件安装器"
echo "================================"
echo ""

# 检查 OpenClaw 是否安装
if ! command -v openclaw &> /dev/null; then
    echo "❌ 未检测到 OpenClaw，请先安装: npm install -g openclaw"
    exit 1
fi

echo "✓ 检测到 OpenClaw $(openclaw --version 2>/dev/null | head -1)"

# 检查 mcporter 是否安装
if ! command -v mcporter &> /dev/null; then
    echo "📦 正在安装 mcporter..."
    npm install -g mcporter
fi
echo "✓ mcporter $(mcporter --version 2>/dev/null)"

# 创建目录
mkdir -p "$OPENCLAW_SKILLS_DIR"
mkdir -p "$MCPORTER_CONFIG_DIR"

# 下载 Skills
echo ""
echo "📥 正在下载语雀 Skills..."

SKILLS=(
    "yuque-smart-search"
    "yuque-reading-digest"
    "yuque-daily-capture"
    "yuque-note-refine"
    "yuque-knowledge-connect"
    "yuque-style-extract"
    "yuque-smart-summary"
    "yuque-stale-detector"
)

for skill in "${SKILLS[@]}"; do
    echo "  → $skill"
    mkdir -p "$OPENCLAW_SKILLS_DIR/$skill"
    curl -sL "$REPO_URL/raw/main/openclaw/skills/$skill/SKILL.md" \
        -o "$OPENCLAW_SKILLS_DIR/$skill/SKILL.md"
done

# 配置 mcporter
echo ""
echo "⚙️ 配置 yuque MCP Server..."

cat > "$MCPORTER_CONFIG_DIR/mcporter.json" << 'EOF'
{
  "mcpServers": {
    "yuque": {
      "command": "npx",
      "args": ["-y", "yuque-mcp"],
      "env": {
        "YUQUE_TOKEN": "${YUQUE_TOKEN}"
      }
    }
  },
  "imports": []
}
EOF

echo "✓ mcporter 配置完成"

# 提示配置 Token
echo ""
echo "================================"
echo "✅ 安装完成！"
echo ""
echo "📋 下一步: 配置语雀 Token"
echo ""
echo "1. 获取 Token: https://www.yuque.com/settings/tokens"
echo ""
echo "2. 配置环境变量:"
echo "   echo 'export YUQUE_TOKEN=\"your-token\"' >> ~/.zshrc"
echo "   source ~/.zshrc"
echo ""
echo "3. 验证安装:"
echo "   openclaw skills list | grep yuque"
echo "   mcporter call yuque.yuque_hello"
echo ""
echo "🎉 开始使用:"
echo "   @OpenClaw 帮我在语雀搜索 xxx"
echo "   @OpenClaw 把这篇文章做成阅读笔记"
echo ""

