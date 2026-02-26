import styles from './DesignPhilosophy.module.css'

const phases = [
  {
    emoji: '📥',
    phase: '输入',
    title: 'Capture',
    desc: '碎片想法、阅读笔记，随时捕获，不再遗忘。',
    skills: ['reading-digest', 'daily-capture'],
    color: '#58a6ff',
  },
  {
    emoji: '🧠',
    phase: '加工',
    title: 'Process',
    desc: '打磨笔记、发现关联、提炼风格，让知识真正内化。',
    skills: ['note-refine', 'knowledge-connect', 'style-extract'],
    color: '#d2a8ff',
  },
  {
    emoji: '📤',
    phase: '输出',
    title: 'Retrieve',
    desc: '智能搜索、多粒度摘要，需要时秒级调用。',
    skills: ['smart-search', 'smart-summary'],
    color: '#00b96b',
  },
  {
    emoji: '🔄',
    phase: '维护',
    title: 'Maintain',
    desc: '自动检测过期内容，保持知识库常新常准。',
    skills: ['stale-detector'],
    color: '#f0883e',
  },
]

function DesignPhilosophy() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Design Philosophy · 个人版</p>
      <h2 className={styles.sectionTitle}>语雀 = 你的第二大脑</h2>
      <p className={styles.sectionDesc}>
        知识不该只是存着。从输入到输出，AI Skills 覆盖知识管理的完整生命周期，
        让语雀从「文档仓库」进化为「会思考的第二大脑」。
      </p>

      <div className={styles.lifecycle}>
        {phases.map((p, i) => (
          <div key={p.phase} className={styles.phaseGroup}>
            <div className={styles.phaseCard} style={{ '--phase-color': p.color } as React.CSSProperties}>
              <div className={styles.phaseHeader}>
                <span className={styles.phaseEmoji}>{p.emoji}</span>
                <div>
                  <span className={styles.phaseEn}>{p.title}</span>
                  <h3 className={styles.phaseTitle}>{p.phase}</h3>
                </div>
              </div>
              <p className={styles.phaseDesc}>{p.desc}</p>
              <div className={styles.skillTags}>
                {p.skills.map((s) => (
                  <span key={s} className={styles.skillTag}>{s}</span>
                ))}
              </div>
            </div>
            {i < phases.length - 1 && (
              <div className={styles.arrow}>→</div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.closedLoop}>
        <div className={styles.loopLine} />
        <p className={styles.loopText}>
          知识管理闭环 — 输入的知识经过加工沉淀，在需要时高效输出，持续维护保持鲜活
        </p>
      </div>
    </section>
  )
}

export default DesignPhilosophy
