import { Router } from "express";
import { no_image } from "../configuration/config.js";

import {
  addStore,
  getStore,
  getSingleStore,
} from "../controller/storeController.js";
const storeRoute = Router();

storeRoute.post("/addStore", addStore);
storeRoute.get("/getStore/:page", getStore);
storeRoute.get("/getSingleStore/:page/:id", getSingleStore);

export default storeRoute;
