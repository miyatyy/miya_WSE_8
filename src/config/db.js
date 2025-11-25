const mongoose = require('mongoose');
const { dbUri } = require('./env');

const connectDb = async () => {
  if (!dbUri) throw new Error('DB_URI is not defined in env');
  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return mongoose.connection;
};

module.exports = { connectDb };
