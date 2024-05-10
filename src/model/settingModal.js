import { Schema, model } from "mongoose";

const settingSchema = new Schema(
  {
    appId: { type: String },
    storeID: { type: String },
    androidID: { type: String },
    linkedInImage: { type: String },
    facebookInImage: { type: String },
  },
  { timestamps: true }
);
export default model("setting", settingSchema);
