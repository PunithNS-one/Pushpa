# MicroSync - Temporary Two-Device Sync via PIN

A full-stack web application that allows users to share text between devices using a temporary 6-digit PIN. No login required, no accounts needed - everything is temporary and secure.

![MicroSync](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

- **No Authentication Required**: Share data without creating accounts or logging in
- **Temporary Storage**: Data automatically expires after a set time or first retrieval
- **One-Time Read**: PINs become invalid after the data is fetched once
- **6-Digit PIN**: Simple and secure temporary access codes
- **QR Code Support**: Easily share PINs via QR codes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Rate Limited**: Protection against brute force attacks
- **TTL Options**: Choose validity duration (5, 10, or 30 minutes)

## 🏗️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Redis** - Temporary data storage with TTL
- **express-rate-limit** - API rate limiting

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **qrcode.react** - QR code generation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Redis** (v6 or higher)

### Installing Redis

**macOS (using Homebrew):**
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
```

**Windows:**
Download from [Redis for Windows](https://github.com/microsoftarchive/redis/releases) or use Docker:
```bash
docker run -d -p 6379:6379 redis:latest
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MicroSync
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# REDIS_URL=redis://localhost:6379
# PORT=4000
# FRONTEND_URL=http://localhost:5173

# Run in development mode
npm run dev

# Or build and run in production
npm run build
npm start
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env (optional, defaults to localhost:4000)
# VITE_API_URL=http://localhost:4000

# Run in development mode
npm run dev

# Or build for production
npm run build
npm run preview
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

The backend API will be running on:
```
http://localhost:4000
```

## 📁 Project Structure

```
MicroSync/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── redisClient.ts      # Redis connection
│   │   ├── controllers/
│   │   │   └── syncController.ts   # Request handlers
│   │   ├── services/
│   │   │   └── syncService.ts      # Business logic
│   │   ├── routes/
│   │   │   └── syncRoutes.ts       # API routes
│   │   └── server.ts               # Express server
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts           # API client
│   │   ├── components/
│   │   │   ├── Layout.tsx          # App layout
│   │   │   ├── PinDisplay.tsx      # PIN display card
│   │   │   └── ErrorBanner.tsx     # Error messages
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx     # Home page
│   │   │   ├── SendPage.tsx        # Send data page
│   │   │   └── ReceivePage.tsx     # Receive data page
│   │   ├── App.tsx                 # Main app component
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
│
└── README.md
```

## 🔌 API Endpoints

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-02T10:30:00.000Z"
}
```

### Create Session
```http
POST /api/create
Content-Type: application/json

{
  "type": "text",
  "content": "Hello from Device A",
  "ttlSeconds": 600
}
```

**Response:**
```json
{
  "pin": "483921",
  "expiresIn": 600
}
```

### Fetch Session
```http
POST /api/fetch
Content-Type: application/json

{
  "pin": "483921"
}
```

**Response:**
```json
{
  "type": "text",
  "content": "Hello from Device A"
}
```

### Delete Session (Optional)
```http
POST /api/delete
Content-Type: application/json

{
  "pin": "483921"
}
```

**Response:**
```json
{
  "message": "Session deleted successfully"
}
```

## 🎯 User Flows

### Sender Flow
1. Navigate to the "Send" page
2. Enter text content
3. Select validity duration (5, 10, or 30 minutes)
4. Click "Generate PIN"
5. Share the PIN or QR code with another device

### Receiver Flow
1. Navigate to the "Receive" page
2. Enter the 6-digit PIN (or scan QR code)
3. Click "Fetch Data"
4. View the received content
5. Data is automatically deleted after retrieval

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **One-Time Read**: Data can only be retrieved once
- **Automatic Expiration**: Data deleted after TTL expires
- **No Logging**: Raw payloads are never logged
- **CORS Protection**: Only allowed origins can access the API
- **Input Validation**: All inputs are validated and sanitized
- **Size Limits**: Text limited to 10KB

## 🐳 Docker Deployment

### Build and Run Backend

```bash
cd backend
docker build -t microsync-backend .
docker run -p 4000:4000 \
  -e REDIS_URL=redis://host.docker.internal:6379 \
  -e FRONTEND_URL=http://localhost:5173 \
  microsync-backend
```

### Using Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - REDIS_URL=redis://redis:6379
      - FRONTEND_URL=http://localhost:5173
      - PORT=4000
    depends_on:
      - redis

volumes:
  redis_data:
```

Run with:
```bash
docker-compose up -d
```

## 🌐 Deployment

### Backend Deployment (Railway, Render, Fly.io)

1. Push your code to GitHub
2. Connect your repository to your deployment platform
3. Add environment variables:
   - `REDIS_URL`: Your Redis connection string
   - `FRONTEND_URL`: Your frontend URL
   - `PORT`: Port number (usually auto-configured)

### Frontend Deployment (Vercel, Netlify)

1. Push your code to GitHub
2. Connect your repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL`: Your backend API URL

## 🧪 Testing

### Backend
```bash
cd backend

# Check Redis connection
redis-cli ping
# Should return: PONG

# Test health endpoint
curl http://localhost:4000/api/health

# Test create session
curl -X POST http://localhost:4000/api/create \
  -H "Content-Type: application/json" \
  -d '{"type":"text","content":"Hello","ttlSeconds":600}'
```

### Frontend
```bash
cd frontend
npm run dev
# Open http://localhost:5173 in your browser
```

## 🐛 Troubleshooting

### Redis Connection Issues
- Ensure Redis is running: `redis-cli ping`
- Check Redis URL in `.env`
- For Docker: use `host.docker.internal` instead of `localhost`

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check browser console for specific CORS errors

### Port Already in Use
```bash
# Find process using port 4000
lsof -ti:4000 | xargs kill -9

# Or change PORT in .env
```

## 📝 Environment Variables

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

## 🛣️ Roadmap

- [x] Text sharing with PIN
- [ ] Image upload support
- [ ] Dark mode
- [ ] Multiple language support
- [ ] Pin history (optional)
- [ ] Analytics dashboard
- [ ] Mobile apps (React Native)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Inspired by services like Snapdrop and ShareDrop
- Built for hackathons and portfolio projects
- Thanks to the open-source community

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Email: your.email@example.com

---

**Made with ❤️ using TypeScript, React, and Redis**
