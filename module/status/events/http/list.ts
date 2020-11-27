import { APIGatewayProxyEvent, Handler } from "aws-lambda";

import middy from "@middy/core";
import response from "@shared/lib/response";

const controller: Handler<APIGatewayProxyEvent> = async (event) => {
  return response.json(event);
};

export const handler = middy(controller);
