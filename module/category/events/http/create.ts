/**
 * @swagger
 * /category:
 *   post:
 *     description: Crea una categoria
 *     tags:
 *       - Category
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */

import { APIGatewayProxyEvent } from "aws-lambda";

import middy from "@middy/core";
import response from "@shared/lib/response";
import { httpJsonErrorHandler, mongo } from "@shared/middleware";

import Category, { schemaCreate } from "../../models/category";

const controller = async (event: APIGatewayProxyEvent) => {
  const body = await schemaCreate.validate(event.body);
  const item = await Category.create(body);
  return response.json(item, 201);
};

export const handler = middy(controller)
  .use(mongo())
  .use(httpJsonErrorHandler());
