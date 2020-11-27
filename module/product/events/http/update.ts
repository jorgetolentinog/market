/**
 * @swagger
 * /product/{id}:
 *   put:
 *     description: Actualiza un producto
 *     tags:
 *       - Product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         $ref: '#/components/responses/Error'
 */

import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import * as createError from "http-errors";
import * as Yup from "yup";

import middy from "@middy/core";
import response from "@shared/lib/response";
import { httpJsonErrorHandler, mongo } from "@shared/middleware";

import Product from "../../models/product";
import { productSchema } from "../../validators/product";

export const paramSchema = Yup.object().shape({
  id: Yup.string().required(),
});

const controller: Handler<APIGatewayProxyEvent> = async (event) => {
  const params = await paramSchema.validate(event.pathParameters);
  const body = await productSchema.validate(event.body);
  const item = await Product.findByIdAndUpdate(params.id, body, { new: true });
  if (!item) {
    throw new createError.NotFound(`Product ${params.id} not found`);
  }

  await item.populate("categories").execPopulate();
  return response.json(item);
};

export const handler = middy(controller)
  .use(mongo())
  .use(httpJsonErrorHandler());
