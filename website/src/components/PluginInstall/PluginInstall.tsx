import styles from './PluginInstall.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'

function PluginInstall() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Install</p>
      <div className={styles.titleRow}>
        <h2 className={styles.sectionTitle}>⚡ 安装 / Install</h2>
        <a
          className={styles.externalLink}
          href="https://github.com/yuque/yuque-ecosystem"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>
      </div>
      <p className={styles.sectionDesc}>
        所有客户端统一两步安装：配置 yuque-mcp，再复制 Skills。{' '}
        其他客户端（OpenCode / OpenClaw / Cursor …）见{' '}
        <a
          href="https://github.com/yuque/yuque-ecosystem/blob/main/AGENT-INSTALL.md"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          AGENT-INSTALL.md
        </a>
        。
      </p>

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>
              配置 MCP
              <span className={`${styles.envTag} ${styles.envTerminal}`}>🖥️ 终端</span>
            </h3>
            <p className={styles.stepDesc}>
              先从{' '}
              <a
                href="https://www.yuque.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                语雀 Token 设置页
              </a>
              {' '}获取 Token 并设置 <code>YUQUE_TOKEN</code>，再为 Claude Code 添加 yuque-mcp。
            </p>
            <CodeBlock>
              claude mcp add yuque-mcp -- npx -y yuque-mcp --token=$YUQUE_TOKEN
            </CodeBlock>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>
              复制 Skills
              <span className={`${styles.envTag} ${styles.envTerminal}`}>🖥️ 终端</span>
            </h3>
            <p className={styles.stepDesc}>
              克隆仓库，将当前可用的 Skills 复制到 Claude Code 目录。
            </p>
            <CodeBlock>
              git clone https://github.com/yuque/yuque-ecosystem.git{'\n'}
              mkdir -p ~/.claude/skills && cp -r yuque-ecosystem/skills/* ~/.claude/skills/
            </CodeBlock>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PluginInstall
