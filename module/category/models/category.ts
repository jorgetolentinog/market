/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 */

import { Document, model, Schema } from "mongoose";
import * as Yup from "yup";

export interface ICategory extends Document {
  description?: number;
  createdAt?: Date;
}

export const schemaCreate = Yup.object<ICategory>().shape({
  description: Yup.string(),
});

const schema = new Schema({
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export default model<ICategory>("category", schema);
