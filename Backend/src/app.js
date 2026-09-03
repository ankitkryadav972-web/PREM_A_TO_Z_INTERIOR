import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import env from './config/env.js';
import apiRouter from './routes/index.js';
import { apiLimiter } from './middleware/rateLimiter.middleware.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// CORS configuration
const allowedOrigins = env.CLIENT_URL.split(',').map((origin) => origin.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman) or matched origin
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error('Cross-Origin Request Blocked by CORS policy.'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP Request logging
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static file serving for uploads
const uploadsPath = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Apply general rate limiter to all API endpoints
app.use('/api', apiLimiter);

// Mount API routes (supports both /api and /api/v1 for future-proofing)
app.use('/api', apiRouter);
app.use('/api/v1', apiRouter);

// Root welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to PREM A TO Z INTERIOR DESIGN REST API',
    documentation: '/backend.md',
    health: '/api/health'
  });
});

// Centralized 404 handler for unknown routes
app.use(notFoundHandler);

// Centralized Error handler
app.use(errorHandler);

export default app;
