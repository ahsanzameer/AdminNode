import { Packages } from "../model/index.js";
import asyncHandler from "express-async-handler";
import { catchErr } from "../configuration/config.js";

/*
export const addPackage = asyncHandler(async (req, res) => {
  try {
    const {
      packageName,
      packageDesc,
      packagePrice,
      packageCsvImportNumber,
      packageCSVImportBoolean,
      packageAmazonImportNumber,
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
    } else if (packageCSVImportBoolean === "No") {
      packageCsvImportNumber = 0;
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
    console.log(error);
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("addPackage", "Package"),
    });
  }
});
*/

export const addPackage = asyncHandler(async (req, res) => {
  try {
    const {
      packageName,
      packageDesc,
      packagePrice,
      packageCsvImportNumber: initialPackageCsvImportNumber,
      packageCSVImportBoolean,
      packageAmazonImportNumber,
    } = req.body;

    // Create a mutable variable for packageCsvImportNumber
    let packageCsvImportNumber = initialPackageCsvImportNumber;

    // Check for required fields
    if (
      !packageName ||
      !packageDesc ||
      !packagePrice ||
      !packageAmazonImportNumber ||
      packageCSVImportBoolean === undefined
    ) {
      return res.status(400).json({
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
            : packageCSVImportBoolean === undefined
            ? "packageCSVImportBoolean"
            : ""
        } is required`,
      });
    }

    // Set packageCsvImportNumber to 0 if packageCSVImportBoolean is "No"
    if (packageCSVImportBoolean === "No") {
      packageCsvImportNumber = 0;
    }

    // Check if packageCSVImportBoolean is "Yes" and packageCsvImportNumber is undefined
    if (
      packageCSVImportBoolean === "Yes" &&
      (packageCsvImportNumber === undefined || packageCsvImportNumber === null)
    ) {
      return res.status(400).json({
        status: 400,
        message:
          "packageCsvImportNumber is required when packageCSVImportBoolean is 'Yes'",
      });
    }

    // Check for existing package name or price
    const checkPackName = await Packages.findOne({ packageName });
    const checkPackPrice = await Packages.findOne({ packagePrice });

    if (checkPackName || checkPackPrice) {
      return res.status(400).json({
        status: 400,
        message: `This Package ${
          checkPackName ? "Name" : "Price"
        } already exists`,
      });
    }

    // Create the package
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
      message: `New Package with the name (${packageName}) has been created`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      status: 500,
      message: `An error occurred while adding the package.`,
    });
  }
});

export const getPackage = asyncHandler(async (_, res) => {
  try {
    const data = await Packages.find();

    const sortedData = data.sort((a, b) => a.packagePrice - b.packagePrice);
    return res.status(200).json({
      status: 200,
      object: sortedData,
      message: "Found the Data",
    });
  } catch (error) {
    return res.status(500).json({
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
