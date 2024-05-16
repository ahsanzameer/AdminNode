import { Settings } from "../model/index.js";
import slug from "slug";
import asyncHandler from "express-async-handler";
import { catchErr } from "../configuration/config.js";

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

export const getSetting = asyncHandler(async (req, res) => {
  const { setting_id } = req.params;
  const data = await Settings.findById(setting_id);
  const val = slug("i ♥ unicode hellow world,,,,,", "_");

  try {
    if (!data) {
      return res.status(200).json({
        status: 200,
        message: "No setting Found",
      });
    } else {
      return res.status(200).json({
        val,
        data,
        status: 200,
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

export const editSetting = asyncHandler(async (req, res) => {
  const { setting_id } = req.params;
  const { appId, storeID, androidID, linkedInImage, facebookInImage } =
    req.body;
  const data = await Settings.findByIdAndUpdate(
    setting_id,
    {
      appId,
      storeID,
      androidID,
      linkedInImage,
      facebookInImage,
    },
    { new: true }
  );
  try {
    if (
      !appId ||
      !storeID ||
      !androidID ||
      !linkedInImage ||
      !facebookInImage
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
            : ""
        } is required`,
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
      data,
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
