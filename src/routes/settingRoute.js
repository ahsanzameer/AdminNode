import { Router } from "express";
import { no_image } from "../configuration/config.js";
import {
  addSetting,
  getSetting,
  editSetting,
  getAllSetting,
  deleteSetting,
} from "../controller/settingController.js";

const settingRouter = Router();

settingRouter.get("/getAllSetting", getAllSetting);
settingRouter.post("/addSetting", no_image, addSetting);
settingRouter.get("/getSetting/:setting_id", getSetting);
settingRouter.delete("/deleteSetting/:delete_id", deleteSetting);
settingRouter.patch("/editSetting/:setting_id", no_image, editSetting);

export default settingRouter;
