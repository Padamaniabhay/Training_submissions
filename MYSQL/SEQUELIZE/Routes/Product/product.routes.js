const express = require("express");
const Product = require("../../Models/proudct");
const {
  getAllProduct,
  getProductById,
  postNewProduct,
  putUpadateProduct,
  deleteProductById,
  postSearchProduct,
} = require("../../Controllers/product");

const router = express.Router();

//get all products
router.get("/", getAllProduct);

//get particular product
router.get("/:id", getProductById);

//create new product
router.post("/create", postNewProduct);

//update product
router.put("/:id", putUpadateProduct);

//delete product
router.delete("/:id", deleteProductById);

//search by product name
router.post("/:pname", postSearchProduct);

module.exports = router;
