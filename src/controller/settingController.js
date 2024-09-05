import { Settings } from "../model/index.js";
import slug from "slug";
import asyncHandler from "express-async-handler";
import { catchErr } from "../configuration/config.js";

/*
export const addSetting = asyncHandler(async (req, res) => {
  const { appId, storeID, androidID, linkedInImage, facebookInImage, objects } =
    req.body;
  try {
    if (
      !appId ||
      !storeID ||
      !androidID ||
      !linkedInImage ||
      !facebookInImage ||
      !objects
    ) {
      return res.status(200).json({
        status: 400,
        message: `${
          !appId
            ? "appId"
            : !storeID
            ? "storeID"
            : !androidID
            ? "androidID"
            : !linkedInImage
            ? "linkedInImage"
            : !facebookInImage
            ? "facebookInImage"
            : !objects
            ? "objects"
            : ""
        } is required`,
      });
    } else {
      const data = await Settings.create({
        appId,
        storeID,
        objects,
        androidID,
        linkedInImage,
        facebookInImage,
      });
      return res.status(200).json({
        data,
        status: 200,
        message: "setting Added",
      });
    }
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("addSetting", "Setting"),
    });
  }
});
 */

export const addSetting = asyncHandler(async (req, res) => {
  const { keyName, keyValue } = req.body;
  try {
    if (!keyName || !keyValue) {
      return res.status(200).json({
        status: 400,
        message: `${!keyName ? "keyName" : "keyValue"} is required `,
      });
    } else {
      const data = await Settings.create({ keyName, keyValue, isDefault:1 });
      return res.status(200).json({
        data,
        status: 200,
        message: "setting Added",
      });
    }
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("addSetting", "Setting"),
    });
  }
});

export const getSetting = asyncHandler(async (req, res) => {
  const { setting_id } = req.params;

  try {
    const data = await Settings.findById(setting_id);

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
    console.log(error);
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("getSetting", "Setting"),
    });
  }
});

export const editSetting = asyncHandler(async (req, res) => {
  const { setting_id } = req.params;
  const { keyName, keyValue } = req.body;
  const data = await Settings.findByIdAndUpdate(
    setting_id,
    {
      keyName,
      keyValue,
    },
    { new: true }
  );
  try {
    if (!keyName || !keyValue) {
      return res.status(200).json({
        status: 400,
        message: `${!keyName ? "keyName" : "keyValue"} is required `,
      });
    } else if (!data) {
      return res.status(200).json({ status: 400, message: "No data found" });
    } else {
      return res
        .status(200)
        .json({ data, status: 200, message: "Data updated" });
    }
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("editSetting", "Setting"),
    });
  }
});

export const getAllSetting = asyncHandler(async (_, res) => {
  try {
    const data = await Settings.find();
    return res.status(200).json({
      object: data,
      status: 200,
      message: "Found Data",
    });
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("getAllSetting", "Setting"),
    });
  }
});

export const deleteSetting = asyncHandler(async (req, res) => {
  const { delete_id } = req.params;

  const data = await Settings.findByIdAndDelete(delete_id);
  console.log({ data, delete_id });
  try {
    if (!data) {
      return res
        .status(200)
        .json({ status: 400, message: "Can not found this Setting" });
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
      message: catchErr("deleteSetting", "Settings"),
    });
  }
});
