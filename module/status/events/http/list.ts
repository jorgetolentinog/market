import { APIGatewayProxyEvent, Handler } from "aws-lambda";

import middy from "@middy/core";
import response from "@shared/lib/response";
import { httpJsonErrorHandler } from "@shared/middleware";

const controller: Handler<APIGatewayProxyEvent> = async (event) => {
  return response.json(event);
};

export const handler = middy(controller).use(httpJsonErrorHandler());
