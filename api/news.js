export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { query, category, country, pageSize, endpoint } = req.query

    // Get API key from environment variables (try both naming conventions)
    const API_KEY = process.env.VITE_NEWS_API_KEY || process.env.NEWS_API_KEY

    if (!API_KEY) {
      console.error('API key not found in environment variables')
      return res.status(500).json({ 
        error: 'API key not configured',
        message: 'Please set VITE_NEWS_API_KEY or NEWS_API_KEY in Vercel environment variables'
      })
    }

    // Build the NewsAPI URL
    let url = ''

    if (endpoint === 'everything' && query) {
      // Search endpoint
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=${pageSize || 20}&apiKey=${API_KEY}`
    } else {
      // Top headlines endpoint
      const categoryParam = category || 'general'
      const countryParam = country || 'us'
      url = `https://newsapi.org/v2/top-headlines?country=${countryParam}&category=${categoryParam}&pageSize=${pageSize || 20}&apiKey=${API_KEY}`
    }

    console.log('Fetching from NewsAPI:', url.replace(API_KEY, 'API_KEY_HIDDEN'))

    // Fetch from NewsAPI
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
      console.error('NewsAPI error:', response.status, errorData)
      return res.status(response.status).json({
        error: 'NewsAPI request failed',
        status: response.status,
        details: errorData
      })
    }

    const data = await response.json()
    
    // Return the data
    res.status(200).json(data)
  } catch (error) {
    console.error('Error in serverless function:', error)
    res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error.message,
      details: 'Check serverless function logs for more details'
    })
  }
}

