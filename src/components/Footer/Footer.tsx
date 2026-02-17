import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a
          href="https://github.com/chen201724/yuque-ecosystem"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/yuque-mcp"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          npm
        </a>
        <span className={styles.link}>MIT License</span>
      </div>
      <p className={styles.credit}>
        Built with <span className={styles.heart}>❤️</span> by chen201724
      </p>
    </footer>
  )
}

export default Footer
