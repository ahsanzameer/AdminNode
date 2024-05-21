import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    counter: { type: Number },
    title: {
      type: String,
    },
    price: {
      type: String,
    },
    image_url: {
      type: [String],
      default: [],
    },
    shop_id: {
      type: String,
    },
    product_url: {
      type: String,
    },
    description: {
      type: String,
    },
    inShopify: {
      type: Boolean,
      default: false,
    },
    shopifyId: {
      type: String,
      default: null,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
  },
  { timestamps: true }
);

export default model("AmazonProduct", productSchema);
