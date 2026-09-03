import http from 'http';
import app from './app.js';
import env from './config/env.js';
import connectDB from './config/db.js';

const server = http.createServer(app);

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    server.listen(env.PORT, () => {
      console.log(`====================================================`);
      console.log(` PREM A TO Z INTERIOR DESIGN - REST API SERVER      `);
      console.log(`====================================================`);
      console.log(` Status: Running`);
      console.log(` Environment: ${env.NODE_ENV}`);
      console.log(` Port: ${env.PORT}`);
      console.log(` API Base: http://localhost:${env.PORT}/api`);
      console.log(` Health Check: http://localhost:${env.PORT}/api/health`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();

export default server;
