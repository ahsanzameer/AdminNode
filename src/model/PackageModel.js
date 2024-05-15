import { Schema, model } from "mongoose";

const packageSchema = new Schema(
  {
    packageName: { type: String },
    packageDesc: { type: String },
    packagePrice: { type: String },
    packageAmazonImportNumber: { type: Number },
    packageCSVImportBoolean: { type: String },
    packageCsvImportNumber: { type: Number },
  },
  { timestamps: true }
);

export default model("package", packageSchema);
