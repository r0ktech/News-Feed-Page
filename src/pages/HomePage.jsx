import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryNav from "../components/CategoryNav";
import MainArticle from "../components/MainArticle";
import RecentArticles from "../components/RecentArticles";
import Footer from "../components/Footer";

// Get your free API key at https://newsapi.org/
// Add it to your .env file as VITE_NEWS_API_KEY
const API_KEY = import.meta.env.VITE_NEWS_API_KEY || "";
const API_BASE_URL =
  import.meta.env.VITE_NEWS_API_BASE_URL || "https://newsapi.org/v2";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [mainArticle, setMainArticle] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = {
    all: "general",
    "top-stories": "general",
    world: "general",
    politics: "general",
    business: "business",
    tech: "technology",
  };

  const fetchNews = async (query = "", category = "all") => {
    setLoading(true);
    setError(null);

    try {
      let url = "";

      if (query) {
        url = `${API_BASE_URL}/everything?q=${encodeURIComponent(
          query
        )}&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
      } else {
        const categoryParam = categories[category] || "general";
        url = `${API_BASE_URL}/top-headlines?country=us&category=${categoryParam}&pageSize=20&apiKey=${API_KEY}`;
      }

      const response = await axios.get(url);

      if (response.data.articles && response.data.articles.length > 0) {
        const fetchedArticles = response.data.articles.filter(
          (article) => article.title !== "[Removed]"
        );
        setArticles(fetchedArticles);

        // Set main article (first one)
        setMainArticle(fetchedArticles[0]);

        // Set recent articles (next 6)
        setRecentArticles(fetchedArticles.slice(1, 7));
      } else {
        setError("No articles found");
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      if (err.response?.status === 401) {
        setError(
          "Invalid API key. Please add your NewsAPI key to the .env file as VITE_NEWS_API_KEY"
        );
      } else if (err.response?.status === 429) {
        setError("API rate limit exceeded. Please try again later.");
      } else {
        setError(
          "Failed to fetch news. Please check your internet connection."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(searchQuery, selectedCategory);
  }, [selectedCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchNews(query, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  return (
    <div className="app">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <CategoryNav
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading news...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <MainArticle article={mainArticle} />
          <RecentArticles articles={recentArticles} />
        </>
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
