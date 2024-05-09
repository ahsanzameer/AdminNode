import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

export default model("User", userSchema);
