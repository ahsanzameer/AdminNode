import asyncHandler from "express-async-handler";
import { catchErr } from "../configuration/config.js";
import { Packages } from "../model/index.js";

export const addPackage = asyncHandler(async (req, res) => {
  try {
    const {
      packageName,
      packageDesc,
      packagePrice,
      packageAmazonImportNumber,
      packageCSVImportBoolean,
      packageCsvImportNumber,
    } = req.body;
    const checkPackName = await Packages.findOne({ packageName });
    const checkPackPrice = await Packages.findOne({ packagePrice });
    if (
      !packageName ||
      !packageDesc ||
      !packagePrice ||
      !packageAmazonImportNumber ||
      !packageCSVImportBoolean
    ) {
      res.status(200).json({
        status: 400,
        message: `${
          !packageName
            ? "Package Name"
            : !packageDesc
            ? "Package Description"
            : !packagePrice
            ? "Package Price"
            : !packageAmazonImportNumber
            ? "Package Amazon Import Number"
            : !packageCSVImportBoolean
            ? "packageCSVImportBoolean"
            : ""
        } is required`,
      });
    } else if (
      packageCSVImportBoolean === "Yes" &&
      packageCsvImportNumber === undefined
    ) {
      res.status(200).json({
        status: 400,
        message: "packageCsvImportNumber is required",
      });
    } else if (checkPackName || checkPackPrice) {
      res.status(200).json({
        status: 400,
        message: `This Package ${
          checkPackName ? "Name" : "Price"
        } is already exist`,
      });
    } else {
      const data = await Packages.create({
        packageName,
        packageDesc,
        packagePrice,
        packageAmazonImportNumber,
        packageCSVImportBoolean,
        packageCsvImportNumber,
      });
      res.status(200).json({
        data,
        status: 200,
        message: `New Package with This Package Name (${packageName}) is created`,
      });
    }
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("addPackage", "Package"),
    });
  }
});

export const getPackage = asyncHandler(async (req, res) => {
  try {
    const data = await Packages.find();
    return res.status(200).json({
      data,
      status: 200,
      message: "Found the Data",
    });
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("getPackage", "Package"),
    });
  }
});

export const getSinglePackage = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  try {
    const data = await Packages.findById({ _id });

    if (!data) {
      return res
        .status(200)
        .json({ data, status: 200, message: "No data found" });
    } else {
      return res
        .status(200)
        .json({ data, status: 200, message: `Found data with ${_id}` });
    }
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("getSinglePackage", "Package"),
    });
  }
});

export const deletePackage = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const data = await Packages.findByIdAndDelete(_id);
  try {
    if (!data) {
      return res
        .status(200)
        .json({ status: 400, message: "Can not found this Package" });
    } else {
      return res.status(200).json({
        data,
        status: 200,
        message: "Successfuly deleted",
      });
    }
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("deletePackage", "Package"),
    });
  }
});

export const editPackage = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const {
    packageName,
    packageDesc,
    packagePrice,
    packageAmazonImportNumber,
    packageCsvImportNumber,
  } = req.body;
  const data = await Packages.findByIdAndUpdate(
    _id,
    {
      packageName,
      packageDesc,
      packagePrice,
      packageAmazonImportNumber,
      packageCsvImportNumber,
    },
    { new: true }
  );
  try {
    if (
      !packageName ||
      !packageDesc ||
      !packagePrice ||
      !packageAmazonImportNumber ||
      !packageCsvImportNumber
    ) {
      return res.status(200).json({
        status: 200,
        message: `${
          !packageName
            ? "Package Name"
            : !packageDesc
            ? "Package Description"
            : !packagePrice
            ? "Package Price"
            : !packageAmazonImportNumber
            ? "Package Amazon Import Number"
            : !packageCsvImportNumber
            ? "Package Csv Import Number"
            : ""
        }  is required`,
      });
    } else if (!data) {
      return res.status(200).json({ status: 400, message: "No data found" });
    } else {
      return res.status(200).json({
        data,
        status: 200,
        message: "Data has need updated",
      });
    }
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("editPackage", "Package"),
    });
  }
});
