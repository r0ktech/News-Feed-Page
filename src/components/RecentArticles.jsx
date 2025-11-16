import { useNavigate } from 'react-router-dom'
import './RecentArticles.css'

const RecentArticles = ({ articles }) => {
  const navigate = useNavigate()

  if (!articles || articles.length === 0) return null

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleClick = (article) => {
    localStorage.setItem(`article_${article.title}`, JSON.stringify(article))
    navigate(`/article/${encodeURIComponent(article.title)}`)
  }

  return (
    <div className="recent-articles-container">
      <div className="recent-articles-content">
        <h2 className="recent-articles-heading">Recent Articles</h2>
        <div className="recent-articles-grid">
          {articles.map((article, index) => (
            <article 
              key={index} 
              className="recent-article-card"
              onClick={() => handleClick(article)}
            >
              <div className="recent-article-image-container">
                <img 
                  src={article.urlToImage || 'https://via.placeholder.com/400x250?text=News'} 
                  alt={article.title}
                  className="recent-article-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x250?text=News'
                  }}
                />
              </div>
              <div className="recent-article-content">
                <h3 className="recent-article-title">{article.title}</h3>
                <p className="recent-article-description">
                  {article.description || article.title}
                </p>
                <p className="recent-article-date">{formatDate(article.publishedAt)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentArticles

