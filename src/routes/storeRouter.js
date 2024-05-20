import { Router } from "express";
import { no_image } from "../configuration/config.js";

import { getStore } from "../controller/storeController.js";
const storeRoute = Router();

storeRoute.post("/getStore/:store_id", no_image, getStore);

export default storeRoute;
