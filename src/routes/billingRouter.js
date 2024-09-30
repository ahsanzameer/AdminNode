import { Router } from "express";
import {
  getAllBilling,
  getBilling,
  deleteAllBilling,
  deleteBilling,
} from "../controller/billingController.js";

const billingRouter = Router();

billingRouter.get("/getAllBilling", getAllBilling);
billingRouter.get("/getBilling/:billing_id", getBilling);
billingRouter.delete("/deleteAllBilling", deleteAllBilling);
billingRouter.delete("/deleteBilling/:delete_id", deleteBilling);

export default billingRouter;
