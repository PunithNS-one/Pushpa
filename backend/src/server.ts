import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { connectRedis } from './config/redisClient';
import syncRoutes from './routes/syncRoutes';

const app = express();

// Trust proxy for Railway deployment
app.set('trust proxy', 1);

// Force production environment if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

// Force FRONTEND_URL if Railway environment detected
if (process.env.RAILWAY_ENVIRONMENT && !process.env.FRONTEND_URL) {
  process.env.FRONTEND_URL = 'https://frontend-kta6e8cfa-punithsuresh679-1405s-projects.vercel.app';
}

// Debug: Log environment variables
console.log('🔍 Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('REDIS_URL:', process.env.REDIS_URL ? 'SET' : 'NOT SET');

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Rate limiting to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sync routes
app.use('/api', syncRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = parseInt(process.env.PORT || '4000', 10);
const HOST = process.env.HOST || '0.0.0.0';

// Start server
async function startServer() {
  try {
    // Connect to Redis
    await connectRedis();

    app.listen(PORT, HOST, () => {
      console.log(`✓ MicroSync backend running on http://${HOST}:${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✓ CORS enabled for: ${corsOptions.origin}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
