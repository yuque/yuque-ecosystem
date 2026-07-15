import styles from './Upgrade.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'

function Upgrade() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Upgrade</p>
      <h2 className={styles.sectionTitle}>🔄 更新 / Upgrade</h2>
      <p className={styles.sectionDesc}>
        保持你的语雀 AI 工具始终是最新版本。
      </p>
      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>更新 Skills</h3>
            <p className={styles.stepDesc}>
              进入已克隆的仓库拉取最新内容，然后覆盖本地 Skills 即可完成更新。
            </p>
            <CodeBlock>
              cd yuque-ecosystem && git pull && cp -r skills/* ~/.claude/skills/
            </CodeBlock>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>更新 MCP Server</h3>
            <p className={styles.stepDesc}>
              MCP Server 通过 <code>npx -y yuque-mcp</code> 运行，每次启动都会自动拉取最新版本，无需手动更新。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Upgrade
