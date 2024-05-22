import { Router } from "express";
import { fromData } from "../configuration/config.js";
import {
  addSetting,
  getSetting,
  editSetting,
  getAllSetting,
  deleteSetting,
} from "../controller/settingController.js";

const settingRouter = Router();

settingRouter.get("/getAllSetting", getAllSetting);
settingRouter.post("/addSetting", fromData, addSetting);
settingRouter.get("/getSetting/:setting_id", getSetting);
settingRouter.delete("/deleteSetting/:delete_id", deleteSetting);
settingRouter.patch("/editSetting/:setting_id", fromData, editSetting);

export default settingRouter;
