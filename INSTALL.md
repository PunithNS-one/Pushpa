# 🎯 MicroSync - Installation & First Run

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js v18+** installed ([Download](https://nodejs.org/))
- [ ] **npm** or **yarn** package manager
- [ ] **Redis** installed and running
- [ ] **Terminal** access
- [ ] **Modern web browser** (Chrome, Firefox, Safari, Edge)

## Installation Steps

### Step 1: Verify Prerequisites

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check Redis installation
redis-cli --version

# Test Redis connection
redis-cli ping
# Expected output: PONG
```

If Redis isn't running:
```bash
# macOS
brew services start redis

# Linux
sudo systemctl start redis-server

# Docker
docker run -d -p 6379:6379 --name microsync-redis redis:latest
```

### Step 2: Navigate to Project

```bash
cd /Users/punithns/Desktop/Pushpalatha
```

### Step 3: Quick Setup (Recommended)

```bash
# Make setup script executable (if not already)
chmod +x setup.sh

# Run automated setup
./setup.sh
```

This will:
- ✅ Check Node.js and Redis
- ✅ Create .env files
- ✅ Install backend dependencies
- ✅ Install frontend dependencies

### Step 4: Start the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

Expected output:
```
✓ Redis connected successfully
✓ MicroSync backend running on http://localhost:4000
✓ Environment: development
✓ CORS enabled for: http://localhost:5173
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

Expected output:
```
  VITE v5.0.10  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 5: Open the Application

Open your browser and go to:
```
http://localhost:5173
```

## 🧪 First Test

### Send Data

1. Click **"Send Data"** on the homepage
2. Enter text: `Hello from my first sync!`
3. Select duration: **10 minutes**
4. Click **"Generate PIN"**
5. Copy the 6-digit PIN (e.g., `483921`)

### Receive Data

1. Open a **new incognito/private window**
2. Go to `http://localhost:5173/receive`
3. Enter the PIN you copied
4. Click **"Fetch Data"**
5. See your message appear! ✨

## Alternative Installation Methods

### Manual Installation

If the setup script doesn't work, install manually:

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed
npm run dev
```

### Docker Installation

```bash
# Start Redis and Backend with Docker Compose
docker-compose up -d

# Start Frontend separately
cd frontend
npm install
npm run dev
```

## Environment Configuration

### Backend Environment (.env)

Located at: `backend/.env`

```env
PORT=4000
NODE_ENV=development
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment (.env)

Located at: `frontend/.env`

```env
VITE_API_URL=http://localhost:4000
```

## Troubleshooting

### ❌ Redis Connection Error

**Error:** `Redis Client Error: connect ECONNREFUSED`

**Solution:**
```bash
# Start Redis
brew services start redis  # macOS
sudo systemctl start redis-server  # Linux
docker start microsync-redis  # Docker
```

### ❌ Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::4000`

**Solution:**
```bash
# Find and kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Or change PORT in backend/.env
```

### ❌ Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### ❌ CORS Error in Browser

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Check `FRONTEND_URL` in `backend/.env`
2. Ensure it matches your frontend URL
3. Restart backend server

### ❌ TypeScript Errors

**Error:** `error TS2307: Cannot find module`

**Solution:**
```bash
cd backend  # or frontend
npm install --save-dev @types/node @types/express
```

## Verification Checklist

After installation, verify:

- [ ] Backend running on http://localhost:4000
- [ ] Frontend running on http://localhost:5173
- [ ] Redis is connected (check backend logs)
- [ ] Can create a PIN on Send page
- [ ] Can fetch data on Receive page
- [ ] QR code displays correctly
- [ ] Copy PIN button works
- [ ] Error messages display properly

## Testing API Directly

### Health Check
```bash
curl http://localhost:4000/api/health
```

Expected:
```json
{"status":"ok","timestamp":"2025-12-02T..."}
```

### Create Session
```bash
curl -X POST http://localhost:4000/api/create \
  -H "Content-Type: application/json" \
  -d '{
    "type": "text",
    "content": "Test message",
    "ttlSeconds": 600
  }'
```

Expected:
```json
{"pin":"123456","expiresIn":600}
```

### Fetch Session
```bash
curl -X POST http://localhost:4000/api/fetch \
  -H "Content-Type: application/json" \
  -d '{"pin":"123456"}'
```

Expected:
```json
{"type":"text","content":"Test message"}
```

## Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Next Steps

1. ✅ Installation complete
2. 📱 Test on mobile devices
3. 🎨 Customize the UI
4. 🚀 Deploy to production (see README.md)
5. 🤝 Contribute features (see CONTRIBUTING.md)

## Getting Help

- 📖 Read [README.md](README.md) for detailed documentation
- 🚀 Check [QUICKSTART.md](QUICKSTART.md) for quick reference
- 🐛 Open an issue on GitHub for bugs
- 💡 Review [CONTRIBUTING.md](CONTRIBUTING.md) for feature requests

---

**Congratulations! MicroSync is now running! 🎉**

Start syncing data between your devices with just a PIN!
