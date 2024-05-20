import asyncHandler from "express-async-handler";
import { AmazonProduct } from "../model/index.js";
import { catchErr } from "../configuration/config.js";

export const getStore = asyncHandler(async (req, res) => {
  const { store_id } = req.params;
  try {
    const data = await AmazonProduct.findById({ store_id });
    if (!data) {
      return res.status(200).json({
        status: 400,
        message: "No setting Found",
      });
    } else {
      return res.status(200).json({
        status: 200,
        object: data,
        message: "Found Data",
      });
    }
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("getSetting", "Setting"),
    });
  }
});
