/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 */

import { Document, model, Schema } from "mongoose";
import Category, { ICategory } from "@module/category/models/category";

export interface IProduct extends Document {
  title: String;
  description?: String;
  price: Number;
  categories?: String[] | ICategory[];
  createdAt?: Date;
}

const schema = new Schema({
  title: String,
  description: String,
  price: Number,
  categories: [{ type: Schema.Types.ObjectId, ref: Category }],
  createdAt: { type: Date, default: Date.now },
});

export default model<IProduct>("product", schema);
