import { useState } from 'react'
import styles from './McpTools.module.css'

interface Tool {
  name: string
  desc: string
}

interface Category {
  key: string
  label: string
  icon: string
  tools: Tool[]
}

const categories: Category[] = [
  {
    key: 'user',
    label: 'User',
    icon: '👤',
    tools: [
      { name: 'yuque_get_user', desc: '获取当前用户信息（头像、昵称、个人简介等）' },
      { name: 'yuque_list_groups', desc: '列出用户加入的所有团队/组织' },
    ],
  },
  {
    key: 'search',
    label: 'Search',
    icon: '🔍',
    tools: [
      { name: 'yuque_search', desc: '全文搜索文档、知识库，支持关键词和过滤条件' },
    ],
  },
  {
    key: 'repos',
    label: 'Repos',
    icon: '📚',
    tools: [
      { name: 'yuque_list_repos', desc: '列出指定团队或用户的所有知识库' },
      { name: 'yuque_get_repo', desc: '获取知识库详情（名称、描述、文档数等）' },
      { name: 'yuque_create_repo', desc: '创建新知识库' },
      { name: 'yuque_update_repo', desc: '更新知识库信息' },
    ],
  },
  {
    key: 'docs',
    label: 'Docs',
    icon: '📄',
    tools: [
      { name: 'yuque_list_docs', desc: '列出知识库中的所有文档' },
      { name: 'yuque_get_doc', desc: '获取文档详情和内容（Markdown/HTML）' },
      { name: 'yuque_create_doc', desc: '创建新文档' },
      { name: 'yuque_update_doc', desc: '更新文档内容或属性' },
    ],
  },
  {
    key: 'toc',
    label: 'TOC',
    icon: '🗂️',
    tools: [
      { name: 'yuque_get_toc', desc: '获取知识库的目录结构树' },
      { name: 'yuque_update_toc', desc: '更新目录结构（排序、层级调整）' },
    ],
  },
  {
    key: 'versions',
    label: 'Versions',
    icon: '🕐',
    tools: [
      { name: 'yuque_list_doc_versions', desc: '列出文档的所有历史版本' },
      { name: 'yuque_get_doc_version', desc: '获取文档某个历史版本的内容' },
    ],
  },
  {
    key: 'notes',
    label: 'Notes',
    icon: '📝',
    tools: [
      { name: 'yuque_list_notes', desc: '列出小记列表' },
      { name: 'yuque_get_note', desc: '获取小记详情' },
      { name: 'yuque_create_note', desc: '创建新小记' },
      { name: 'yuque_update_note', desc: '更新小记内容' },
    ],
  },
  {
    key: 'utility',
    label: 'Utility',
    icon: '🔧',
    tools: [
      { name: 'yuque_hello', desc: '连接测试，验证 Token 是否有效' },
    ],
  },
]

function McpTools() {
  const [activeKey, setActiveKey] = useState('user')
  const active = categories.find((c) => c.key === activeKey)!

  return (
    <section className={styles.section}>
      <p className={styles.sectionLabel}>MCP Tools</p>
      <div className={styles.titleRow}>
        <h2 className={styles.sectionTitle}>20 个标准化工具，覆盖语雀全部核心能力</h2>
        <div className={styles.titleLinks}>
          <a
            className={styles.externalLink}
            href="https://github.com/yuque/yuque-mcp-server"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub →
          </a>
          <a
            className={styles.externalLink}
            href="https://www.npmjs.com/package/yuque-mcp"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm →
          </a>
        </div>
      </div>

      <div className={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.tab} ${cat.key === activeKey ? styles.tabActive : ''}`}
            onClick={() => setActiveKey(cat.key)}
          >
            <span className={styles.tabIcon}>{cat.icon}</span>
            <span className={styles.tabLabel}>{cat.label}</span>
            <span className={styles.tabCount}>{cat.tools.length}</span>
          </button>
        ))}
      </div>

      <div className={styles.toolList}>
        {active.tools.map((tool) => (
          <div key={tool.name} className={styles.toolItem}>
            <code className={styles.toolName}>{tool.name}</code>
            <span className={styles.toolDesc}>{tool.desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default McpTools
