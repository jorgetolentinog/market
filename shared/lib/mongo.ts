import mongoose from 'mongoose';

import config from '@module/config';

import { logger } from './logger';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    logger.info("using existing database connection");
    return;
  }

  logger.info("using new database connection");
  await mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    connectTimeoutMS: 5000,
    // Buffering means mongoose will queue up operations if it gets
    // disconnected from MongoDB and send them when it reconnects.
    // With serverless, better to fail fast if not connected.
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0, // and MongoDB driver buffering
  });
};
