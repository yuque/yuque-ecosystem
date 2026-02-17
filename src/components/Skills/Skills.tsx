import styles from './Skills.module.css'

const skills = [
  {
    icon: '🔍',
    title: '智能搜索与问答',
    desc: '"我记得之前写过一篇关于 xxx 的文档" → 秒找到并总结关键内容。',
    tags: ['search_docs', 'get_doc_content', 'ai_summarize'],
  },
  {
    icon: '📝',
    title: '会议纪要归档',
    desc: '开完会丢给 AI，自动整理格式并归档到知识库对应目录。',
    tags: ['create_doc', 'update_doc', 'move_to_repo'],
  },
  {
    icon: '📊',
    title: '周报生成',
    desc: '汇总本周文档动态，一键生成结构化周报草稿。',
    tags: ['list_recent_docs', 'get_doc_content', 'create_doc'],
  },
  {
    icon: '📐',
    title: '技术方案撰写',
    desc: '给个需求描述，按团队模板自动生成方案骨架，省去重复排版。',
    tags: ['get_template', 'create_doc', 'update_doc'],
  },
  {
    icon: '🎒',
    title: '新人入职知识包',
    desc: '自动整理团队核心文档，生成入职阅读指南和学习路径。',
    tags: ['list_repo_docs', 'get_doc_content', 'create_doc'],
  },
  {
    icon: '📈',
    title: '团队知识月报',
    desc: '月底自动统计文档产出和知识沉淀趋势，量化团队知识资产。',
    tags: ['list_group_repos', 'list_recent_docs', 'create_doc'],
  },
]

function Skills() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Skills</p>
      <h2 className={styles.sectionTitle}>场景化 AI 工作流</h2>
      <p className={styles.sectionDesc}>
        每个 Skill 都是一个精心编排的工作流，将多个 Tools 组合成开箱即用的解决方案。
      </p>
      <div className={styles.grid}>
        {skills.map((s) => (
          <div key={s.title} className={styles.card}>
            <span className={styles.cardIcon}>{s.icon}</span>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.tags}>
              {s.tags.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
