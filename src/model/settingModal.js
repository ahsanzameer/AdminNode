import { Schema, model } from "mongoose";

const settingSchema = new Schema(
  {
    objects: { type: Object },
    isDefault: { type: Number, default: 1 },
  },
  { versionKey: false, timestamps: true }
);
export default model("setting", settingSchema);
