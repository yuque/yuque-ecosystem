import styles from './Plugin.module.css'

const capabilities = [
  { icon: '🔌', label: '25 MCP Tools', desc: '语雀全部核心 API 能力' },
  { icon: '⚡', label: '6 Skills', desc: '开箱即用的场景化工作流' },
  { icon: '🤖', label: 'Agent', desc: '自主规划、多步执行的 AI 代理' },
]

function Plugin() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Plugin</p>
      <div className={styles.titleRow}>
        <h2 className={styles.sectionTitle}>一键集成，开箱即用</h2>
        <a
          className={styles.externalLink}
          href="https://github.com/yuque/yuque-plugin"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>
      </div>
      <p className={styles.sectionDesc}>
        Plugin 将 MCP Server + Skills + Agent 打包为一体化解决方案，一条命令即可让 Claude Code 获得完整的语雀操作能力。
      </p>

      {/* Capabilities */}
      <div className={styles.capGrid}>
        {capabilities.map((c) => (
          <div key={c.label} className={styles.capCard}>
            <span className={styles.capIcon}>{c.icon}</span>
            <h3 className={styles.capTitle}>{c.label}</h3>
            <p className={styles.capDesc}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Install methods */}
      <div className={styles.installGrid}>
        <div className={styles.installCard}>
          <div className={styles.installHeader}>
            <span className={styles.installIcon}>⚡</span>
            <h3 className={styles.installTitle}>直接安装</h3>
          </div>
          <p className={styles.installDesc}>
            一条命令，自动配置 MCP Server、Skills 和 Agent。
          </p>
          <div className={styles.codeBlock}>
            <span className={styles.codeComment}># 安装 yuque-plugin</span>{'\n'}
            claude plugin add github:yuque/yuque-plugin
          </div>
        </div>

        <div className={styles.installCard}>
          <div className={styles.installHeader}>
            <span className={styles.installIcon}>🏪</span>
            <h3 className={styles.installTitle}>通过 Marketplace</h3>
          </div>
          <p className={styles.installDesc}>
            在 Claude Code Plugin Marketplace 中搜索安装。
          </p>
          <div className={styles.codeBlock}>
            <span className={styles.codeComment}># 搜索并安装</span>{'\n'}
            claude plugin search yuque{'\n'}
            claude plugin add yuque-plugin
          </div>
        </div>
      </div>
    </section>
  )
}

export default Plugin
