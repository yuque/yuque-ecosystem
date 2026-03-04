# Yuque Plugin for OpenCode

> 语雀 AI 生态 — MCP Tools and Skills for [OpenCode](https://opencode.ai)

Integrate your Yuque knowledge base with OpenCode — the open-source AI coding agent. Get 25 MCP tools for document management and 14 ready-to-use skills for knowledge workflows.

## Editions

### Personal (个人版)

Personal knowledge base AI integration — 25 MCP Tools + 8 Skills.

📂 [`personal/`](./personal/)

### Group (团队版)

Team knowledge base AI integration — 25 MCP Tools + 6 Skills.

📂 [`group/`](./group/)

---

## MCP Server Setup

### Step 1: Get a Yuque API Token

1. Go to [yuque.com/settings/tokens](https://www.yuque.com/settings/tokens)
2. Create a new token with the permissions you need
3. Copy the token

### Step 2: Configure MCP Server

Add the following to your `opencode.json` (project-level or global `~/.config/opencode/opencode.json`):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "yuque": {
      "type": "local",
      "command": ["npx", "-y", "yuque-mcp", "--token=YOUR_YUQUE_TOKEN"],
      "enabled": true,
      "environment": {
        "YUQUE_TOKEN": ""
      }
    }
  }
}
```

> **Note:** Replace `YOUR_YUQUE_TOKEN` with your actual token in the command array. The `environment` field can optionally be used if `yuque-mcp` reads from env vars.

You can also copy the pre-built template:

```bash
cp shared/mcp-config/opencode.json ~/.config/opencode/opencode.json
# Then edit the file and replace YOUR_YUQUE_TOKEN with your actual token
```

### Step 3: Verify Connection

```bash
# List MCP servers and verify yuque is connected
opencode mcp list

# Debug the connection if needed
opencode mcp debug yuque
```

Once connected, all 25 yuque-mcp tools will be available to the AI agent.

---

## Skills Installation

OpenCode skills live in `.opencode/skills/` (project-level) or `~/.config/opencode/skills/` (global).

### Option A: Install to a Project

```bash
# Personal skills
cp -r plugins/opencode/personal/skills/* /path/to/your/project/.opencode/skills/

# Group skills (for team projects)
cp -r plugins/opencode/group/skills/* /path/to/your/project/.opencode/skills/
```

### Option B: Install Globally

```bash
# Personal skills
cp -r plugins/opencode/personal/skills/* ~/.config/opencode/skills/

# Group skills
cp -r plugins/opencode/group/skills/* ~/.config/opencode/skills/
```

### Option C: Quick Install Script

```bash
# Install personal skills globally
mkdir -p ~/.config/opencode/skills
for skill in plugins/opencode/personal/skills/*/; do
  cp -r "$skill" ~/.config/opencode/skills/
done
echo "✅ Installed $(ls -d plugins/opencode/personal/skills/*/ | wc -l | tr -d ' ') personal skills"

# Install group skills globally
for skill in plugins/opencode/group/skills/*/; do
  cp -r "$skill" ~/.config/opencode/skills/
done
echo "✅ Installed $(ls -d plugins/opencode/group/skills/*/ | wc -l | tr -d ' ') group skills"
```

After installation, OpenCode will automatically discover the skills. The agent can see the list and load them on demand.

---

## Available Skills

### Personal Skills (8)

| Skill | Description |
|-------|-------------|
| **smart-search** | Search personal knowledge bases with natural language and get summarized answers |
| **smart-summary** | Generate summaries at different granularity levels (one-liner, key points, detailed) |
| **daily-capture** | Capture fleeting ideas and organize them into structured thematic notes |
| **reading-digest** | Extract core insights and action items from articles into structured reading notes |
| **note-refine** | Polish rough notes into high-quality documents with better structure and formatting |
| **knowledge-connect** | Discover hidden connections between documents and suggest cross-references |
| **style-extract** | Analyze writing style from documents and generate a style profile |
| **stale-detector** | Find outdated documents and generate maintenance reports |

### Group Skills (6)

| Skill | Description |
|-------|-------------|
| **smart-search** | Search group knowledge bases with natural language (team-scoped) |
| **weekly-report** | Generate group weekly reports from Yuque activity data |
| **knowledge-report** | Generate comprehensive monthly knowledge management reports |
| **meeting-notes** | Format meeting content into structured notes and archive to Yuque |
| **tech-design** | Generate technical design documents using a standard template |
| **onboarding-guide** | Compile core team documents into a structured onboarding reading guide |

---

## Available MCP Tools (25)

The `yuque-mcp` server provides 25 tools across these categories:

### Document Management
| Tool | Description |
|------|-------------|
| `yuque_search` | Search documents by keyword |
| `yuque_get_doc` | Get document content by ID/slug |
| `yuque_create_doc` | Create a new document |
| `yuque_update_doc` | Update document content |
| `yuque_delete_doc` | Delete a document |
| `yuque_get_doc_history` | Get document revision history |

### Repository (Knowledge Base) Management
| Tool | Description |
|------|-------------|
| `yuque_list_repos` | List accessible knowledge bases |
| `yuque_get_repo` | Get knowledge base details |
| `yuque_create_repo` | Create a new knowledge base |
| `yuque_update_repo` | Update knowledge base settings |
| `yuque_delete_repo` | Delete a knowledge base |
| `yuque_get_toc` | Get table of contents |

### User & Group
| Tool | Description |
|------|-------------|
| `yuque_get_user` | Get current user info |
| `yuque_list_groups` | List groups the user belongs to |
| `yuque_get_group` | Get group details |
| `yuque_list_group_repos` | List repos in a group |

### Collaboration
| Tool | Description |
|------|-------------|
| `yuque_list_comments` | List document comments |
| `yuque_create_comment` | Add a comment to a document |
| `yuque_delete_comment` | Delete a comment |

### Statistics
| Tool | Description |
|------|-------------|
| `yuque_get_doc_stats` | Get document view/read stats |
| `yuque_get_repo_stats` | Get repo-level statistics |
| `yuque_get_group_stats` | Get group-level statistics |
| `yuque_get_group_member_stats` | Get group member contribution stats |
| `yuque_get_trending_docs` | Get trending documents |
| `yuque_get_active_members` | Get most active members |

---

## Compatibility Notes

- OpenCode's SKILL.md format is compatible with this project's skill format (frontmatter + markdown)
- OpenCode also reads `.claude/skills/` as a fallback, so Claude Code skills work in OpenCode too
- The MCP configuration uses OpenCode's native format (`command` array + `environment` object)

## Links

- [OpenCode](https://opencode.ai) — Open-source AI coding agent
- [OpenCode Docs: MCP Servers](https://opencode.ai/docs/mcp-servers)
- [OpenCode Docs: Skills](https://opencode.ai/docs/skills)
- [Yuque AI Ecosystem Website](https://yuque.github.io/yuque-ecosystem/)
- [yuque-mcp-server (npm)](https://www.npmjs.com/package/yuque-mcp)

## License

MIT © [Yuque](https://www.yuque.com)
