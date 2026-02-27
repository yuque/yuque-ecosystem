import styles from './PluginInstall.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'

function PluginInstall() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Advanced</p>
      <div className={styles.titleRow}>
        <h2 className={styles.sectionTitle}>⚡ Claude Code Plugin</h2>
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
        Plugin = MCP Server + 8 个智能 Skills，适合 Claude Code 高级用户。
        <span className={styles.advancedBadge}>高级</span>
      </p>

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>0</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>前置准备：安装 Claude Code</h3>
            <p className={styles.stepDesc}>
              语雀 Plugin 基于{' '}
              <a
                href="https://docs.anthropic.com/en/docs/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Claude Code
              </a>
              {' '}运行，请先完成安装并确保可以正常启动。
            </p>
            <CodeBlock>
              npm install -g @anthropic-ai/claude-code
            </CodeBlock>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>添加语雀 Marketplace</h3>
            <CodeBlock>
              /plugin marketplace add yuque/yuque-plugin
            </CodeBlock>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>安装个人版 Plugin</h3>
            <p className={styles.stepDesc}>
              自动配置 MCP Server + Skills，开箱即用。
            </p>
            <CodeBlock>
              /plugin install yuque-personal@yuque
            </CodeBlock>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>设置语雀 Token（永久生效）</h3>
            <p className={styles.stepDesc}>
              前往{' '}
              <a
                href="https://www.yuque.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                语雀 Token 设置页
              </a>
              {' '}获取 Token，然后写入 shell 配置文件：
            </p>
            <CodeBlock>
              <span className={styles.codeComment}># 写入 ~/.zshrc，新终端自动生效</span>{'\n'}
              echo 'export YUQUE_PERSONAL_TOKEN=<span className={styles.codeHighlight}>"your-token-here"</span>' {'>>'}  ~/.zshrc && source ~/.zshrc
            </CodeBlock>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PluginInstall
