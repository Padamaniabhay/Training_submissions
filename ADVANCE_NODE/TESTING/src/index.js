const express = require("express");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const bodyParser = require("body-parser");

const connectDB = require("./Utils/connection");
const { userRoutes } = require("./Routes/user.routes");
const { productRoutes } = require("./Routes/product.routes");
const { reviewRoutes } = require("./Routes/review.routes");

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/review", reviewRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log("Server is Up and Running");
  } catch (error) {
    console.log(error);
    console.log("DB connection Failed ");
  }
});

module.exports = app;
