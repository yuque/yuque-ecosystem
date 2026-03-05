import { useState } from 'react'
import styles from './PluginInstall.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'

function PluginInstall() {
  const [activeTab, setActiveTab] = useState<'claude-code' | 'openclaw'>('claude-code')

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
        Plugin = MCP Server + Skills，选择你的 AI 客户端，一键安装。
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '36px',
      }}>
        <button
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: activeTab === 'claude-code' ? '1px solid rgba(0, 185, 107, 0.4)' : '1px solid var(--color-border)',
            background: activeTab === 'claude-code' ? 'rgba(0, 185, 107, 0.08)' : 'transparent',
            color: activeTab === 'claude-code' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
          onClick={() => setActiveTab('claude-code')}
        >
          🤖 Claude Code
          <span style={{
            padding: '2px 8px',
            borderRadius: '100px',
            fontSize: '11px',
            fontWeight: 700,
            background: 'rgba(0, 185, 107, 0.12)',
            color: '#00b96b',
          }}>推荐</span>
        </button>
        <button
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: activeTab === 'openclaw' ? '1px solid rgba(0, 185, 107, 0.4)' : '1px solid var(--color-border)',
            background: activeTab === 'openclaw' ? 'rgba(0, 185, 107, 0.08)' : 'transparent',
            color: activeTab === 'openclaw' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
          onClick={() => setActiveTab('openclaw')}
        >
          🐾 OpenClaw
        </button>
      </div>

      {activeTab === 'claude-code' ? (
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
                echo 'export YUQUE_PERSONAL_TOKEN=<span className={styles.codeHighlight}>"your-token-here"</span>' {'>>'}  ~/.zshrc && source ~/.zshrc
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
      ) : (
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>
                安装 OpenClaw
                <span className={`${styles.envTag} ${styles.envTerminal}`}>🖥️ 终端</span>
              </h3>
              <p className={styles.stepDesc}>
                OpenClaw 是开源的 AI Agent 框架，支持多种 AI 模型。请先完成安装。
              </p>
              <CodeBlock>
                npm install -g openclaw
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
                {' '}获取 Token，写入环境变量：
              </p>
              <CodeBlock>
                <span className={styles.codeComment}># 写入 ~/.zshrc，新终端自动生效</span>{'\n'}
                echo 'export YUQUE_PERSONAL_TOKEN=<span className={styles.codeHighlight}>"your-token-here"</span>' {'>>'}  ~/.zshrc && source ~/.zshrc
              </CodeBlock>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>
                安装语雀 Skills
                <span className={`${styles.envTag} ${styles.envTerminal}`}>🖥️ 终端</span>
              </h3>
              <p className={styles.stepDesc}>
                从 GitHub 安装语雀 Skills 包：
              </p>
              <CodeBlock>
                openclaw skills install yuque/yuque-ecosystem/plugins/openclaw
              </CodeBlock>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>
                配置 MCP Server
                <span className={`${styles.envTag} ${styles.envTerminal}`}>🖥️ 终端</span>
              </h3>
              <p className={styles.stepDesc}>
                将 MCP Server 配置添加到 OpenClaw：
              </p>
              <CodeBlock>
                <span className={styles.codeComment}># 下载配置模板</span>{'\n'}
                curl -o ~/.openclaw/mcp-servers.json https://raw.githubusercontent.com/yuque/yuque-ecosystem/main/shared/mcp-config/openclaw.json
              </CodeBlock>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PluginInstall
