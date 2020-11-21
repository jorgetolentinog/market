/**
 * @swagger
 * definitions:
 *   ProductCreate:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       price:
 *         type: number
 *
 *   Product:
 *     allOf:
 *       - $ref: '#/definitions/ProductCreate'
 *       - type: object
 *         properties:
 *           createdAt:
 *             type: string
 *             format: date-time
 */

import { Document, model, Schema } from "mongoose";

export interface IProduct extends Document {
  title: String;
  description?: String;
  price: Number;
  createdAt?: Date;
}

const schema = new Schema({
  title: String,
  description: String,
  price: Number,
  createdAt: { type: Date, default: Date.now },
});

export default model<IProduct>("product", schema);
