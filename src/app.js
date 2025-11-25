const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const pinoHttp = require('pino-http');

const logger = require('./utils/logger');
const correlationId = require('./middlewares/correlationId.middleware');
const { generalLimiter } = require('./middlewares/rateLimit.middleware');

const systemRoutes = require('./routes/system.routes');
const authRoutes = require('./routes/auth.routes');
const articlesRoutes = require('./routes/articles.routes');

const openapi = fs.readFileSync(path.join(__dirname, 'docs', 'openapi.yaml'), 'utf8');

const app = express();

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(correlationId);
app.use(pinoHttp({ logger }));

// global rate limiter
app.use(generalLimiter);

// docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, { swaggerOptions: { url: '/docs/openapi.yaml' } }));
app.get('/docs/openapi.yaml', (req, res) => res.type('yaml').send(openapi));

// routes
app.use('/', systemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/articles', articlesRoutes);

// 404 + error
const notFound = require('./middlewares/notFound.middleware');
const errorHandler = require('./middlewares/error.middleware');
app.use(notFound);
app.use(errorHandler);

module.exports = app;
