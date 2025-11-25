const app = require('./app');
const logger = require('./utils/logger');
const { connectDb } = require('./config/db');
const { port } = require('./config/env');

const start = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      logger.info({ port }, `Server running on port ${port}`);
    });
  } catch (err) {
    logger.error(err, 'Failed to start app');
    process.exit(1);
  }
};

start();
