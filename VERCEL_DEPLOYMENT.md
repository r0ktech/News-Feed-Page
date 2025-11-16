# Vercel Deployment Guide

This project is configured to deploy smoothly on Vercel. Here's what you need to know:

## ✅ What's Already Configured

1. **Vercel Configuration** (`vercel.json`):
   - React Router SPA routing configured
   - API proxy endpoint set up

2. **Serverless Function** (`api/news.js`):
   - Handles NewsAPI requests server-side to avoid CORS issues
   - Keeps your API key secure (not exposed to client)

3. **Environment Variables**:
   - Code is set up to use environment variables
   - API key is handled server-side

## 🚀 Deployment Steps

### 1. Push to GitHub/GitLab/Bitbucket

Make sure your code is in a Git repository.

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect it's a Vite project

### 3. Configure Environment Variables

**Important:** You must add your NewsAPI key in Vercel's dashboard:

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add the following variable:
   - **Name:** `VITE_NEWS_API_KEY` (or `NEWS_API_KEY`)
   - **Value:** Your actual NewsAPI key from [newsapi.org](https://newsapi.org/)
   - **Environment:** Select all (Production, Preview, Development)

### 4. Deploy

Click "Deploy" and wait for the build to complete!

## ✅ Why This Setup Works

1. **CORS Issue Solved**: NewsAPI blocks direct browser requests. The serverless function acts as a proxy, making requests from the server where CORS doesn't apply.

2. **API Key Security**: Your API key is stored in Vercel's environment variables and only used server-side, never exposed to the client.

3. **SPA Routing**: The `vercel.json` configuration ensures all routes are handled by React Router.

## 🔧 Local Development

For local development, you can:

1. Use the `.env` file (already configured)
2. Or run the Vercel dev server: `vercel dev` (requires Vercel CLI)

The code will automatically use `/api/news` in production and can fall back to direct API calls in development if needed.

## 📝 Notes

- The free tier of NewsAPI has rate limits (100 requests/day for development)
- For production, consider upgrading to a paid plan
- The serverless function handles CORS headers automatically

## 🐛 Troubleshooting

If you encounter issues:

1. **API Key Error**: Make sure `VITE_NEWS_API_KEY` is set in Vercel environment variables
2. **CORS Errors**: The serverless function should handle this, but if you see CORS errors, check the function logs
3. **Routing Issues**: Ensure `vercel.json` is in the root directory


