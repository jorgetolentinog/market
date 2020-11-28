import { APIGatewayProxyEvent } from 'aws-lambda';

import middy from '@middy/core';

import { connectToDatabase } from '../lib/mongo';

export const mongo: middy.Middleware<any, APIGatewayProxyEvent> = () => ({
  before: async (handler) => {
    handler.context.callbackWaitsForEmptyEventLoop = false;
    await connectToDatabase();
  },
});
