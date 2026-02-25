import styles from './Upgrade.module.css'

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
            <h3 className={styles.stepTitle}>更新 Plugin（Skills）</h3>
            <p className={styles.stepDesc}>
              当我们发布新版本的 Skills 时，你可以通过以下方式更新：
            </p>
            <div className={styles.codeBlock}>
              <span className={styles.codeComment}># 更新 Marketplace 目录</span>{'\n'}
              /plugin marketplace update{'\n'}{'\n'}
              <span className={styles.codeComment}># 重新安装 Plugin 以获取最新版本</span>{'\n'}
              /plugin install yuque@yuque-ecosystem
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>更新 MCP Server</h3>
            <p className={styles.stepDesc}>
              MCP Server（yuque-mcp）通过 <code>npx -y yuque-mcp</code> 运行，每次启动时会自动检查并使用最新版本，无需手动更新。
            </p>
            <div className={styles.codeBlock}>
              <span className={styles.codeComment}># 如需指定版本</span>{'\n'}
              {'{'}{'\n'}
              {'  '}"mcpServers": {'{'}{'\n'}
              {'    '}"yuque": {'{'}{'\n'}
              {'      '}"command": "npx",{'\n'}
              {'      '}"args": ["-y", "<span className={styles.codeHighlight}>yuque-mcp@1.0.0</span>"]{'\n'}
              {'    '}{'}'}{'\n'}
              {'  '}{'}'}{'\n'}
              {'}'}
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>查看版本</h3>
            <p className={styles.stepDesc}>
              随时确认你正在使用的版本。
            </p>
            <div className={styles.codeBlock}>
              <span className={styles.codeComment}># Plugin 版本</span>{'\n'}
              查看 /plugin 界面的 Installed tab{'\n'}{'\n'}
              <span className={styles.codeComment}># MCP Server 版本</span>{'\n'}
              npx yuque-mcp --version
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Upgrade
