/**
 * @swagger
 * /product:
 *   get:
 *     description: Devuelve lista de productos
 *     tags:
 *       - Product
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Product'
 */

import { APIGatewayProxyEvent, Handler } from "aws-lambda";

import middy from "@middy/core";
import response from "@shared/lib/response";
import { httpJsonErrorHandler, mongo } from "@shared/middleware";

import { Product } from "../../models";

const controller: Handler<APIGatewayProxyEvent> = async () => {
  const items = await Product.find();
  return response.json(items);
};

export const handler = middy(controller)
  .use(mongo())
  .use(httpJsonErrorHandler());
