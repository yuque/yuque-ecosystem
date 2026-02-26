import styles from './ComingSoon.module.css'

const features = [
  {
    icon: '👥',
    title: '团队知识库协作管理',
    desc: '多人协作编辑、权限管理、版本追踪，让团队知识有序沉淀。',
  },
  {
    icon: '📋',
    title: '经验沉淀 & 最佳实践提炼',
    desc: 'AI 自动从项目文档中提炼最佳实践，形成可复用的经验库。',
  },
  {
    icon: '🔗',
    title: '跨团队知识发现与共享',
    desc: '打破信息孤岛，智能推荐相关团队的知识资产，促进组织协同。',
  },
  {
    icon: '📊',
    title: '团队知识健康度分析',
    desc: '可视化知识库健康状态，识别知识盲区，驱动持续改进。',
  },
]

function ComingSoon() {
  return (
    <section className={styles.section}>
      <span className={styles.icon}>🚀</span>
      <h2 className={styles.title}>团队版 · 即将到来</h2>
      <p className={styles.desc}>
        让团队经验不再流失。AI 驱动的协作知识管理，
        沉淀组织智慧，实现跨团队知识共享。
      </p>

      <div className={styles.features}>
        {features.map((f) => (
          <div key={f.title} className={styles.featureCard}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.badge}>
        ✨ 敬请期待
      </div>
    </section>
  )
}

export default ComingSoon
