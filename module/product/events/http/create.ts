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
 *             allOf:
 *               - $ref: '#/components/schemas/Product'
 *               - type: object
 *                 properties:
 *                   categories:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: uuid
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

import Product from "../../models/product";
import { productSchema } from "../../validators/product";

type EventController = Pick<APIGatewayProxyEvent, "body">;

const controller = async (event: EventController) => {
  const body = await productSchema.validate(event.body);
  const item = await Product.create(body);
  await item.populate("categories").execPopulate();
  return response.json(item, 201);
};

export const handler = middy(controller)
  .use(mongo())
  .use(httpJsonErrorHandler());
