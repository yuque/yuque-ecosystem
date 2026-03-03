import { useState, useRef, useCallback, type ReactNode } from 'react'
import styles from './CodeBlock.module.css'

interface CodeBlockProps {
  children: ReactNode
  className?: string
}

function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleCopy = useCallback(() => {
    if (!ref.current) return
    const text = ref.current.innerText
      .replace(/^#.*$/gm, (line) => line) // keep comment lines as-is
      .trim()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [])

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <div ref={ref} className={styles.code}>
        {children}
      </div>
      <button
        className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
        onClick={handleCopy}
        aria-label="复制代码"
        type="button"
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 11V3C3 2.44772 3.44772 2 4 2H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </button>
    </div>
  )
}

export default CodeBlock
