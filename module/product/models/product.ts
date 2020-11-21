/**
 * @swagger
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       price:
 *         type: number
 *       createdAt:
 *         type: string
 *         format: date-time
 *         readOnly: true
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
