# News Feed Page

A modern, responsive news feed application built with React and Vite. Browse the latest headlines, search for news articles, filter by category, and read detailed articles with a clean, user-friendly interface.

![News Feed](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.8-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 📰 **Latest Headlines** - View breaking news and top stories
- 🔍 **Search Functionality** - Search for news articles by keywords
- 🏷️ **Category Filtering** - Filter news by categories (All, Top Stories, World, Politics, Business, Tech)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 📄 **Article Details** - Click any article to view full details with related articles
- 💬 **Comments Section** - Interactive comments section on article pages
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎨 **Modern UI** - Clean, modern design with smooth animations

## 🚀 Tech Stack

- **React 18.2.0** - UI library
- **Vite 5.0.8** - Build tool and dev server
- **React Router DOM 7.9.6** - Client-side routing
- **Axios 1.6.0** - HTTP client for API requests
- **NewsAPI** - News data source

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- A **NewsAPI key** (free at [newsapi.org](https://newsapi.org/))

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd "News feed page"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit the `.env` file and add your NewsAPI key:

```env
# News API Configuration
# Get your free API key at https://newsapi.org/
VITE_NEWS_API_KEY=your_actual_api_key_here
VITE_NEWS_API_BASE_URL=https://newsapi.org/v2
```

**Note:** Replace `your_actual_api_key_here` with your actual NewsAPI key.

### 4. Get Your NewsAPI Key

1. Visit [newsapi.org](https://newsapi.org/)
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Paste it into your `.env` file

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### 6. Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

### 7. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
News feed page/
├── api/
│   └── news.js              # Vercel serverless function (API proxy)
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Main navigation header
│   │   ├── SearchBar.jsx    # Search input component
│   │   ├── CategoryNav.jsx  # Category navigation
│   │   ├── MainArticle.jsx   # Featured article banner
│   │   ├── RecentArticles.jsx # Article grid component
│   │   ├── Footer.jsx       # Footer component
│   │   ├── ArticleHeader.jsx # Article page header
│   │   └── *.css            # Component styles
│   ├── pages/
│   │   ├── HomePage.jsx     # Home page with news feed
│   │   └── ArticleDetail.jsx # Individual article page
│   ├── App.jsx              # Main app component with routing
│   ├── App.css              # Global app styles
│   ├── main.jsx             # Application entry point
│   └── index.css            # Base styles
├── .env                     # Environment variables (not committed)
├── .env.example             # Environment variables template
├── vercel.json              # Vercel deployment configuration
├── vite.config.js           # Vite configuration
├── package.json             # Project dependencies
└── README.md                # This file
```

## 🌐 Deployment

### Deploy to Vercel

This project is configured for easy deployment on Vercel:

1. **Push to GitHub** - Ensure your code is in a Git repository
2. **Import to Vercel** - Go to [vercel.com](https://vercel.com) and import your repository
3. **Add Environment Variables**:
   - In Vercel dashboard → Settings → Environment Variables
   - Add `VITE_NEWS_API_KEY` with your NewsAPI key
   - Select all environments (Production, Preview, Development)
4. **Deploy** - Click deploy and wait for the build to complete

The project includes:

- ✅ Serverless API proxy to handle CORS issues
- ✅ React Router SPA routing configuration
- ✅ Environment variable support

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## 🎯 Usage

### Home Page

- Browse the latest headlines in the main article banner
- Use the search bar to find specific news topics
- Click category buttons to filter by topic
- Click on any article card to read the full article

### Article Detail Page

- View the full article content
- Read related articles
- Interact with the article (like, comment, save, share)
- Add your own comments

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📝 Environment Variables

| Variable                 | Description                                        | Required |
| ------------------------ | -------------------------------------------------- | -------- |
| `VITE_NEWS_API_KEY`      | Your NewsAPI key                                   | Yes      |
| `VITE_NEWS_API_BASE_URL` | NewsAPI base URL (default: https://newsapi.org/v2) | No       |
| `VITE_API_BASE_URL`      | API proxy endpoint (default: /api/news)            | No       |

## ⚠️ Important Notes

- **API Rate Limits**: The free NewsAPI tier has rate limits (100 requests/day for development)
- **CORS**: The project uses a serverless function proxy to avoid CORS issues in production
- **API Key Security**: Never commit your `.env` file. It's already in `.gitignore`

## 🐛 Troubleshooting

### API Key Issues

- Ensure your API key is correctly set in the `.env` file
- Verify the key is active on newsapi.org
- Check for typos or extra spaces

### CORS Errors

- In production, the serverless function handles CORS automatically
- For local development, ensure you're using the proxy endpoint

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires v16+)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org/) for providing news data
- [Vite](https://vitejs.dev/) for the excellent build tool
- [React](https://react.dev/) for the UI library

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for deployment-specific help
3. Open an issue on Github
