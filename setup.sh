#!/bin/bash

# MicroSync Setup Script
echo "🚀 MicroSync Setup Script"
echo "========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "✓ Node.js $(node -v) detected"

# Check if Redis is installed and running
if ! command -v redis-cli &> /dev/null; then
    echo "⚠️  Redis CLI not found. Please install Redis."
    echo "   macOS: brew install redis && brew services start redis"
    echo "   Ubuntu: sudo apt install redis-server"
    exit 1
fi

if ! redis-cli ping &> /dev/null; then
    echo "⚠️  Redis is not running. Starting Redis..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew services start redis
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo systemctl start redis-server
    fi
    sleep 2
fi

echo "✓ Redis is running"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created"
fi

echo "Installing dependencies..."
npm install
echo "✓ Backend dependencies installed"
echo ""

# Frontend Setup
echo "📦 Setting up Frontend..."
cd ../frontend

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created"
fi

echo "Installing dependencies..."
npm install
echo "✓ Frontend dependencies installed"
echo ""

cd ..

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Review and update .env files if needed:"
echo "      - backend/.env"
echo "      - frontend/.env"
echo ""
echo "   2. Start the backend (in one terminal):"
echo "      cd backend && npm run dev"
echo ""
echo "   3. Start the frontend (in another terminal):"
echo "      cd frontend && npm run dev"
echo ""
echo "   4. Open http://localhost:5173 in your browser"
echo ""
echo "🎉 Happy coding!"
