import { Document, model, Schema } from "mongoose";

export interface IProduct extends Document {
  title: String;
  date?: Date;
}

const schema = new Schema({
  title: String,
  date: { type: Date, default: Date.now },
});

export default model<IProduct>("product", schema);
