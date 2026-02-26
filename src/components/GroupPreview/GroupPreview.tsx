import styles from './GroupPreview.module.css'

const personalFeatures = [
  { icon: '📥', text: '碎片捕捉 & 阅读笔记' },
  { icon: '🧠', text: '笔记打磨 & 知识关联' },
  { icon: '🔍', text: '智能搜索 & 摘要输出' },
  { icon: '🔄', text: '过期检测 & 知识维护' },
]

const groupFeatures = [
  { icon: '👥', text: '团队知识库协作管理' },
  { icon: '📋', text: '经验沉淀 & 最佳实践提炼' },
  { icon: '🔗', text: '跨团队知识发现与共享' },
  { icon: '📊', text: '团队知识健康度分析' },
]

function GroupPreview() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>Editions</p>
      <h2 className={styles.sectionTitle}>个人版 & 团队版</h2>
      <p className={styles.sectionDesc}>
        个人版聚焦知识管理，团队版聚焦协作与经验沉淀。两个版本，覆盖不同场景。
      </p>

      <div className={styles.columns}>
        {/* Personal */}
        <div className={`${styles.card} ${styles.cardPersonal}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardEmoji}>🧑‍💻</span>
            <div className={styles.cardTitleGroup}>
              <h3 className={styles.cardTitle}>个人版</h3>
              <span className={`${styles.badge} ${styles.badgeActive}`}>Available</span>
            </div>
          </div>
          <p className={styles.cardDesc}>
            打造你的第二大脑。从输入到输出，AI 覆盖个人知识管理全生命周期。
          </p>
          <div className={styles.features}>
            {personalFeatures.map((f) => (
              <div key={f.text} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Group */}
        <div className={`${styles.card} ${styles.cardGroup}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardEmoji}>👥</span>
            <div className={styles.cardTitleGroup}>
              <h3 className={styles.cardTitle}>团队版</h3>
              <span className={`${styles.badge} ${styles.badgeSoon}`}>Coming Soon</span>
            </div>
          </div>
          <p className={styles.cardDesc}>
            让团队经验不再流失。AI 驱动的协作知识管理，沉淀组织智慧。
          </p>
          <div className={styles.features}>
            {groupFeatures.map((f) => (
              <div key={f.text} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GroupPreview
