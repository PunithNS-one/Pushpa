# Railway Deployment Guide

## Step-by-Step Instructions

### 1. Create Railway Account
1. Go to https://railway.app
2. Click **"Login"** in the top right
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your GitHub account

### 2. Create New Project
1. Click **"New Project"** on the Railway dashboard
2. Select **"Deploy from GitHub repo"**
3. Find and select **`PunithNS-one/Pushpa`**
4. Railway will detect your repository

### 3. Configure Backend Service
1. Railway will create a service automatically
2. Click on the service to open settings
3. Go to **"Settings"** tab
4. Configure the following:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Click **"Save Changes"**

### 4. Add Redis Database
1. In your project dashboard, click **"New"**
2. Select **"Database"**
3. Choose **"Add Redis"**
4. Railway will automatically provision a Redis instance
5. The `REDIS_URL` environment variable will be automatically added to your service

### 5. Configure Environment Variables
Go to your backend service → **"Variables"** tab and add:

```
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://frontend-yn1zap0v8-punithsuresh679-1405s-projects.vercel.app
```

Note: `REDIS_URL` is automatically set by Railway when you add the Redis database.

### 6. Deploy
1. Railway will automatically deploy your backend
2. Wait for the deployment to complete (check the **"Deployments"** tab)
3. Once deployed, go to **"Settings"** → **"Networking"**
4. Click **"Generate Domain"** to get a public URL
5. Copy your backend URL (e.g., `https://pushpa-production.up.railway.app`)

### 7. Update Frontend Environment Variable
Once you have your Railway backend URL, update Vercel:

```bash
cd /Users/punithns/Desktop/Pushpalatha/frontend

# Remove old environment variable
vercel env rm VITE_API_URL production

# Add new environment variable with your Railway URL
vercel env add VITE_API_URL production
# When prompted, enter: https://your-railway-backend-url.up.railway.app

# Redeploy frontend
vercel --prod
```

### 8. Test Your Application
1. Visit your Vercel frontend URL: https://frontend-yn1zap0v8-punithsuresh679-1405s-projects.vercel.app
2. Go to **"Send"** page
3. Enter some text and click **"Generate PIN"**
4. Copy the PIN
5. Open an incognito/private window
6. Go to **"Receive"** page
7. Enter the PIN
8. Verify the data is received correctly

## Troubleshooting

### Backend Not Starting
- Check logs in Railway dashboard → your service → **"Deployments"** → Click on latest deployment
- Verify all environment variables are set correctly
- Ensure Redis database is running

### CORS Errors
- Verify `FRONTEND_URL` in Railway matches your Vercel URL exactly
- Check Railway logs for CORS-related errors

### Redis Connection Issues
- Verify Redis database is provisioned in Railway
- Check that `REDIS_URL` environment variable exists
- Restart the backend service if needed

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is set correctly in Vercel
- Check that Railway backend has a public domain generated
- Test backend health endpoint: `https://your-backend-url.up.railway.app/api/health`

## Monitoring

### Railway Dashboard
- **Metrics**: View CPU, memory, and network usage
- **Logs**: Real-time logs for debugging
- **Deployments**: History of all deployments

### Vercel Dashboard
- Go to https://vercel.com/dashboard
- Select your project
- View deployment logs and analytics

## Cost Information

**Railway Free Tier:**
- $5 free credit per month
- After that, pay-as-you-go pricing
- Typically sufficient for small projects

**Alternative Free Options:**
- **Render**: https://render.com (free tier available)
- **Fly.io**: https://fly.io (free tier available)
- **Heroku**: https://heroku.com (limited free tier)

## Support

If you encounter issues:
1. Check Railway documentation: https://docs.railway.app
2. Railway Discord: https://discord.gg/railway
3. Check GitHub Issues: https://github.com/PunithNS-one/Pushpa/issues
