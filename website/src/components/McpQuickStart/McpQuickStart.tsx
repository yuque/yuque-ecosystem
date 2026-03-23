import { useState } from 'react'
import styles from './McpQuickStart.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'

type Client = 'cursor' | 'vscode' | 'windsurf' | 'claude-desktop' | 'claude-code' | 'codex' | 'trae' | 'qoder' | 'cline'

interface ClientInfo {
  id: Client
  label: string
  flag: string
  /** If true, this client uses its own CLI command instead of `npx yuque-mcp install` */
  customInstall?: boolean
}

const clients: ClientInfo[] = [
  { id: 'cursor', label: 'Cursor', flag: 'cursor' },
  { id: 'vscode', label: 'GitHub Copilot', flag: 'vscode' },
  { id: 'windsurf', label: 'Windsurf', flag: 'windsurf' },
  { id: 'claude-desktop', label: 'Claude Desktop', flag: 'claude-desktop' },
  { id: 'claude-code', label: 'Claude Code', flag: 'claude-code', customInstall: true },
  { id: 'codex', label: 'Codex', flag: 'codex', customInstall: true },
  { id: 'trae', label: 'Trae', flag: 'trae' },
  { id: 'qoder', label: 'Qoder', flag: 'qoder' },
  { id: 'cline', label: 'Cline', flag: 'cline' },
]

function McpQuickStart() {
  const [activeClient, setActiveClient] = useState<Client>('cursor')

  const currentClient = clients.find((c) => c.id === activeClient)!

  return (
    <section className={styles.section} id="quick-start">
      <p className={styles.sectionLabel}>Quick Start</p>
      <div className={styles.titleRow}>
        <h2 className={styles.sectionTitle}>🚀 快速开始</h2>
        <a
          className={styles.externalLink}
          href="https://github.com/yuque/yuque-mcp-server"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>
      </div>
      <p className={styles.sectionDesc}>
        选择你的 MCP 客户端，一键接入语雀 AI 能力。支持所有主流编辑器和 AI 工具。
      </p>

      {/* Platform Guides - moved to top */}
      <div className={styles.platformGuides}>
        <p className={styles.platformGuidesTitle}>📚 平台特定指南</p>
        <div className={styles.platformLinks}>
          <a
            href="https://www.yuque.com/yuque/blog/lh9nfocqh1nqf0c0"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.platformLink}
          >
            <span className={styles.platformIcon}>🪟</span>
            <span className={styles.platformName}>Windows 用户上手指南</span>
            <span className={styles.platformArrow}>→</span>
          </a>
          <a
            href="https://github.com/yuque/yuque-mcp-server#installation"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.platformLink}
          >
            <span className={styles.platformIcon}>🍎</span>
            <span className={styles.platformName}>macOS 用户上手指南</span>
            <span className={styles.platformArrow}>→</span>
          </a>
        </div>
      </div>

      {/* Prerequisites - inline chips */}
      <div className={styles.prerequisites}>
        <span className={styles.prereqTitle}>前置条件:</span>
        <div className={styles.prereqList}>
          <span className={styles.prereqItem}>
            <span className={styles.prereqIcon}>✓</span>
            <a
              href="https://nodejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Node.js 18+
            </a>
          </span>
          <span className={styles.prereqItem}>
            <span className={styles.prereqIcon}>✓</span>
            <a
              href="https://www.yuque.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              语雀 API Token
            </a>
          </span>
        </div>
      </div>

      {/* Client Tabs */}
      <div className={styles.tabWrapper}>
        <div className={styles.tabContainer}>
          {clients.map((client) => (
            <button
              key={client.id}
              className={`${styles.tabBtn} ${activeClient === client.id ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveClient(client.id)}
            >
              {client.label}
            </button>
          ))}
        </div>
      </div>

      {/* Install Options */}
      <div className={styles.installOptions}>
        {currentClient.customInstall && currentClient.id === 'claude-code' ? (
          <>
            {/* Claude Code - direct MCP config */}
            <div className={styles.installOption}>
              <div className={styles.optionHeader}>
                <span className={`${styles.optionBadge} ${styles.optionBadgeRecommended}`}>推荐</span>
                <h3 className={styles.optionTitle}>一键添加 MCP Server</h3>
              </div>
              <p className={styles.optionDesc}>
                使用 Claude Code 内置的 MCP 管理命令，直接添加语雀 MCP Server。
              </p>
              <CodeBlock>
                claude mcp add yuque-mcp -- npx -y yuque-mcp --token=<span className={styles.codeHighlight}>YOUR_TOKEN</span>
              </CodeBlock>
            </div>

            <div className={styles.optionDivider} />

            <div className={styles.installOption}>
              <div className={styles.optionHeader}>
                <span className={`${styles.optionBadge} ${styles.optionBadgeAlt}`}>环境变量</span>
                <h3 className={styles.optionTitle}>通过环境变量配置</h3>
              </div>
              <p className={styles.optionDesc}>
                先设置环境变量，再添加 MCP Server，Token 不会出现在命令历史中。
              </p>
              <CodeBlock>
                <span className={styles.codeComment}># 设置环境变量</span>{'\n'}
                export YUQUE_PERSONAL_TOKEN=<span className={styles.codeHighlight}>YOUR_TOKEN</span>{'\n'}
                <span className={styles.codeComment}># 添加 MCP Server</span>{'\n'}
                claude mcp add yuque-mcp -- npx -y yuque-mcp
              </CodeBlock>
            </div>
          </>
        ) : currentClient.customInstall && currentClient.id === 'codex' ? (
          <>
            {/* Codex - CLI based config */}
            <div className={styles.installOption}>
              <div className={styles.optionHeader}>
                <span className={`${styles.optionBadge} ${styles.optionBadgeRecommended}`}>推荐</span>
                <h3 className={styles.optionTitle}>一键添加 MCP Server</h3>
              </div>
              <p className={styles.optionDesc}>
                使用 Codex 内置的 MCP 管理命令，直接添加语雀 MCP Server。
              </p>
              <CodeBlock>
                codex mcp add yuque --env YUQUE_PERSONAL_TOKEN=<span className={styles.codeHighlight}>YOUR_TOKEN</span> -- npx -y yuque-mcp
              </CodeBlock>
            </div>

            <div className={styles.optionDivider} />

            <div className={styles.installOption}>
              <div className={styles.optionHeader}>
                <span className={`${styles.optionBadge} ${styles.optionBadgeAlt}`}>手动配置</span>
                <h3 className={styles.optionTitle}>编辑 config.toml</h3>
              </div>
              <p className={styles.optionDesc}>
                在 <code className={styles.codeHighlight}>~/.codex/config.toml</code> 中添加以下配置：
              </p>
              <CodeBlock>
                <span className={styles.codeComment}>[mcp_servers.yuque]</span>{'\n'}
                command = "npx"{'\n'}
                args = ["-y", "yuque-mcp"]{'\n'}
                {'\n'}
                <span className={styles.codeComment}>[mcp_servers.yuque.env]</span>{'\n'}
                YUQUE_PERSONAL_TOKEN = "<span className={styles.codeHighlight}>YOUR_TOKEN</span>"
              </CodeBlock>
            </div>
          </>
        ) : (
          <>
            {/* Generic clients - npx yuque-mcp install */}
            <div className={styles.installOption}>
              <div className={styles.optionHeader}>
                <span className={`${styles.optionBadge} ${styles.optionBadgeRecommended}`}>推荐</span>
                <h3 className={styles.optionTitle}>一键安装</h3>
              </div>
              <p className={styles.optionDesc}>
                自动为 {currentClient.label} 配置语雀 MCP Server，替换 <code className={styles.codeHighlight}>YOUR_TOKEN</code> 为你的语雀 Token。
              </p>
              <CodeBlock>
                npx yuque-mcp install --client={currentClient.flag} --token=<span className={styles.codeHighlight}>YOUR_TOKEN</span>
              </CodeBlock>
            </div>

            <div className={styles.optionDivider} />

            <div className={styles.installOption}>
              <div className={styles.optionHeader}>
                <span className={`${styles.optionBadge} ${styles.optionBadgeAlt}`}>交互式</span>
                <h3 className={styles.optionTitle}>交互式引导</h3>
              </div>
              <p className={styles.optionDesc}>
                通过问答式引导完成安装，适合不确定配置细节的用户。
              </p>
              <CodeBlock>npx yuque-mcp setup</CodeBlock>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default McpQuickStart
