import { useEffect, useState } from 'react'
import styles from './Footer.module.css'

const linkGroups = [
  {
    title: '产品',
    links: [
      { label: 'MCP Server', href: 'https://github.com/yuque/yuque-mcp-server' },
      { label: 'Claude Code Plugin', href: 'https://github.com/yuque/yuque-ecosystem/tree/main/plugins/yuque-personal' },
      { label: 'OpenCode / 其他客户端接入', href: 'https://github.com/yuque/yuque-ecosystem/blob/main/AGENT-INSTALL.md' },
      { label: '编辑器配置模板', href: 'https://github.com/yuque/yuque-ecosystem/tree/main/shared/mcp-config' },
    ],
  },
  {
    title: '资源',
    links: [
      { label: 'GitHub', href: 'https://github.com/yuque/yuque-ecosystem' },
      { label: 'npm: yuque-mcp', href: 'https://www.npmjs.com/package/yuque-mcp' },
      { label: '生态愿景 Blog', href: 'https://www.yuque.com/yuque/ai/yuque-ai-ecosystem-final' },
      { label: '获取 API Token', href: 'https://www.yuque.com/settings/tokens' },
    ],
  },
  {
    title: '社区',
    links: [
      { label: '问题反馈', href: 'https://github.com/yuque/yuque-ecosystem/issues' },
      { label: '参与贡献', href: 'https://github.com/yuque/yuque-ecosystem/pulls' },
      { label: '语雀官网', href: 'https://www.yuque.com' },
    ],
  },
]

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
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <span className={styles.logoMark} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 4h9.5a1 1 0 0 1 .77 1.64l-2.53 3.04A6.5 6.5 0 0 1 19 15v4a1 1 0 0 1-1 1h-6.5A6.5 6.5 0 0 1 5 13.5V4z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className={styles.brandName}>语雀 AI 生态</span>
            </div>
            <p className={styles.brandDesc}>
              让 AI 助手无缝连接语雀。开源的 MCP Server、Skills 与 Plugin 集合。
            </p>
            {(pvCount || uvCount) && (
              <p className={styles.stats}>
                {uvCount && <span>{uvCount} visitors</span>}
                {uvCount && pvCount && <span> · </span>}
                {pvCount && <span>{pvCount} views</span>}
              </p>
            )}
          </div>

          <div className={styles.linkCols}>
            {linkGroups.map((g) => (
              <div key={g.title} className={styles.linkCol}>
                <p className={styles.colTitle}>{g.title}</p>
                {g.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Hidden busuanzi elements */}
        <span id="busuanzi_value_site_pv" style={{ display: 'none' }} />
        <span id="busuanzi_value_site_uv" style={{ display: 'none' }} />

        <div className={styles.bottom}>
          <p className={styles.credit}>
            MIT License · Built with <span className={styles.heart}>❤️</span> by yuque
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
