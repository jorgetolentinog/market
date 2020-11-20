import { APIGatewayProxyEvent, Handler } from "aws-lambda";

import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import response from "@shared/lib/response";
import { httpJsonErrorHandler, mongo } from "@shared/middleware";

import { Product } from "../../models";

const controller: Handler<APIGatewayProxyEvent> = async () => {
  await Product.create({ title: "demo", date: new Date() });
  const items = await Product.find();

  return response.json(items);
};

export const handler = middy(controller)
  .use(mongo())
  .use(httpJsonBodyParser())
  .use(httpJsonErrorHandler());
