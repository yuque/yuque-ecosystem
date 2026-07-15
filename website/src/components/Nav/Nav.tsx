import { useEffect, useState } from 'react'
import styles from './Nav.module.css'
import yuqueLogo from '../../assets/yuque-logo.svg'

const links = [
  { href: '#architecture', label: '架构' },
  { href: '#tools', label: 'MCP Tools' },
  { href: '#skills', label: 'Skills' },
  { href: '#quick-start', label: '快速开始' },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>
          <span className={styles.logoMark} aria-hidden="true">
            <img src={yuqueLogo} alt="" />
          </span>
          <span className={styles.brandName}>语雀 AI 生态</span>
        </a>

        <nav className={styles.links} aria-label="页面导航">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            href="https://www.npmjs.com/package/yuque-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLink}
          >
            npm
          </a>
          <a
            href="https://github.com/yuque/yuque-ecosystem"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubBtn}
          >
            <svg className={styles.githubIcon} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 1.667A8.333 8.333 0 0 0 7.367 17.9c.416.077.569-.18.569-.4v-1.403c-2.312.502-2.8-1.114-2.8-1.114-.378-.962-.924-1.218-.924-1.218-.755-.516.057-.506.057-.506.835.059 1.275.858 1.275.858.742 1.272 1.947.905 2.422.692.075-.538.29-.905.528-1.113-1.845-.21-3.784-.923-3.784-4.107 0-.907.324-1.65.856-2.23-.086-.21-.371-1.055.081-2.2 0 0 .698-.223 2.286.852A7.96 7.96 0 0 1 10 5.14a7.96 7.96 0 0 1 2.084.28c1.586-1.075 2.283-.852 2.283-.852.453 1.145.168 1.99.082 2.2.533.58.855 1.323.855 2.23 0 3.193-1.943 3.894-3.793 4.1.298.257.564.764.564 1.54v2.284c0 .222.15.48.573.399A8.333 8.333 0 0 0 10 1.667z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}

export default Nav
