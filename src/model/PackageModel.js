import { Schema, model } from "mongoose";

const packageSchema = new Schema(
  {
    packageName: { type: String },
    packageDesc: { type: String },
    packagePrice: { type: String },
    packageAmazonImportNumer: { type: Number },
    // packageAmazonImportNumer: { type: Boolean },
    packageCsvImportNumer: { type: Number },
  },
  { timestamps: true }
);

export default model("package", packageSchema);
