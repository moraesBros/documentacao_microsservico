const app = require('./app');
const logger = require('./config/logger');
const { connectDatabase } = require('./config/database');
const { connectRabbitMQ } = require('./config/rabbitmq');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Conectar ao banco de dados
    await connectDatabase();
    logger.info('Database connected successfully');

    // Conectar ao RabbitMQ
    await connectRabbitMQ();
    logger.info('RabbitMQ connected successfully');

    // Iniciar servidor
    app.listen(PORT, () => {
      logger.info(`Order Service running on port ${PORT}`);
      logger.info(`Health check available at http://localhost:${PORT}/health`);
      logger.info(`API Documentation at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Tratamento de sinais de término
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

startServer();
