const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const routes = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');
const loggingMiddleware = require('./middleware/loggingMiddleware');

const app = express();

// Middlewares básicos
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Logging
app.use(loggingMiddleware);

// Rotas
app.use('/api/v1', routes);
app.use('/health', require('./routes/healthRoutes'));
app.use('/metrics', require('./routes/metricsRoutes'));

// Tratamento de erros
app.use(errorMiddleware);

module.exports = app;
