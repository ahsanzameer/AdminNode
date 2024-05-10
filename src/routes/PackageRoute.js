import { Router } from "express";
import {
  getPackage,
  addPackage,
  editPackage,
  deletePackage,
  getSinglePackage,
} from "../controller/packageController.js";
import { no_image } from "../configuration/config.js";

const packageRouter = Router();

packageRouter.get("/getPackage", getPackage);
packageRouter.post("/addPackage", no_image, addPackage);
packageRouter.delete("/deletePackage/:_id", deletePackage);
packageRouter.get("/getSinglePackage/:_id", getSinglePackage);
packageRouter.patch("/editPackage/:_id", no_image, editPackage);

export default packageRouter;
