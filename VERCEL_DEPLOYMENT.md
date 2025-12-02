# Vercel Deployment Guide for MicroSync

## Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **Redis Database**: Get a free Redis instance from:
   - Upstash: https://upstash.com (Recommended - Free tier available)
   - Redis Cloud: https://redis.com/try-free
   - Railway: https://railway.app

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push code to GitHub** (Already done ✅)
   ```bash
   # Your code is at: https://github.com/PunithNS-one/Pushpa
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository: `PunithNS-one/Pushpa`
   - Click "Import"

3. **Configure Build Settings:**
   
   **Framework Preset:** Other
   
   **Root Directory:** `./` (leave as default)
   
   **Build Command:**
   ```bash
   cd frontend && npm install && npm run build
   ```
   
   **Output Directory:**
   ```
   frontend/dist
   ```
   
   **Install Command:**
   ```bash
   npm install
   ```

4. **Add Environment Variables:**
   
   Click "Environment Variables" and add:
   
   ```
   NODE_ENV=production
   REDIS_URL=your_redis_connection_string
   FRONTEND_URL=https://your-app.vercel.app
   PORT=3000
   ```
   
   **Get Redis URL from Upstash:**
   - Sign up at https://upstash.com
   - Create a Redis database
   - Copy the connection string (format: `redis://default:password@host:port`)

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd /Users/punithns/Desktop/Pushpalatha
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name: **microsync** (or your preferred name)
   - In which directory is your code? **./**
   - Want to override settings? **Y**
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Development Command: `npm run dev`

5. **Add environment variables:**
   ```bash
   vercel env add REDIS_URL
   # Paste your Redis connection string
   
   vercel env add FRONTEND_URL
   # Enter: https://your-app.vercel.app
   
   vercel env add NODE_ENV
   # Enter: production
   ```

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Setting Up Redis (Upstash - Free Tier)

1. **Sign up at Upstash:**
   - Go to https://console.upstash.com/login
   - Sign in with GitHub

2. **Create Redis Database:**
   - Click "Create Database"
   - Name: `microsync-prod`
   - Type: `Regional`
   - Region: Choose closest to your users
   - Click "Create"

3. **Get Connection String:**
   - Click on your database
   - Copy the "Redis URL" under "REST API"
   - Format: `redis://default:password@host:port`

4. **Add to Vercel:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add `REDIS_URL` with your Upstash connection string

## Important Notes

⚠️ **Vercel Limitations:**
- Vercel serverless functions have a 10-second execution timeout
- WebSocket connections are not supported
- Consider using Railway or Render for the backend if you need long-running processes

### Alternative: Split Deployment

**Better approach for production:**

1. **Deploy Backend to Railway/Render:**
   - Railway: https://railway.app
   - Render: https://render.com
   - Both support Node.js and long-running processes

2. **Deploy Frontend to Vercel:**
   - Static site deployment
   - Set `VITE_API_URL` to your backend URL

## Post-Deployment

1. **Test the application:**
   - Visit your Vercel URL
   - Try sending data
   - Try receiving with PIN

2. **Update CORS settings:**
   - Make sure `FRONTEND_URL` in backend matches your Vercel domain

3. **Monitor logs:**
   - Vercel Dashboard → Your Project → Functions
   - Check for any errors

4. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain

## Troubleshooting

### Redis Connection Issues
- Verify `REDIS_URL` is correct
- Check if Upstash database is active
- Ensure region is close to Vercel deployment region

### CORS Errors
- Update `FRONTEND_URL` environment variable
- Redeploy the application

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## Environment Variables Summary

Required variables for Vercel:

```env
# Backend
NODE_ENV=production
REDIS_URL=redis://default:password@host:port
FRONTEND_URL=https://your-app.vercel.app
PORT=3000

# Frontend (prefix with VITE_)
VITE_API_URL=https://your-app.vercel.app/api
```

## Next Steps

1. ✅ Set up Redis on Upstash
2. ✅ Deploy to Vercel
3. ✅ Add environment variables
4. ✅ Test the application
5. 🎉 Share your app!

---

**Your MicroSync app will be live at:** `https://your-project.vercel.app`

For better production setup, consider:
- Backend: Railway or Render (for full Node.js support)
- Frontend: Vercel (for static site)
- Database: Upstash Redis (for managed Redis)
