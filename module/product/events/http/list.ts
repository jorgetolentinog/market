/**
 * @swagger
 * /product:
 *   get:
 *     description: Devuelve lista de productos
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

import { APIGatewayProxyEvent, Handler } from "aws-lambda";

import middy from "@middy/core";
import response from "@shared/lib/response";
import { httpJsonErrorHandler, mongo } from "@shared/middleware";

import Product from "../../models/product";

const controller: Handler<APIGatewayProxyEvent> = async () => {
  const items = await Product.find().populate("categories");
  return response.json(items);
};

export const handler = middy(controller)
  .use(mongo())
  .use(httpJsonErrorHandler());
