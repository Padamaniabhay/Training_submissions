const {
  getAllOrder,
  getOrderById,
  postNewOrder,
  putUpadateOrder,
  deleteOrderById,
  getAllOrderByUserId,
  getUndeliveredOrders,
  getMostRecentOrder,
  getMostExpensiveOrder,
  getMostCheapestOrder,
} = require("./../../Controllers/order");

const express = require("express");

const router = express.Router();

//get all Orders
router.get("/", getAllOrder);

//get most expensive order
router.get("/expensive", getMostExpensiveOrder);

//get most chepest order
router.get("/cheapest", getMostCheapestOrder);

//get all undelivered orders
router.get("/undelivered", getUndeliveredOrders);

//get 5 most recent orders
router.route("/recent").get(getMostRecentOrder);

//get particular order
router.get("/:id", getOrderById);

//get all orders by user id
router.get("/user/:id", getAllOrderByUserId);

//create new order
router.post("/", postNewOrder);

//update order
router.put("/:id", putUpadateOrder);

//delete order
router.delete("/:id", deleteOrderById);

module.exports = router;
