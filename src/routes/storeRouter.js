import { Router } from "express";
import { fromData } from "../configuration/config.js";

import {
  addStore,
  getStore,
  searchStore,
  getSingleStore,
  addStoreStateApi,
  searchStoreProduct,
  getAllStoreStateApi,
  getSingleStoreProduct,
  getSingleStoreStateApi,
} from "../controller/storeController.js";

const storeRoute = Router();

storeRoute.post("/addStore", addStore);
storeRoute.get("/getStore/:page", getStore);
storeRoute.post("/searchStore", fromData, searchStore);
storeRoute.get("/getSingleStore/:page/:id", getSingleStore);
storeRoute.get("/getAllStoreStateApi", getAllStoreStateApi);
storeRoute.post("/addStoreStateApi", fromData, addStoreStateApi);
storeRoute.get("/getSingleStoreProduct/:id", getSingleStoreProduct);
storeRoute.post("/searchStoreProduct", fromData, searchStoreProduct);
storeRoute.get("/getSingleStoreStateApi/:id", getSingleStoreStateApi);

export default storeRoute;
