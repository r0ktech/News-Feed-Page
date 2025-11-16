import { useNavigate } from 'react-router-dom'
import './MainArticle.css'

const MainArticle = ({ article }) => {
  const navigate = useNavigate()

  if (!article) return null

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleClick = () => {
    localStorage.setItem(`article_${article.title}`, JSON.stringify(article))
    navigate(`/article/${encodeURIComponent(article.title)}`)
  }

  return (
    <div className="main-article-container">
      <div 
        className="main-article-banner"
        style={{
          backgroundImage: article.urlToImage 
            ? `url(${article.urlToImage})` 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="main-article-overlay"></div>
        <div className="main-article-content">
          <h1 className="main-article-headline">{article.title || 'Breaking: Major Political Event Unfolds'}</h1>
          <p className="main-article-description">
            {article.description || 'A significant political event has just occurred, impacting global relations and sparking widespread discussion. Our team provides in-depth analysis and live updates as the situation develops.'}
          </p>
          <button 
            onClick={handleClick}
            className="main-article-button"
          >
            Read More
          </button>
        </div>
        <div className="main-article-watermark">NIMANEWS</div>
      </div>
    </div>
  )
}

export default MainArticle

