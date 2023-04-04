const express = require("express");
require("dotenv").config({ path: "./.env" });

const sequelize = require("./Utils/sequelize");
const Models = require("./Utils/Models");

//routes
const ProductRoutes = require("./Routes/Product/product.routes");
const UserRoutes = require("./Routes/User/user.routes");
const orderRoutes = require("./Routes/Order/order.routes");
const { DataTypes } = require("sequelize");

const app = express();

//user has many products
Models.User.hasMany(Models.Product, {
  foreignKey: {
    name: "userId",
    type: DataTypes.INTEGER,
  },
});
Models.Product.belongsTo(Models.User);

//user has many orders
Models.User.hasMany(Models.Order, {
  foreignKey: {
    name: "userId",
    type: DataTypes.INTEGER,
  },
});
Models.Order.belongsTo(Models.User);

//order has many product and product belongsTo many orders
Models.Order.belongsToMany(Models.Product, {
  through: Models.OrderDetails,
});
Models.Product.belongsToMany(Models.Order, {
  through: Models.OrderDetails,
});

app.use(express.urlencoded());
app.use(express.json());

app.use("/product", ProductRoutes);
app.use("/user", UserRoutes);
app.use("/order", orderRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  return res.json({ message: "ERROR", ...err });
});

app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("server is up and running");
  } catch (err) {
    console.log("error in mysql connection ", err);
  }
});
