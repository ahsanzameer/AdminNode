import { Schema, model } from "mongoose";

const StoreStatuSchema = new Schema(
  {
    is_active: { type: String },
    storeID: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export default model("storeStatu", StoreStatuSchema);
