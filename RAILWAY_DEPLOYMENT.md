# Railway Deployment for Backend

## Quick Deploy to Railway

1. **Sign up at Railway:**
   - Go to https://railway.app
   - Sign in with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `PunithNS-one/Pushpa`

3. **Configure Service:**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **Add Redis:**
   - In your project, click "New"
   - Select "Database" → "Redis"
   - Copy the `REDIS_URL` that's automatically generated

5. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=4000
   REDIS_URL=redis://default:password@host:port (from step 4)
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

6. **Deploy:**
   - Railway will automatically deploy
   - Copy your backend URL (e.g., `https://your-app.up.railway.app`)

7. **Update Frontend Environment:**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-app.up.railway.app`
   - Redeploy frontend

## That's it! Your full-stack app is now live! 🚀
