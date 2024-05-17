import { Schema, model } from "mongoose";

const settingSchema = new Schema(
  {
    keyName: { type: String },
    keyValue: { type: String },
    isDefault: { type: Number, default: 1 },
  },
  { versionKey: false, timestamps: true }
);
export default model("setting", settingSchema);
