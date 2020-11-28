/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *   responses:
 *     Error:
 *       description: error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 */

import { APIGatewayProxyEvent } from 'aws-lambda';

import middy from '@middy/core';

import { logger } from '../lib/logger';
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
    logger.error(`http handler:`, handler.error);
    const statusCode = handler.error.statusCode || 400;
    handler.response = response.json(
      {
        message: handler.error.message,
      },
      statusCode
    );
  },
});
