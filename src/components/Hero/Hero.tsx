import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.gridBg} />
      <div className={styles.glowOrb} />
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Open Source · MIT License
        </div>
        <h1 className={styles.title}>Yuque AI Ecosystem</h1>
        <p className={styles.subtitle}>
          让 AI 助手无缝连接语雀，释放知识的力量
        </p>
        <div className={styles.actions}>
          <a
            href="#quick-start"
            className={styles.btnPrimary}
          >
            <svg className={styles.btnIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L3 7v6l7 4 7-4V7l-7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M3 7l7 4m0 0l7-4m-7 4v7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Get Started
          </a>
          <a
            href="https://github.com/yuque/yuque-ecosystem"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            <svg className={styles.btnIcon} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 1.667A8.333 8.333 0 0 0 7.367 17.9c.416.077.569-.18.569-.4v-1.403c-2.312.502-2.8-1.114-2.8-1.114-.378-.962-.924-1.218-.924-1.218-.755-.516.057-.506.057-.506.835.059 1.275.858 1.275.858.742 1.272 1.947.905 2.422.692.075-.538.29-.905.528-1.113-1.845-.21-3.784-.923-3.784-4.107 0-.907.324-1.65.856-2.23-.086-.21-.371-1.055.081-2.2 0 0 .698-.223 2.286.852A7.96 7.96 0 0 1 10 5.14a7.96 7.96 0 0 1 2.084.28c1.586-1.075 2.283-.852 2.283-.852.453 1.145.168 1.99.082 2.2.533.58.855 1.323.855 2.23 0 3.193-1.943 3.894-3.793 4.1.298.257.564.764.564 1.54v2.284c0 .222.15.48.573.399A8.333 8.333 0 0 0 10 1.667z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
