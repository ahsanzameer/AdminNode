import { Schema, model } from "mongoose";

const bloggingSchema = new Schema(
  {
    blogTitle: { type: String },
    blogDescription: { type: String },
    blogImage: { type: String },
    uploaderID: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

export default model("blog", bloggingSchema);
