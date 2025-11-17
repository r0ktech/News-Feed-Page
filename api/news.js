import axios from "axios";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { endpoint, country, category, q, pageSize, sortBy } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    let url = `https://newsapi.org/v2/${endpoint}?apiKey=${apiKey}`;

    if (endpoint === "top-headlines") {
      if (country) url += `&country=${country}`;
      if (category) url += `&category=${category}`;
    } else if (endpoint === "everything") {
      if (q) url += `&q=${encodeURIComponent(q)}`;
      if (sortBy) url += `&sortBy=${sortBy}`;
    }

    if (pageSize) url += `&pageSize=${pageSize}`;

    const response = await axios.get(url);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("News API Error:", error.message);

    if (error.response?.status === 401) {
      return res.status(401).json({ error: "Invalid API key" });
    } else if (error.response?.status === 429) {
      return res.status(429).json({ error: "API rate limit exceeded" });
    } else {
      return res.status(500).json({ error: "Failed to fetch news" });
    }
  }
}
