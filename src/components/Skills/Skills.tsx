import styles from './Skills.module.css'

const personalSkills = [
  // 📥 输入
  {
    icon: '📖',
    title: '阅读笔记',
    desc: '阅读文章后自动提取核心观点、金句、行动项，生成结构化阅读笔记。',
    tags: ['get_doc', 'create_doc', 'search'],
    category: '📥 输入',
    link: 'https://github.com/yuque/yuque-plugin/tree/main/plugins/yuque-personal/skills/reading-digest',
  },
  {
    icon: '💡',
    title: '碎片捕捉',
    desc: '随时记录灵感和想法，定期自动归类整理，合并成结构化的主题笔记。',
    tags: ['search', 'create_doc', 'update_doc'],
    category: '📥 输入',
    link: 'https://github.com/yuque/yuque-plugin/tree/main/plugins/yuque-personal/skills/daily-capture',
  },
  // 🧠 加工
  {
    icon: '✨',
    title: '笔记打磨',
    desc: '把粗糙笔记打磨成高质量文档，补充结构、优化表达、改善排版。',
    tags: ['get_doc', 'update_doc'],
    category: '🧠 加工',
    link: 'https://github.com/yuque/yuque-plugin/tree/main/plugins/yuque-personal/skills/note-refine',
  },
  {
    icon: '🕸️',
    title: '知识关联',
    desc: '分析知识库文档间的隐藏联系，建议交叉引用链接，构建知识网络。',
    tags: ['get_repo_docs', 'get_doc', 'update_doc', 'search'],
    category: '🧠 加工',
    link: 'https://github.com/yuque/yuque-plugin/tree/main/plugins/yuque-personal/skills/knowledge-connect',
  },
  {
    icon: '✍️',
    title: '风格提取',
    desc: '分析你的写作风格，生成风格画像，帮你保持一致的文风写新内容。',
    tags: ['get_repo_docs', 'get_doc', 'create_doc'],
    category: '🧠 加工',
    link: 'https://github.com/yuque/yuque-plugin/tree/main/plugins/yuque-personal/skills/style-extract',
  },
  // 📤 输出
  {
    icon: '🔍',
    title: '智能搜索',
    desc: '自然语言搜索个人知识库，秒找到并总结关键内容。',
    tags: ['search', 'get_doc'],
    category: '📤 输出',
    link: 'https://github.com/yuque/yuque-plugin/tree/main/plugins/yuque-personal/skills/smart-search',
  },
  {
    icon: '📋',
    title: '智能摘要',
    desc: '对任意文档或知识库生成不同粒度的摘要：一句话、要点、详细。',
    tags: ['get_doc', 'get_repo_docs'],
    category: '📤 输出',
    link: 'https://github.com/yuque/yuque-plugin/tree/main/plugins/yuque-personal/skills/smart-summary',
  },
  // 🔄 维护
  {
    icon: '🔎',
    title: '过期检测',
    desc: '扫描知识库发现过期文档，生成健康报告，建议更新或归档。',
    tags: ['get_repo_docs', 'get_doc', 'search'],
    category: '🔄 维护',
    link: 'https://github.com/yuque/yuque-plugin/tree/main/plugins/yuque-personal/skills/stale-detector',
  },
]

// TODO: 团队版 skills 暂时隐藏，后续恢复
// const groupSkills = [ ... ]

function Skills() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Skills</p>
      <div className={styles.titleRow}>
        <h2 className={styles.sectionTitle}>场景化 AI 工作流</h2>
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
        每个 Skill 都是一个精心编排的工作流，将多个 Tools 组合成开箱即用的解决方案。
        <br />
        覆盖知识管理全生命周期：输入 → 加工 → 输出 → 维护。
      </p>

      <div className={styles.grid}>
        {personalSkills.map((s) => (
          <div key={s.title} className={styles.card}>
            <span className={styles.cardIcon}>{s.icon}</span>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.tags}>
              {s.tags.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
            <a
              className={styles.cardLink}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              查看详情 →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
