import { APIGatewayProxyEvent, Context } from "aws-lambda";

import response from "@shared/lib/response";

export const handler = async (
  _event: APIGatewayProxyEvent,
  _context: Context
) => {
  return response.json({});
};
