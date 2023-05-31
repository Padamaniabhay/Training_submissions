const express = require("express");
const router = express.Router();
const { getAllProduct, searchProduct, createProduct } = require("../Controllers/product.controller");
const verifyUser = require("../Middlewares/isAuth");
const validateProductData = require("../Middlewares/validateProductData");



router.post("/new", verifyUser, validateProductData, createProduct);
router.get("/", getAllProduct);
router.get("/search", searchProduct);

module.exports = router;
