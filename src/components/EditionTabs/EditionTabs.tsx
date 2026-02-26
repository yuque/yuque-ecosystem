import { useState, type ReactNode } from 'react'
import styles from './EditionTabs.module.css'

interface EditionTabsProps {
  personalContent: ReactNode
  teamContent: ReactNode
}

function EditionTabs({ personalContent, teamContent }: EditionTabsProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'team'>('personal')

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.sectionLabel}>Editions</p>
        <h2 className={styles.sectionTitle}>个人版 & 团队版</h2>
        <p className={styles.sectionDesc}>
          个人版聚焦知识管理，团队版聚焦协作与经验沉淀。两个版本，覆盖不同场景。
        </p>
      </div>

      <div className={styles.tabBar}>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${activeTab === 'personal' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            🧑‍💻 个人版
            <span className={`${styles.tabBadge} ${styles.tabBadgeAvailable}`}>Available</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'team' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('team')}
          >
            👥 团队版
            <span className={`${styles.tabBadge} ${styles.tabBadgeSoon}`}>Coming Soon</span>
          </button>
        </div>
      </div>

      <div key={activeTab} className={styles.content}>
        {activeTab === 'personal' ? personalContent : teamContent}
      </div>
    </section>
  )
}

export default EditionTabs
