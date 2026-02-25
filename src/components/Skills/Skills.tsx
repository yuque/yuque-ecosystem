import { useState } from 'react'
import styles from './Skills.module.css'

const personalSkills = [
  {
    icon: '🔍',
    title: '个人智能搜索',
    desc: '搜索个人知识库文档，自然语言提问，秒找到并总结关键内容。',
    tags: ['search_docs', 'get_doc_content'],
    link: 'https://github.com/yuque/yuque-skills/tree/main/skills/personal-search',
  },
  {
    icon: '📝',
    title: '个人会议纪要',
    desc: '开完会丢给 AI，自动整理格式并归档到个人知识库。',
    tags: ['create_doc', 'update_doc', 'list_repos'],
    link: 'https://github.com/yuque/yuque-skills/tree/main/skills/personal-meeting-notes',
  },
  {
    icon: '📊',
    title: '个人周报',
    desc: '汇总本周个人文档创建和更新动态，一键生成周报。',
    tags: ['list_docs', 'get_doc_content', 'create_doc'],
    link: 'https://github.com/yuque/yuque-skills/tree/main/skills/personal-weekly',
  },
  {
    icon: '📐',
    title: '个人技术方案',
    desc: '给个需求描述，自动生成技术方案骨架，存到个人知识库。',
    tags: ['create_doc', 'update_doc'],
    link: 'https://github.com/yuque/yuque-skills/tree/main/skills/personal-tech-design',
  },
]

const teamSkills = [
  {
    icon: '🔍',
    title: '团队智能搜索',
    desc: '搜索团队知识库，快速定位团队沉淀的文档和知识。',
    tags: ['search_docs', 'get_doc_content', 'list_group_repos'],
    link: 'https://github.com/yuque/yuque-skills/tree/main/skills/team-search',
  },
  {
    icon: '📝',
    title: '团队会议纪要',
    desc: '会议纪要自动归档到团队知识库，全员可查。',
    tags: ['create_doc', 'update_doc', 'list_group_repos'],
    link: 'https://github.com/yuque/yuque-skills/tree/main/skills/team-meeting-notes',
  },
  {
    icon: '📊',
    title: '团队周报',
    desc: '汇总团队成员文档贡献，自动生成团队周报。',
    tags: ['group_doc_stats', 'group_member_stats', 'create_doc'],
    link: 'https://github.com/yuque/yuque-skills/tree/main/skills/team-weekly',
  },
  {
    icon: '📐',
    title: '团队技术方案',
    desc: '按团队模板生成技术方案，存到团队知识库待评审。',
    tags: ['create_doc', 'update_doc', 'list_group_repos'],
    link: 'https://github.com/yuque/yuque-skills/tree/main/skills/team-tech-design',
  },
  {
    icon: '🎒',
    title: '新人入职指南',
    desc: '自动整理团队核心文档，生成入职阅读指南和学习路径。',
    tags: ['list_group_repos', 'list_docs', 'create_doc'],
    link: 'https://github.com/yuque/yuque-skills/tree/main/skills/team-onboarding',
  },
  {
    icon: '📈',
    title: '团队知识月报',
    desc: '月底自动统计文档产出和知识沉淀趋势，量化团队知识资产。',
    tags: ['group_stats', 'group_member_stats', 'create_doc'],
    link: 'https://github.com/yuque/yuque-skills/tree/main/skills/team-knowledge-report',
  },
]

type Scenario = 'personal' | 'team'

const scenarioHint: Record<Scenario, string> = {
  personal: '使用个人 Token，管理个人知识库',
  team: '使用团队 Token（旗舰版），管理团队知识库',
}

function Skills() {
  const [active, setActive] = useState<Scenario>('personal')
  const skills = active === 'personal' ? personalSkills : teamSkills

  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Skills</p>
      <div className={styles.titleRow}>
        <h2 className={styles.sectionTitle}>场景化 AI 工作流</h2>
        <a
          className={styles.externalLink}
          href="https://github.com/yuque/yuque-skills"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>
      </div>
      <p className={styles.sectionDesc}>
        每个 Skill 都是一个精心编排的工作流，将多个 Tools 组合成开箱即用的解决方案。
      </p>

      <div className={styles.tabWrapper}>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabBtn} ${active === 'personal' ? styles.tabBtnActive : ''}`}
            onClick={() => setActive('personal')}
          >
            👤 个人场景
          </button>
          <button
            className={`${styles.tabBtn} ${active === 'team' ? styles.tabBtnActive : ''}`}
            onClick={() => setActive('team')}
          >
            👥 团队场景
          </button>
        </div>
        <p className={styles.tabHint}>{scenarioHint[active]}</p>
      </div>

      <div className={styles.grid} key={active}>
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
