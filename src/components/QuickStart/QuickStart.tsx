import styles from './QuickStart.module.css'

function QuickStart() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Quick Start</p>
      <h2 className={styles.sectionTitle}>三步开始使用</h2>
      <p className={styles.sectionDesc}>
        只需一分钟，让你的 AI 助手连接语雀。
      </p>
      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>获取语雀 Token</h3>
            <p className={styles.stepDesc}>
              前往语雀个人设置页面，创建一个 Personal Access Token。
            </p>
            <div className={styles.codeBlock}>
              <span className={styles.codeComment}># 访问语雀 Token 设置页</span>{'\n'}
              <span className={styles.codeHighlight}>https://www.yuque.com/settings/tokens</span>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>添加 MCP Server</h3>
            <p className={styles.stepDesc}>
              在 Claude Desktop 或其他 MCP 客户端中添加 yuque-mcp。
            </p>
            <div className={styles.codeBlock}>
              <span className={styles.codeComment}># 使用 Claude CLI 添加</span>{'\n'}
              claude mcp add yuque-mcp -- npx -y yuque-mcp --token=<span className={styles.codeHighlight}>YOUR_TOKEN</span>
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
    </section>
  )
}

export default QuickStart
