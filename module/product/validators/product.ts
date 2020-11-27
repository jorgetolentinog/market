import { IProduct } from "../models/product";
import * as Yup from "yup";

export const productSchema = Yup.object<IProduct>().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
  categories: Yup.array().of(Yup.string()),
});
