const express = require("express");
const sequelize = require("./Utils/sequelize");
require("dotenv").config({ path: "./.env" });
const ProductModel = require("./Models/proudct");
const UserModel = require("./Models/user");

//routes
const ProductRoutes = require("./Routes/Product/product.routes");
const UserRoutes = require("./Routes/User/user.routes");
const { DataTypes } = require("sequelize");

const app = express();
UserModel.hasMany(ProductModel, {
  foreignKey: {
    name: "userId",
    type: DataTypes.INTEGER,
  },
});
ProductModel.belongsTo(UserModel);

app.use(express.urlencoded());
app.use(express.json());

app.use("/product", ProductRoutes);
app.use("/user", UserRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  return res.json({ message: "ERROR", ...err });
});

app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("Dsfa", sequelize.models);
    await sequelize.sync({ alter: true });
    console.log("server is up and running");
  } catch (e) {
    console.log("error in mysql connection ", e);
  }
});
