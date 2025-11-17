import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import ArticleHeader from "../components/ArticleHeader";
import "../components/ArticleDetail.css";

// Get your free API key at https://newsapi.org/
// Add it to your .env file as VITE_NEWS_API_KEY for local dev
// and set `NEWS_API_KEY` in Vercel project settings for the serverless function.
const API_KEY = import.meta.env.VITE_NEWS_API_KEY || "";
const DIRECT_API_BASE_URL =
  import.meta.env.VITE_NEWS_API_BASE_URL || "https://newsapi.org/v2";
// Use the server proxy on production (Vercel). During local dev use direct NewsAPI URL.
const USE_PROXY = !import.meta.env.DEV;
const PROXY_BASE = "/api/news";

function ArticleDetail() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Ethan Carter",
      date: "July 27, 2024",
      text: "Great coverage of the conference! It's exciting to see the progress in AI and sustainable tech.",
      avatar: "https://i.pravatar.cc/40?img=12",
    },
    {
      id: 2,
      author: "Olivia Bennett",
      date: "July 27, 2024",
      text: "I agree! The focus on ethical considerations is also very important.",
      avatar: "https://i.pravatar.cc/40?img=45",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(1200);
  const [commentCount, setCommentCount] = useState(34);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to get article from localStorage first (stored when clicked)
        const storedArticle = localStorage.getItem(`article_${articleId}`);
        if (storedArticle) {
          const parsedArticle = JSON.parse(storedArticle);
          setArticle(parsedArticle);

          // Fetch related articles based on article category or source
          const category = parsedArticle.category || "technology";

          let relatedUrl = "";
          if (USE_PROXY) {
            relatedUrl = `${PROXY_BASE}?endpoint=top-headlines&category=${category}&pageSize=3`;
          } else {
            relatedUrl = `${DIRECT_API_BASE_URL}/top-headlines?category=${category}&pageSize=3&apiKey=${API_KEY}`;
          }

          const response = await axios.get(relatedUrl);

          if (response.data.articles) {
            const related = response.data.articles
              .filter(
                (a) =>
                  a.title !== parsedArticle.title && a.title !== "[Removed]"
              )
              .slice(0, 2);
            setRelatedArticles(related);
          }

          setLoading(false);
          return;
        }

        // If not in localStorage, try to fetch by searching
        let searchUrl = "";
        if (USE_PROXY) {
          searchUrl = `${PROXY_BASE}?endpoint=everything&q=${encodeURIComponent(
            articleId
          )}&pageSize=1`;
        } else {
          searchUrl = `${DIRECT_API_BASE_URL}/everything?q=${encodeURIComponent(
            articleId
          )}&pageSize=1&apiKey=${API_KEY}`;
        }

        const searchResponse = await axios.get(searchUrl);

        if (
          searchResponse.data.articles &&
          searchResponse.data.articles.length > 0
        ) {
          setArticle(searchResponse.data.articles[0]);
        } else {
          setError("Article not found");
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryFromArticle = (article) => {
    if (!article) return "News";
    const title = article.title?.toLowerCase() || "";
    const description = article.description?.toLowerCase() || "";
    const content = article.content?.toLowerCase() || "";

    if (
      title.includes("tech") ||
      description.includes("tech") ||
      title.includes("ai") ||
      description.includes("ai") ||
      content.includes("tech") ||
      content.includes("ai")
    ) {
      return "Technology";
    }
    if (
      title.includes("business") ||
      description.includes("business") ||
      content.includes("business")
    ) {
      return "Business";
    }
    if (
      title.includes("sport") ||
      description.includes("sport") ||
      content.includes("sport")
    ) {
      return "Sports";
    }
    if (
      title.includes("art") ||
      description.includes("art") ||
      content.includes("art") ||
      title.includes("culture") ||
      description.includes("culture")
    ) {
      return "Arts";
    }
    if (
      title.includes("world") ||
      description.includes("world") ||
      content.includes("world")
    ) {
      return "World";
    }
    return "Technology";
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        text: newComment,
        avatar: "https://i.pravatar.cc/40?img=47",
      };
      setComments([...comments, comment]);
      setNewComment("");
      setCommentCount(commentCount + 1);
    }
  };

  if (loading) {
    return (
      <div className="article-detail-page">
        <ArticleHeader />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-detail-page">
        <ArticleHeader />
        <div className="error-container">
          <p className="error-message">{error || "Article not found"}</p>
          <button onClick={() => navigate("/")} className="back-button">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const category = getCategoryFromArticle(article);
  const authorName =
    article.author?.replace(/^.*?\|/, "").trim() ||
    article.author ||
    "Amelia Harper";
  const publishedDate = formatDate(article.publishedAt) || "July 26, 2024";

  return (
    <div className="article-detail-page">
      <ArticleHeader />

      <div className="article-detail-container">
        <div className="article-breadcrumbs">
          <span>News</span>
          <span className="breadcrumb-separator">/</span>
          <span>{category}</span>
        </div>

        <h1 className="article-detail-headline">{article.title}</h1>

        <div className="article-meta">
          <span>By {authorName}</span>
          <span className="meta-separator">·</span>
          <span>Published on {publishedDate}</span>
        </div>

        <div className="article-main-image">
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : null}
          <div
            className="article-image-placeholder"
            style={{ display: article.urlToImage ? "none" : "block" }}
          ></div>
        </div>

        <div className="article-body">
          {article.content ? (
            <>
              {article.description && <p>{article.description}</p>}
              <p>
                {article.content
                  .replace(/\[.*?\]/g, "")
                  .replace(/<[^>]*>/g, " ")
                  .replace(/\s+/g, " ")
                  .trim()
                  .substring(0, 2000)}
                ...
              </p>
            </>
          ) : (
            <p>{article.description || "No content available."}</p>
          )}
        </div>

        <div className="article-social-bar">
          <button className="social-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>{formatNumber(likes)}</span>
          </button>
          <button className="social-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>{commentCount}</span>
          </button>
          <button className="social-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Save</span>
          </button>
          <button className="social-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>Share</span>
          </button>
        </div>

        <div className="related-articles-section">
          <h2 className="section-heading">Related Articles</h2>
          <div className="related-articles-grid">
            {relatedArticles.length > 0 ? (
              relatedArticles.map((related, index) => (
                <div key={index} className="related-article-card">
                  <div className="related-article-category">{category}</div>
                  <h3 className="related-article-title">{related.title}</h3>
                  <p className="related-article-description">
                    {related.description || related.title}
                  </p>
                  <div className="related-article-image">
                    <img
                      src={
                        related.urlToImage ||
                        "https://via.placeholder.com/200x200?text=News"
                      }
                      alt={related.title}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x200?text=News";
                      }}
                    />
                  </div>
                  <a
                    href={related.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="related-article-link"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.setItem(
                        `article_${related.title}`,
                        JSON.stringify(related)
                      );
                      navigate(`/article/${encodeURIComponent(related.title)}`);
                    }}
                  >
                    Read More
                  </a>
                </div>
              ))
            ) : (
              <>
                <div className="related-article-card">
                  <div className="related-article-category">{category}</div>
                  <h3 className="related-article-title">
                    The Future of AI: Trends and Predictions
                  </h3>
                  <p className="related-article-description">
                    Experts discuss the potential impact of AI on various
                    industries.
                  </p>
                  <div className="related-article-image">
                    <div className="related-article-placeholder"></div>
                  </div>
                  <a href="#" className="related-article-link">
                    Read More
                  </a>
                </div>
                <div className="related-article-card">
                  <div className="related-article-category">{category}</div>
                  <h3 className="related-article-title">
                    Sustainable Tech: Innovations for a Greener Future
                  </h3>
                  <p className="related-article-description">
                    Companies are developing eco-friendly solutions to reduce
                    environmental impact.
                  </p>
                  <div className="related-article-image">
                    <div className="related-article-placeholder"></div>
                  </div>
                  <a href="#" className="related-article-link">
                    Read More
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="comments-section">
          <h2 className="section-heading">Comments ({comments.length})</h2>
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="comment-avatar"
                />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="add-comment-section">
            <img
              src="https://i.pravatar.cc/40?img=47"
              alt="You"
              className="comment-avatar"
            />
            <input
              type="text"
              className="comment-input"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handlePostComment()}
            />
          </div>
          {newComment.trim() && (
            <button className="post-comment-button" onClick={handlePostComment}>
              Post Comment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
