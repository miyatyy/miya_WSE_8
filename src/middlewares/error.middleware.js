const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  logger.error({ err, correlationId: req.correlationId || null }, 'Unhandled error');
  const message = isProd ? 'Internal Server Error' : err.message;
  res.status(err.status || 500).json({ success: false, message });
};
