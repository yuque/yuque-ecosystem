import styles from './PluginInstall.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'

function PluginInstall() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Advanced</p>
      <div className={styles.titleRow}>
        <h2 className={styles.sectionTitle}>⚡ Plugin 安装</h2>
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
        Plugin = MCP Server + Skills，在 Claude Code 中一键安装。其他客户端（OpenCode、Cursor 等）请参考{' '}
        <a
          href="https://github.com/yuque/yuque-ecosystem#quick-start"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          仓库文档
        </a>
        。
      </p>

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>
              安装 Claude Code
              <span className={`${styles.envTag} ${styles.envTerminal}`}>🖥️ 终端</span>
            </h3>
            <p className={styles.stepDesc}>
              Claude Code Plugin 基于{' '}
              <a
                href="https://docs.anthropic.com/en/docs/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Claude Code
              </a>
              {' '}运行，适合开发者使用。请先完成安装。
            </p>
            <CodeBlock>
              npm install -g @anthropic-ai/claude-code
            </CodeBlock>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>
              设置语雀 Token
              <span className={`${styles.envTag} ${styles.envTerminal}`}>🖥️ 终端</span>
            </h3>
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
              {' '}获取 Token，写入 shell 配置后进入 Claude Code：
            </p>
            <CodeBlock>
              <span className={styles.codeComment}># 写入 ~/.zshrc，新终端自动生效</span>{'\n'}
              echo 'export YUQUE_TOKEN=<span className={styles.codeHighlight}>"your-token-here"</span>' {'>>'}  ~/.zshrc && source ~/.zshrc
            </CodeBlock>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>
              添加语雀 Marketplace
              <span className={`${styles.envTag} ${styles.envClaude}`}>🤖 Claude Code</span>
            </h3>
            <p className={styles.stepDesc}>
              启动 Claude Code 后，输入以下命令：
            </p>
            <CodeBlock>
              /plugin marketplace add yuque/yuque-ecosystem
            </CodeBlock>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.step}>
          <div className={styles.stepNumber}>4</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>
              安装个人版 Plugin
              <span className={`${styles.envTag} ${styles.envClaude}`}>🤖 Claude Code</span>
            </h3>
            <p className={styles.stepDesc}>
              自动配置 MCP Server + Skills，开箱即用。
            </p>
            <CodeBlock>
              /plugin install yuque-personal@yuque
            </CodeBlock>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PluginInstall
