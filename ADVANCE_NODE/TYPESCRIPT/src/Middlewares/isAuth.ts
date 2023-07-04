import { NextFunction, Request, Response } from "express";
import { CustomError, CustomRequest } from "../Utils/type";

const jwt = require("jsonwebtoken");
require("dotenv").config();

export const verifyUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("authToken");

    if (!token) {
      const error: CustomError = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    return next();
  } catch (error) {
    return next(error);
  }
};
