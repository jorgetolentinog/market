import { Document, model, Schema } from "mongoose";

export interface IPost extends Document {
  title: String;
  date: Date;
}

const schema = new Schema({
  title: String,
  // author: String,
  // body: String,
  // comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  // hidden: Boolean,
  // meta: {
  //   votes: Number,
  //   favs: Number,
  // },
});

export default model<IPost>("post", schema);
