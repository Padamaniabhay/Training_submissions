const express = require("express");
const sequelize = require("./sequelize");
require("dotenv").config({ path: "./.env" });
require("./Models/proudct");

//routes
const product = require("./Routes/Product/product.routes");

const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use("/product", product);

app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("Dsfa", sequelize.models);
    await sequelize.sync();
    console.log("server is up and running");
  } catch (e) {
    console.log("error in mysql connection ", e);
  }
});
