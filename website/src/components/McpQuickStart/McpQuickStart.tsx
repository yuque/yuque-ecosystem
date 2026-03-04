import { useState } from 'react'
import styles from './McpQuickStart.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'

type Client = 'cursor' | 'vscode' | 'windsurf' | 'claude-desktop' | 'trae' | 'qoder' | 'cline'

interface ClientInfo {
  id: Client
  label: string
  flag: string
}

const clients: ClientInfo[] = [
  { id: 'cursor', label: 'Cursor', flag: 'cursor' },
  { id: 'vscode', label: 'GitHub Copilot', flag: 'vscode' },
  { id: 'windsurf', label: 'Windsurf', flag: 'windsurf' },
  { id: 'claude-desktop', label: 'Claude Desktop', flag: 'claude-desktop' },
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
        {/* Option 1: One-click */}
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

        {/* Option 2: Interactive */}
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
      </div>
    </section>
  )
}

export default McpQuickStart
