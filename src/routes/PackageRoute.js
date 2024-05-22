import { Router } from "express";
import {
  getPackage,
  addPackage,
  editPackage,
  deletePackage,
  getSinglePackage,
} from "../controller/packageController.js";
import { fromData } from "../configuration/config.js";

const packageRouter = Router();

packageRouter.get("/getPackage", getPackage);
packageRouter.post("/addPackage", fromData, addPackage);
packageRouter.delete("/deletePackage/:_id", deletePackage);
packageRouter.get("/getSinglePackage/:_id", getSinglePackage);
packageRouter.patch("/editPackage/:_id", fromData, editPackage);

export default packageRouter;
