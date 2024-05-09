import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    productName: { type: String },
    productDesc: { type: String },
    productType: { type: String },
  },
  { timestamps: true }
);

export default model("Product", productSchema);
