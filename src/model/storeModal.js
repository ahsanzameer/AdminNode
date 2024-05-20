import { Schema, model } from "mongoose";

const storeSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("store", storeSchema);
