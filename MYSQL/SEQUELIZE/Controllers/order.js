const { Sequelize } = require("sequelize");
const Models = require("../Utils/Models");
const sequelize = require("../Utils/sequelize");

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
    let newOrder = {};
    await sequelize.transaction(async (t) => {
      newOrder = await Models.Order.create(req.body.order, {
        transaction: t,
      });
      await newOrder.setUser(req.body.userID, { transaction: t });
      await Models.OrderDetails.bulkCreate(
        req.body.product.map((product) => {
          return {
            productId: product.productId,
            orderId: newOrder.getDataValue("id"),
            quantity: product.quantity,
          };
        }),
        { transaction: t }
      );
    });
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

const getUndeliveredOrders = async (req, res, next) => {
  try {
    const undeliveredOrders = await Models.Order.findAll({
      where: { orderStatus: "undelivered" },
    });
    if (!undeliveredOrders)
      return res.json({ message: "Orders not found which is undelivered" });
    return res.json(undeliveredOrders);
  } catch (error) {
    return next(error);
  }
};

const getMostRecentOrder = async (req, res, next) => {
  try {
    const mostRecentOrders = await Models.Order.findAll({
      limit: 5,
      order: [["orderDate", "DESC"]],
    });
    if (!mostRecentOrders) return res.json({ message: "Orders not found" });
    return res.json(mostRecentOrders);
  } catch (error) {
    return next(error);
  }
};

const getMostExpensiveOrder = async (req, res, next) => {
  try {
    const orders = await Models.OrderDetails.findAll({
      include: {
        model: Models.Product,
        attributes: [],
      },

      attributes: [
        "orderId",
        [Sequelize.literal("sum(product.price * quantity)"), "totalPrice"],
      ],
      group: ["orderId"],
      order: [["totalPrice", "DESC"]],
      limit: 1,
    });

    return res.json({ orders });
  } catch (error) {
    return next(error);
  }
};

const getMostCheapestOrder = async (req, res, next) => {
  try {
    const orders = await Models.OrderDetails.findAll({
      include: {
        model: Models.Product,
        attributes: [],
      },

      attributes: [
        "orderId",
        [Sequelize.literal("sum(product.price * quantity)"), "totalPrice"],
      ],
      group: ["orderId"],
      order: [["totalPrice", "ASC"]],
      limit: 1,
    });

    return res.json({ orders });
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
  getUndeliveredOrders,
  getMostRecentOrder,
  getMostExpensiveOrder,
  getMostCheapestOrder,
};
