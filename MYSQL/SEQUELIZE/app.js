const express = require("express");
require("dotenv").config({ path: "./.env" });
require("./Utils/DatabaseRealations");

const sequelize = require("./Utils/sequelize");

//routes
const ProductRoutes = require("./Routes/Product/product.routes");
const UserRoutes = require("./Routes/User/user.routes");
const orderRoutes = require("./Routes/Order/order.routes");

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/product", ProductRoutes);
app.use("/user", UserRoutes);
app.use("/order", orderRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ message: "ERROR", ...err });
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
