import { useState } from 'react'
import styles from './QuickStart.module.css'

type Tab = 'plugin' | 'manual'

function QuickStart() {
  const [active, setActive] = useState<Tab>('plugin')

  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Quick Start</p>
      <div className={styles.titleRow}>
        <h2 className={styles.sectionTitle}>开始使用</h2>
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
        两种方式接入语雀 AI 能力，推荐使用 Plugin 一键安装。
      </p>

      <div className={styles.tabWrapper}>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabBtn} ${active === 'plugin' ? styles.tabBtnActive : ''}`}
            onClick={() => setActive('plugin')}
          >
            ⚡ Plugin 安装
          </button>
          <button
            className={`${styles.tabBtn} ${active === 'manual' ? styles.tabBtnActive : ''}`}
            onClick={() => setActive('manual')}
          >
            🔧 手动配置
          </button>
        </div>
      </div>

      {active === 'plugin' ? (
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>添加语雀 Marketplace</h3>
              <div className={styles.codeBlock}>
                claude plugin marketplace add yuque/yuque-ecosystem
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>安装 Plugin</h3>
              <p className={styles.stepDesc}>
                自动配置 MCP Server + Skills，开箱即用。
              </p>
              <div className={styles.codeBlock}>
                claude plugin install yuque@yuque-ecosystem
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>设置语雀 Token</h3>
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
                {' '}获取 Token。
              </p>
              <div className={styles.codeBlock}>
                export YUQUE_TOKEN=<span className={styles.codeHighlight}>"your-token-here"</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>获取语雀 Token</h3>
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
                {' '}创建 Personal Access Token。
              </p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>添加 MCP Server</h3>
              <div className={styles.codeBlock}>
                <span className={styles.codeComment}># 添加 yuque-mcp</span>{'\n'}
                claude mcp add yuque-mcp -- npx -y yuque-mcp{'\n'}{'\n'}
                <span className={styles.codeComment}># 设置环境变量</span>{'\n'}
                export YUQUE_TOKEN=<span className={styles.codeHighlight}>"your-token-here"</span>
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>开始使用！</h3>
              <p className={styles.stepDesc}>
                现在你可以用自然语言操作语雀了。试试这些指令：
              </p>
              <div className={styles.codeBlock}>
                <span className={styles.codeComment}># 搜索文档</span>{'\n'}
                "帮我找一下上周写的技术方案"{'\n'}{'\n'}
                <span className={styles.codeComment}># 创建文档</span>{'\n'}
                "把这段会议记录整理成文档，放到团队知识库里"{'\n'}{'\n'}
                <span className={styles.codeComment}># 生成周报</span>{'\n'}
                "汇总我本周的文档动态，生成周报"
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default QuickStart
