import asyncHandler from "express-async-handler";
import { catchErr } from "../configuration/config.js";
import { AmazonProduct } from "../model/index.js";

export const getProducts = asyncHandler(async (req, res) => {
  try {
    const { product_id } = req.params;
    if (!product_id) {
      return res.status(400).json({
        status: 400,
        message: "Product ID is required",
      });
    }

    const product = await AmazonProduct.findById(product_id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    } else {
      return res.status(200).json({
        status: 200,
        object: product,
        message: "Product found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("getProducts", "product"),
    });
  }
});
export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const data = await AmazonProduct.find();

    if (!data) {
      return res.status(200).json({
        status: 400,
        message: "No Product Found",
      });
    } else {
      return res.status(200).json({
        status: 200,
        object: data,
        message: "Found Data",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("getAllProducts", "product"),
    });
  }
});
export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { delete_id } = req.params;
    if (!delete_id) {
      return res.status(400).json({
        status: 400,
        message: "Product ID is required",
      });
    }

    const product = await AmazonProduct.findByIdAndDelete(delete_id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    } else {
      return res.status(200).json({
        status: 200,
        object: product,
        message: "Product deleted succesfully!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("deleteProduct", "product"),
    });
  }
});
export const deleteAllProduct = asyncHandler(async (req, res) => {
  try {
    const data = await AmazonProduct.deleteMany();

    if (!data) {
      return res.status(200).json({
        status: 400,
        message: "No Product Found",
      });
    } else {
      return res.status(200).json({
        status: 200,
        object: data,
        message: "All products Deleted Succesfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("deleteAllProduct", "product"),
    });
  }
});
