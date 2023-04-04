const express = require("express");
const {
  getAllProduct,
  getProductById,
  postNewProduct,
  putUpadateProduct,
  deleteProductById,
  getProductByUserId,
} = require("../../Controllers/product");

const router = express.Router();

//get all products
router.get("/", getAllProduct);

//get particular product
router.get("/:id", getProductById);

//create new product
router.post("/", postNewProduct);

//update product
router.put("/:id", putUpadateProduct);

//delete product
router.delete("/:id", deleteProductById);

//get all products of users
router.get("/user/:id", getProductByUserId);

module.exports = router;
