import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <svg className="newspaper-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20V18H4V6ZM6 8V16H18V8H6ZM8 10H16V12H8V10ZM8 13H14V14H8V13Z" fill="currentColor"/>
          </svg>
          <span className="logo-text">News Today</span>
        </div>
        
        <nav className="header-nav">
          <a href="#top-stories" className="nav-link">Top Stories</a>
          <a href="#world" className="nav-link">World</a>
          <a href="#politics" className="nav-link">Politics</a>
          <a href="#business" className="nav-link">Business</a>
          <a href="#tech" className="nav-link">Tech</a>
          <a href="#culture" className="nav-link">Culture</a>
        </nav>

        <div className="header-actions">
          <button className="icon-button" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          <button className="icon-button" aria-label="Dark mode">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <button className="icon-button" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

