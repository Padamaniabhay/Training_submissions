const {
  getAllOrder,
  getOrderById,
  postNewOrder,
  putUpadateOrder,
  deleteOrderById,
  getAllOrderByUserId,
  postAddProductInOrder,
} = require("./../../Controllers/order");

const express = require("express");

const router = express.Router();

//get all Orders
router.get("/", getAllOrder);

//get particular order
router.get("/:id", getOrderById);

//get all orders by user id
router.get("/user/:id", getAllOrderByUserId);

//post prdoucts in order
router.post("/:id", postAddProductInOrder);

//create new order
router.post("/", postNewOrder);

//update order
router.put("/:id", putUpadateOrder);

//delete order
router.delete("/:id", deleteOrderById);

module.exports = router;
