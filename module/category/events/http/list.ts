/**
 * @swagger
 * /category:
 *   get:
 *     description: Devuelve lista de categorias
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

import { APIGatewayProxyEvent, Handler } from "aws-lambda";

import middy from "@middy/core";
import response from "@shared/lib/response";
import { httpJsonErrorHandler, mongo } from "@shared/middleware";

import Category from "../../models/category";

const controller: Handler<APIGatewayProxyEvent> = async () => {
  const items = await Category.find();
  return response.json(items);
};

export const handler = middy(controller)
  .use(httpJsonErrorHandler())
  .use(mongo());
