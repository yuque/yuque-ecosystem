import styles from './Modules.module.css'

const modules = [
  {
    icon: '🔌',
    title: 'MCP Server',
    desc: '能力层。为 AI 助手提供标准化的语雀 API 工具，覆盖文档、知识库、小记、画板，任何 MCP 兼容客户端都能使用。',
    meta: 'npm: yuque-mcp',
  },
  {
    icon: '⚡',
    title: 'Skills',
    desc: '资产层。将多个工具编排成完整工作流，覆盖搜索、写作、归档等高频场景。标准 SKILL.md 格式，跨客户端通用。',
    meta: '8 个精选工作流 · 仓库唯一源',
  },
  {
    icon: '🧩',
    title: 'Plugin',
    desc: '分发层。Claude Code 通过 Marketplace 一键安装 MCP + Skills；OpenCode、OpenClaw 等客户端直接复制 skills/ 目录即可接入。',
    meta: '一次编写，处处可用',
  },
]

function Modules() {
  return (
    <section className={styles.section} id="architecture">
      <p className={styles.sectionLabel}>Architecture</p>
      <h2 className={styles.sectionTitle}>三层架构，渐进增强</h2>
      <p className={styles.sectionDesc}>
        从底层协议到上层应用，每一层都可以独立使用，也可以组合出更强大的能力。
      </p>
      <div className={styles.grid}>
        {modules.map((m) => (
          <div key={m.title} className={styles.card}>
            <span className={styles.cardIcon}>{m.icon}</span>
            <h3 className={styles.cardTitle}>{m.title}</h3>
            <p className={styles.cardDesc}>{m.desc}</p>
            {m.meta && <span className={styles.cardMeta}>{m.meta}</span>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Modules
