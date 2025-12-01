# MicroSync - Quick Start Guide

## Prerequisites Installation

### 1. Install Node.js
Visit https://nodejs.org/ and download Node.js v18 or higher.

Verify installation:
```bash
node --version
npm --version
```

### 2. Install Redis

**macOS:**
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**Windows:**
Use WSL2 or Docker:
```bash
docker run -d -p 6379:6379 --name redis redis:latest
```

Verify Redis:
```bash
redis-cli ping
# Should return: PONG
```

## Installation

### Option 1: Automated Setup (Recommended)

```bash
# Clone or navigate to the project
cd Pushpalatha

# Run the setup script
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Open http://localhost:5173 in your browser.

### Production Mode

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Testing the Application

### 1. Send Data

1. Go to http://localhost:5173
2. Click "Send Data"
3. Enter some text (e.g., "Hello from Device A")
4. Choose validity duration (10 minutes recommended)
5. Click "Generate PIN"
6. Copy the 6-digit PIN

### 2. Receive Data

Option A - Same Browser:
1. Open a new incognito/private window
2. Go to http://localhost:5173/receive
3. Enter the PIN
4. Click "Fetch Data"

Option B - Different Device:
1. Scan the QR code or share the link
2. Enter the PIN on the other device
3. Retrieve the data

## Common Issues

### Redis Connection Error
```bash
# Check if Redis is running
redis-cli ping

# If not running:
# macOS:
brew services start redis

# Linux:
sudo systemctl start redis-server

# Docker:
docker start redis
```

### Port Already in Use
```bash
# Find and kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Or change PORT in backend/.env
```

### CORS Errors
Ensure `FRONTEND_URL` in `backend/.env` matches your frontend URL:
```
FRONTEND_URL=http://localhost:5173
```

### Module Not Found
```bash
# Clean install
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables

### Backend (.env)
```env
PORT=4000
NODE_ENV=development
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000
```

## API Testing with curl

### Health Check
```bash
curl http://localhost:4000/api/health
```

### Create Session
```bash
curl -X POST http://localhost:4000/api/create \
  -H "Content-Type: application/json" \
  -d '{
    "type": "text",
    "content": "Hello World",
    "ttlSeconds": 600
  }'
```

### Fetch Session
```bash
curl -X POST http://localhost:4000/api/fetch \
  -H "Content-Type: application/json" \
  -d '{"pin": "123456"}'
```

## Next Steps

1. ✅ Verify Redis is running
2. ✅ Install dependencies (both backend and frontend)
3. ✅ Start backend server
4. ✅ Start frontend dev server
5. ✅ Test the application
6. 🚀 Deploy to production (optional)

## Deployment

### Backend (Railway/Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set `VITE_API_URL` environment variable
5. Deploy

## Support

If you encounter issues:
1. Check the console for errors
2. Verify Redis is running
3. Ensure all dependencies are installed
4. Check environment variables
5. Review the logs

For more help, refer to the main [README.md](../README.md)

---

**Happy Syncing! 🚀**
