/**
 * @swagger
 * /product:
 *   post:
 *     description: Crea un producto
 *     tags:
 *       - Product
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

import { APIGatewayProxyEvent } from "aws-lambda";

import middy from "@middy/core";
import response from "@shared/lib/response";
import { httpJsonErrorHandler, mongo } from "@shared/middleware";

import Product, { schemaCreate } from "../../models/product";

const controller = async (event: APIGatewayProxyEvent) => {
  const body = await schemaCreate.validate(event.body);
  const item = await Product.create(body);
  return response.json(item, 201);
};

export const handler = middy(controller)
  .use(mongo())
  .use(httpJsonErrorHandler());
