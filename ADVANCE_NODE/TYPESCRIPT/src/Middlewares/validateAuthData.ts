import { NextFunction, Request, Response } from "express";

import Joi from "joi";

export const validateAuthData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

  const { error } = schema.validate({
    email: req.body.email,
    password: req.body.password,
  });
  if (error) {
    return next(error);
  }

  return next();
};
