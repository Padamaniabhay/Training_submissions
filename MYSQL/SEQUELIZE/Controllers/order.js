const Models = require("../Utils/Models");

const getAllOrder = async (req, res, next) => {
  try {
    return res.json(await Models.Order.findAll());
  } catch (error) {
    return next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const OrderItem = await Models.Order.findByPk(req.params.id);
    if (!OrderItem) return res.json({ message: "order not found" });
    return res.json({ OrderItem });
  } catch (error) {
    return next(error);
  }
};

const getAllOrderByUserId = async (req, res, next) => {
  try {
    const user = await Models.User.findByPk(req.params.id);
    const OrderItem = await user.getOrders();
    if (!OrderItem) return res.json({ message: "order not found" });
    return res.json({ OrderItem });
  } catch (error) {
    return next(error);
  }
};

const postNewOrder = async (req, res, next) => {
  try {
    const newOrder = await Models.Order.create(req.body.order);
    newOrder.setUser(req.body.userID);
    return res.json({
      message: "Order created successfully!!",
      ...newOrder,
    });
  } catch (error) {
    return next(error);
  }
};

const putUpadateOrder = async (req, res, next) => {
  try {
    const OrderItem = await Models.Order.update(req.body.order, {
      where: { id: req.params.id },
    });
    if (!OrderItem) return res.json({ message: "Order not found" });
    return res.json({ message: "order updated successfully" });
  } catch (error) {
    return next(error);
  }
};

const deleteOrderById = async (req, res, next) => {
  try {
    const OrderItem = await Models.Order.findOne({
      where: { id: req.params.id },
    });
    if (!OrderItem) return res.json({ message: "Order not found" });
    await OrderItem.destroy();
    return res.json({ message: "order deleted successfully", ...OrderItem });
  } catch (error) {
    return next(error);
  }
};

const postAddProductInOrder = async (req, res, next) => {
  try {
    const OrderItem = await Models.Order.findOne({
      where: { id: req.params.id },
    });
    if (!OrderItem) return res.json({ message: "Order not found" });
    await OrderItem.addProducts(req.body.productID);
    return res.json({ message: "products in order added successfully" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllOrder,
  getOrderById,
  postNewOrder,
  putUpadateOrder,
  deleteOrderById,
  getAllOrderByUserId,
  postAddProductInOrder,
};
