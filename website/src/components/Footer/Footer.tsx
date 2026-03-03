import { useEffect, useState } from 'react'
import styles from './Footer.module.css'

function Footer() {
  const [pvCount, setPvCount] = useState<string>('')
  const [uvCount, setUvCount] = useState<string>('')

  useEffect(() => {
    // Load busuanzi counter script
    const script = document.createElement('script')
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
    script.async = true
    document.body.appendChild(script)

    // Poll for busuanzi values (it writes to DOM elements by id)
    const timer = setInterval(() => {
      const pvEl = document.getElementById('busuanzi_value_site_pv')
      const uvEl = document.getElementById('busuanzi_value_site_uv')
      if (pvEl?.innerText && pvEl.innerText !== '0') {
        setPvCount(pvEl.innerText)
        setUvCount(uvEl?.innerText || '')
        clearInterval(timer)
      }
    }, 500)

    return () => {
      clearInterval(timer)
      document.body.removeChild(script)
    }
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a
          href="https://github.com/yuque/yuque-ecosystem"
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
      {(pvCount || uvCount) && (
        <p className={styles.stats}>
          👀 {uvCount && <span>{uvCount} visitors</span>}
          {uvCount && pvCount && <span> · </span>}
          {pvCount && <span>{pvCount} views</span>}
        </p>
      )}
      {/* Hidden busuanzi elements */}
      <span id="busuanzi_value_site_pv" style={{ display: 'none' }} />
      <span id="busuanzi_value_site_uv" style={{ display: 'none' }} />
      <p className={styles.credit}>
        Built with <span className={styles.heart}>❤️</span> by yuque
      </p>
    </footer>
  )
}

export default Footer
