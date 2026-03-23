# OpenCode — Yuque Plugin Installation (Agent Guide)

> For AI agents to auto-install. Human-readable but optimized for machine execution.

---

## Prerequisites Check

Run these commands to verify your environment:

```bash
# Check OpenCode is available
opencode --version
# ✅ Expected: version string
# ❌ If "command not found": install OpenCode first (https://opencode.ai)

# Check Node.js version (>= 18 required)
node --version
# ✅ Expected: v18.x.x or higher
# ❌ If below 18: upgrade via nvm (`nvm install 18 && nvm use 18`)

# Check npx is available
npx --version
# ✅ Expected: version string
# ❌ If missing: comes with npm, reinstall Node.js
```

---

## Step 1: Configure MCP Server

Choose between project-level or global configuration.

### Option A: Project-Level Config

Create or edit `opencode.json` in your project root:

```bash
cat > opencode.json << 'EOF'
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "yuque": {
      "type": "local",
      "command": ["npx", "-y", "yuque-mcp", "--token=YOUR_YUQUE_TOKEN"],
      "enabled": true
    }
  }
}
EOF
```

Then replace the token:

```bash
# Replace placeholder with actual token
sed -i'' -e "s/YOUR_YUQUE_TOKEN/$YUQUE_TOKEN/g" opencode.json
```

### Option B: Global Config

```bash
mkdir -p ~/.config/opencode

cat > ~/.config/opencode/opencode.json << 'EOF'
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "yuque": {
      "type": "local",
      "command": ["npx", "-y", "yuque-mcp", "--token=YOUR_YUQUE_TOKEN"],
      "enabled": true
    }
  }
}
EOF

# Replace placeholder with actual token
sed -i'' -e "s/YOUR_YUQUE_TOKEN/$YUQUE_TOKEN/g" ~/.config/opencode/opencode.json
```

### Option C: Copy Pre-Built Template

If you have this repository cloned:

```bash
# Global install
cp shared/mcp-config/opencode.json ~/.config/opencode/opencode.json
sed -i'' -e "s/YOUR_YUQUE_TOKEN/$YUQUE_TOKEN/g" ~/.config/opencode/opencode.json

# Project install
cp shared/mcp-config/opencode.json ./opencode.json
sed -i'' -e "s/YOUR_YUQUE_TOKEN/$YUQUE_TOKEN/g" ./opencode.json
```

### Verify MCP Connection

```bash
opencode mcp list
# ✅ Expected: "yuque" appears in the server list
# ❌ If not listed: check config file path and JSON syntax

opencode mcp debug yuque
# ✅ Expected: shows connection status and available tools
# ❌ If error: check token validity
```

---

## Step 2: Install Skills

Skills add high-level workflows on top of the MCP tools.

### Determine Skill Directory

```bash
# Project-level skills
SKILL_DIR=".opencode/skills"

# OR Global skills
SKILL_DIR="$HOME/.config/opencode/skills"

# Create if it doesn't exist
mkdir -p "$SKILL_DIR"
```

### Install Personal Skills (8 skills)

```bash
# Requires this repo to be cloned
REPO_DIR="/path/to/yuque-ecosystem"  # Adjust this path

cp -r "$REPO_DIR/plugins/opencode/personal/skills/"* "$SKILL_DIR/"
echo "✅ Installed personal skills"
ls "$SKILL_DIR"
```

### Install Group/Team Skills (6 skills)

```bash
cp -r "$REPO_DIR/plugins/opencode/group/skills/"* "$SKILL_DIR/"
echo "✅ Installed group skills"
ls "$SKILL_DIR"
```

### Install Both Editions

```bash
REPO_DIR="/path/to/yuque-ecosystem"  # Adjust this path
SKILL_DIR="$HOME/.config/opencode/skills"
mkdir -p "$SKILL_DIR"

cp -r "$REPO_DIR/plugins/opencode/personal/skills/"* "$SKILL_DIR/"
cp -r "$REPO_DIR/plugins/opencode/group/skills/"* "$SKILL_DIR/"

echo "✅ Installed all skills:"
ls -d "$SKILL_DIR"/*/
```

### Verify Skills

After installation, OpenCode automatically discovers skills. No restart needed.

```bash
# List installed skills
ls "$SKILL_DIR"
# Expected: directories like smart-search/, smart-summary/, daily-capture/, etc.
```

---

## Post-Installation Verification

### Test 1: MCP Tools

Inside an OpenCode session, try:

```
> Use the yuque_get_user tool to get my user info
```

Expected: Returns your Yuque user profile.

### Test 2: Skills

Inside an OpenCode session, try:

```
> Use the smart-search skill to search for "getting started"
```

Expected: Returns matching documents from your Yuque knowledge base.

---

## Available After Installation

### MCP Tools (16)

| Category | Tools |
|----------|-------|
| User | `yuque_get_user` |
| Search | `yuque_search` |
| Books (知识库) | `yuque_list_books`, `yuque_get_book`, `yuque_create_book`, `yuque_update_book` |
| Docs | `yuque_list_docs`, `yuque_get_doc`, `yuque_create_doc`, `yuque_update_doc` |
| TOC | `yuque_get_toc`, `yuque_update_toc` |
| Notes (小记) | `yuque_list_notes`, `yuque_get_note`, `yuque_create_note`, `yuque_update_note` |

### Personal Skills (8)

| Skill | Description |
|-------|-------------|
| **smart-search** | Search personal knowledge bases with natural language |
| **smart-summary** | Generate summaries at different granularity levels |
| **daily-capture** | Capture ideas and organize into structured notes |
| **reading-digest** | Extract insights from articles into reading notes |
| **note-refine** | Polish rough notes into high-quality documents |
| **knowledge-connect** | Discover hidden connections between documents |
| **style-extract** | Analyze writing style and generate a style profile |
| **stale-detector** | Find outdated documents and generate reports |

### Group Skills (6)

| Skill | Description |
|-------|-------------|
| **smart-search** | Search group knowledge bases (team-scoped) |
| **weekly-report** | Generate group weekly reports from activity data |
| **knowledge-report** | Generate monthly knowledge management reports |
| **meeting-notes** | Format meetings into structured notes |
| **tech-design** | Generate technical design documents |
| **onboarding-guide** | Compile onboarding reading guides |

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `command not found: opencode` | OpenCode not installed | Install from <https://opencode.ai> |
| MCP server not appearing | Config file not found | Verify path: project `opencode.json` or `~/.config/opencode/opencode.json` |
| `YUQUE_TOKEN` not replaced | Placeholder still in config | Edit config and replace `YOUR_YUQUE_TOKEN` with actual token |
| JSON parse error | Malformed config file | Validate JSON: `cat opencode.json | python3 -m json.tool` |
| Skills not discovered | Wrong skill directory | Check that skills are in `.opencode/skills/` or `~/.config/opencode/skills/` |
| MCP connection timeout | Network or token issue | Test: `npx -y yuque-mcp --token=$YUQUE_TOKEN --test` |
| `ECONNREFUSED` | Firewall blocking `yuque.com` | Check: `curl -I https://www.yuque.com` |

---

## Uninstall

```bash
# Remove MCP config (edit opencode.json, remove the "yuque" key from "mcp")

# Remove skills
rm -rf ~/.config/opencode/skills/smart-search
rm -rf ~/.config/opencode/skills/smart-summary
rm -rf ~/.config/opencode/skills/daily-capture
rm -rf ~/.config/opencode/skills/reading-digest
rm -rf ~/.config/opencode/skills/note-refine
rm -rf ~/.config/opencode/skills/knowledge-connect
rm -rf ~/.config/opencode/skills/style-extract
rm -rf ~/.config/opencode/skills/stale-detector
rm -rf ~/.config/opencode/skills/weekly-report
rm -rf ~/.config/opencode/skills/knowledge-report
rm -rf ~/.config/opencode/skills/meeting-notes
rm -rf ~/.config/opencode/skills/tech-design
rm -rf ~/.config/opencode/skills/onboarding-guide
```
