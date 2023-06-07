import { NextFunction, Response } from "express";
import { CustomRequest } from "../Utils/type";

const Joi = require("joi");

export const validateProductData = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0).positive().required(),
    description: Joi.string().required(),
  });

  const { error } = schema.validate(req.body.product);
  if (error) {
    error.status = 400;
    return next(error);
  }
  return next();
};
