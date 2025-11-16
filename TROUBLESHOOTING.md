# Troubleshooting Guide

## Common Issues on Vercel

### Issue: "Failed to fetch news. Please check your internet connection"

This error typically occurs due to one of the following reasons:

#### 1. Environment Variable Not Set

**Problem:** The `VITE_NEWS_API_KEY` is not configured in Vercel.

**Solution:**
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name:** `VITE_NEWS_API_KEY` (or `NEWS_API_KEY`)
   - **Value:** Your actual NewsAPI key
   - **Environment:** Select all (Production, Preview, Development)
4. **Redeploy** your application (Vercel will automatically redeploy when you add environment variables)

#### 2. Serverless Function Not Working

**Problem:** The API proxy function in `/api/news.js` might not be executing correctly.

**Solution:**
1. Check Vercel function logs:
   - Go to your Vercel project dashboard
   - Click on **Functions** tab
   - Look for `/api/news` function
   - Check the logs for any errors

2. Test the function directly:
   - Visit: `https://your-app.vercel.app/api/news?category=technology`
   - You should see JSON response or an error message

#### 3. API Key Invalid or Expired

**Problem:** Your NewsAPI key might be invalid or you've exceeded the rate limit.

**Solution:**
1. Verify your API key at [newsapi.org](https://newsapi.org/)
2. Check your API usage/rate limits
3. Free tier has 100 requests/day limit
4. Make sure the key is active and not expired

#### 4. CORS Issues

**Problem:** Even with the serverless function, there might be CORS issues.

**Solution:**
- The serverless function should handle CORS automatically
- If you still see CORS errors, check the function logs
- Ensure the function is returning proper CORS headers

### How to Debug

1. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Go to Network tab to see failed requests

2. **Check Vercel Logs:**
   - Vercel Dashboard → Your Project → Functions
   - Click on `/api/news` function
   - View real-time logs

3. **Test API Endpoint Directly:**
   ```
   https://your-app.vercel.app/api/news?category=technology
   ```
   - Should return JSON with articles
   - If you see an error, check the error message

4. **Verify Environment Variables:**
   - Vercel Dashboard → Settings → Environment Variables
   - Ensure `VITE_NEWS_API_KEY` is set
   - Make sure it's added to all environments

### Quick Fix Checklist

- [ ] Environment variable `VITE_NEWS_API_KEY` is set in Vercel
- [ ] Environment variable is added to Production, Preview, and Development
- [ ] Application has been redeployed after adding environment variable
- [ ] API key is valid and active on newsapi.org
- [ ] API key hasn't exceeded rate limits
- [ ] Serverless function `/api/news.js` exists in the `api` folder
- [ ] No syntax errors in the serverless function
- [ ] Network requests are reaching the serverless function

### Testing Locally

To test if everything works locally:

1. Make sure `.env` file has your API key:
   ```env
   VITE_NEWS_API_KEY=your_key_here
   ```

2. Run the dev server:
   ```bash
   npm run dev
   ```

3. The app should work locally if the API key is correct

4. If it works locally but not on Vercel, it's likely an environment variable issue

### Still Having Issues?

1. Check the Vercel function logs for detailed error messages
2. Verify your NewsAPI account status
3. Try using a different API key to rule out key-specific issues
4. Check if there are any build errors in Vercel deployment logs

