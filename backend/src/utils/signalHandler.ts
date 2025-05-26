import mongoose from 'mongoose';
import type { Server } from 'http';

const setupSignalHandlers = (server: Server): void => {
  const shutdown = async (signal: string): Promise<void> => {
    console.log(`\n${signal} signal received. Starting graceful shutdown...`);
    
    // Close server first to stop accepting new connections
    server.close(() => {
      console.log('Server closed');
    });

    // Close MongoDB connection
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
    }

    // Exit process
    process.exit(0);
  };

  // Handle different termination signals
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    shutdown('UNCAUGHT_EXCEPTION');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    shutdown('UNHANDLED_REJECTION');
  });
};

export default setupSignalHandlers; 