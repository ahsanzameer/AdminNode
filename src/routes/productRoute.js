import { Router } from "express";
import {
  getProducts,
  deleteProduct,
  getAllProducts,
  deleteAllProduct,
} from "../controller/productController.js";

const ProductRouter = Router();

ProductRouter.get("/getAllProducts", getAllProducts);
ProductRouter.get("/getProducts/:product_id", getProducts);
ProductRouter.delete("/deleteAllProduct", deleteAllProduct);
ProductRouter.delete("/deleteSetting/:delete_id", deleteProduct);

export default ProductRouter;
