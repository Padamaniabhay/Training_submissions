require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

import connectDB from "./Utils/connection";
import userRoutes from "./Routes/user.routes";
import productRoutes from "./Routes/product.routes";
import reviewRoutes from "./Routes/review.routes";

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/review", reviewRoutes);

app.use(
  (
    err: Error & { status: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
);

app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log("Server is Up and Running");
  } catch (error) {
    console.log("DB connection Failed ");
  }
});
