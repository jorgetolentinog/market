import { logger } from "./logger";
import { connect, connection, connections, Mongoose } from "mongoose";

let cachedConn: Mongoose;

export const connectToDatabase = async () => {
  connection
    // Reject if an error occurred when trying to connect to MongoDB
    .on("error", (error) => {
      logger.error("connection to db failed");
      throw error;
    })
    // Exit Process if there is no longer a Database Connection
    .on("close", () => {
      logger.error("connection to db lost");
      // process.exit(1);
      throw new Error("MongoDB connection to db lost");
    })
    // Connected to DB
    .once("open", () => {
      // Display connection information
      connections.map((info) =>
        logger.info(`connected to db ${info.host}:${info.port}/${info.name}`)
      );
      // Return successful promise
      return cachedConn;
    });

  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  // See https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/
  // https://mongoosejs.com/docs/lambda.html
  if (!cachedConn) {
    // Because `cachedConn` is in the global scope, Lambda may retain it between
    // function calls thanks to `callbackWaitsForEmptyEventLoop`.
    // This means our Lambda function doesn't have to go through the
    // potentially expensive process of connecting to MongoDB every time.
    cachedConn = await connect(
      "mongodb://localhost:27017/myapp",
      // "mongodb+srv://dbUser:dt2VuElSEr21BffF@cluster0.boziw.mongodb.net/market-dev?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        connectTimeoutMS: 10000,
        // Buffering means mongoose will queue up operations if it gets
        // disconnected from MongoDB and send them when it reconnects.
        // With serverless, better to fail fast if not connected.
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0, // and MongoDB driver buffering
      }
    );
  } else {
    logger.info("using cached database instance");
    return cachedConn;
  }
};
