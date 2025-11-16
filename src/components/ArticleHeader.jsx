import { Link } from 'react-router-dom'
import './ArticleHeader.css'

const ArticleHeader = ({ category = 'Technology' }) => {
  const navItems = [
    { label: 'Top Stories', value: 'Top Stories' },
    { label: 'World', value: 'World' },
    { label: 'Business', value: 'Business' },
    { label: 'Technology', value: 'Technology' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Arts', value: 'Arts' }
  ]

  return (
    <header className="article-header">
      <div className="article-header-container">
        <Link to="/" className="article-logo">
          <span className="article-logo-text">NewsToday</span>
        </Link>
        
        <nav className="article-header-nav">
          {navItems.map(item => (
            <Link 
              key={item.value}
              to="/" 
              className={`article-nav-link ${category === item.value ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="article-header-actions">
          <div className="article-search-bar">
            <svg className="article-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" className="article-search-input" placeholder="Search" />
          </div>
          <button className="article-icon-button" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <div className="article-user-avatar">
            <img src="https://i.pravatar.cc/32?img=47" alt="User" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default ArticleHeader

