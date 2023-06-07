import express from "express";
import {
  getAllProduct,
  searchProduct,
  createProduct,
} from "../Controllers/product.controller";
import { verifyUser } from "../Middlewares/isAuth";
import { validateProductData } from "../Middlewares/validateProductData";

const router = express.Router();

router.post("/", verifyUser, validateProductData, createProduct);
router.get("/", getAllProduct);
router.get("/search", searchProduct);

export default router;
