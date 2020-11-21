/**
 * @swagger
 * /product:
 *   post:
 *     description: Crea un product
 *     tags:
 *       - Product
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: Product
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *         description: created
 *         schema:
 *           $ref: '#/definitions/Product'
 */

import { APIGatewayProxyEvent } from "aws-lambda";

import middy from "@middy/core";
import response from "@shared/lib/response";
import { httpJsonErrorHandler, mongo } from "@shared/middleware";

import { Product } from "../../models";
import { productCreate } from "../../models/product";

const controller = async (event: APIGatewayProxyEvent) => {
  const body = await productCreate.validate(event.body);
  const item = await Product.create(body);
  return response.json(item, 201);
};

export const handler = middy(controller)
  .use(mongo())
  .use(httpJsonErrorHandler());
