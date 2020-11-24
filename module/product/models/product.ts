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
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 */

import { Document, model, Schema } from "mongoose";
import * as Yup from "yup";

export interface IProduct extends Document {
  title: String;
  description?: String;
  price: Number;
  createdAt?: Date;
}

export const productCreate = Yup.object<IProduct>().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
});

const schema = new Schema({
  title: String,
  description: String,
  price: Number,
  createdAt: { type: Date, default: Date.now },
});

export default model<IProduct>("product", schema);
