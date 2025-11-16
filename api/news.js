export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { query, category, country, pageSize, endpoint } = req.query

  const API_KEY = process.env.VITE_NEWS_API_KEY || process.env.NEWS_API_KEY

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    let url = ''

    if (endpoint === 'everything' && query) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=${pageSize || 20}&apiKey=${API_KEY}`
    } else {
      const categoryParam = category || 'general'
      const countryParam = country || 'us'
      url = `https://newsapi.org/v2/top-headlines?country=${countryParam}&category=${categoryParam}&pageSize=${pageSize || 20}&apiKey=${API_KEY}`
    }

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json(data)
    }

    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching news:', error)
    res.status(500).json({ error: 'Failed to fetch news' })
  }
}

