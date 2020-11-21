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

import { APIGatewayProxyEvent, Context } from "aws-lambda";

import response from "@shared/lib/response";

export const handler = async (
  _event: APIGatewayProxyEvent,
  _context: Context
) => {
  return response.json({});
};
