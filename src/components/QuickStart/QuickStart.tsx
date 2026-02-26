import { useState } from 'react'
import styles from './QuickStart.module.css'

type Tab = 'plugin' | 'manual'

function QuickStart() {
  const [active, setActive] = useState<Tab>('plugin')

  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Quick Start · 个人版</p>
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
        两种方式接入语雀个人版 AI 能力，推荐使用 Plugin 一键安装。团队版即将推出，敬请期待。
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
                /plugin marketplace add yuque/yuque-plugin
              </div>
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
              <div className={styles.codeBlock}>
                /plugin install yuque-personal@yuque
              </div>
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
              <div className={styles.codeBlock}>
                <span className={styles.codeComment}># 写入 ~/.zshrc，新终端自动生效</span>{'\n'}
                echo 'export YUQUE_PERSONAL_TOKEN=<span className={styles.codeHighlight}>"your-token-here"</span>' {'>>'}  ~/.zshrc && source ~/.zshrc
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
              <h3 className={styles.stepTitle}>一条命令添加 MCP Server</h3>
              <p className={styles.stepDesc}>
                Token 自动持久化到 Claude Code 配置中，无需手动设置环境变量。
              </p>
              <div className={styles.codeBlock}>
                claude mcp add -e YUQUE_PERSONAL_TOKEN=<span className={styles.codeHighlight}>your-token-here</span> yuque -- npx -y yuque-mcp
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
                <span className={styles.codeComment}># 整理笔记</span>{'\n'}
                "帮我把这篇草稿整理成结构清晰的文档"{'\n'}{'\n'}
                <span className={styles.codeComment}># 碎片捕捉</span>{'\n'}
                "记一下：微服务拆分时要注意数据一致性问题"
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default QuickStart
