import { Router } from "express";
import { no_image } from "../configuration/config.js";

import {
  addStore,
  getStore,
  searchStore,
  getSingleStore,
  searchStoreProduct,
} from "../controller/storeController.js";

const storeRoute = Router();

storeRoute.post("/addStore", addStore);
storeRoute.get("/getStore/:page", getStore);
storeRoute.post("/searchStore", no_image, searchStore);
storeRoute.get("/getSingleStore/:page/:id", getSingleStore);
storeRoute.post("/searchStoreProduct", no_image, searchStoreProduct);

export default storeRoute;
