import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createRoutes } from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS - allow viewer and local dev servers
app.use(cors({
  origin: [
    'https://thepaulrayner.com',
    'https://paulrayner.github.io',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003'
  ],
  credentials: true
}));

app.use(express.json());

// API routes
app.use('/api', createRoutes());

/**
 * Root endpoint - API metadata
 */
app.get('/', (req: Request, res: Response) => {
  res.json({
    service: 'CodeCohesion API',
    version: '1.0.0',
    docs: 'https://github.com/paulrayner/codecohesion/tree/main/docs/api'
  });
});

/**
 * Health check endpoint
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/**
 * 404 handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

/**
 * 500 error handler
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: err.message
  });
});

app.listen(PORT, () => {
  console.log(`CodeCohesion API running on port ${PORT}`);
});
