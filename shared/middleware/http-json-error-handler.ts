import { APIGatewayProxyEvent } from 'aws-lambda';

import middy from '@middy/core';

import response from '../lib/response';

type HttpHandlerLambda = middy.HandlerLambda & {
  error: Error & {
    statusCode?: number;
  };
};

export const httpJsonErrorHandler: middy.Middleware<
  any,
  APIGatewayProxyEvent
> = () => ({
  onError: async (handler: HttpHandlerLambda) => {
    const statusCode = handler.error.statusCode || 400;
    handler.response = response.json(
      {
        error: handler.error.message,
      },
      statusCode
    );
  },
});
