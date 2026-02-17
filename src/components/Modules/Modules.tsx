import styles from './Modules.module.css'

const modules = [
  {
    icon: '🔌',
    title: 'MCP Server',
    desc: '底层连接层，为 AI 助手提供标准化的语雀 API 接口，让任何 MCP 兼容客户端都能操作语雀。',
    meta: '25 个标准化 Tools',
  },
  {
    icon: '⚡',
    title: 'Skills',
    desc: '场景化解决方案，将多个 Tools 编排成完整工作流，覆盖搜索、写作、归档等高频场景。',
    meta: '6 个精选工作流',
  },
  {
    icon: '🧩',
    title: 'Plugin',
    desc: '语雀编辑器深度集成，在文档编写过程中直接调用 AI 能力，实现无缝创作体验。',
    meta: null,
    comingSoon: true,
  },
]

function Modules() {
  return (
    <section className={styles.section}>
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
            {m.comingSoon && <span className={styles.comingSoon}>Coming Soon</span>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Modules
