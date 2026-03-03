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
            <h3 className={styles.stepTitle}>更新 Plugin（Skills）</h3>
            <p className={styles.stepDesc}>
              仓库已迁移到{' '}
              <a href="https://github.com/yuque/yuque-ecosystem" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
                yuque-ecosystem
              </a>
              ，当我们发布新版本的 Skills 时，你可以通过以下方式更新：
            </p>
            <CodeBlock>
              <span className={styles.codeComment}># 在终端中更新</span>{'\n'}
              claude plugin update yuque-personal@yuque{'\n'}{'\n'}
              <span className={styles.codeComment}># 或在 Claude Code 内部</span>{'\n'}
              /plugin update yuque-personal@yuque{'\n'}{'\n'}
              <span className={styles.codeComment}># ⚠️ 从旧的 yuque-plugin 迁移？先移除旧 marketplace：</span>{'\n'}
              /plugin marketplace remove yuque/yuque-plugin{'\n'}
              /plugin marketplace add yuque/yuque-ecosystem
            </CodeBlock>
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
            <CodeBlock>
              <span className={styles.codeComment}># 如需指定版本</span>{'\n'}
              {'{'}{'\n'}
              {'  '}"mcpServers": {'{'}{'\n'}
              {'    '}"yuque": {'{'}{'\n'}
              {'      '}"command": "npx",{'\n'}
              {'      '}"args": ["-y", "<span className={styles.codeHighlight}>yuque-mcp@latest</span>"]{'\n'}
              {'    '}{'}'}{'\n'}
              {'  '}{'}'}{'\n'}
              {'}'}
            </CodeBlock>
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
            <CodeBlock>
              <span className={styles.codeComment}># Plugin 版本</span>{'\n'}
              查看 /plugin 界面的 Installed tab{'\n'}{'\n'}
              <span className={styles.codeComment}># MCP Server 版本</span>{'\n'}
              npx yuque-mcp --version
            </CodeBlock>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Upgrade
