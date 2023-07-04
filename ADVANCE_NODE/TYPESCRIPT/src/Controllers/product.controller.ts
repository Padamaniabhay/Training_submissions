import { NextFunction, Request, Response } from "express";
import { Product } from "../Models/Product";
import { CustomError, CustomRequest, QueryParams } from "../Utils/type";

export const createProduct = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user) {
      const product = await Product.create({
        ...req.body.product,
        userId: req.user._id,
      });
      return res.status(201).json({ success: true, product });
    }
    const error: CustomError = new Error("user not found");
    error.status = 400;
    throw error;
  } catch (error) {
    return next(error);
  }
};

export const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page: _page = "1", limit: _limit = "5" }: QueryParams = req.query;

    let page: number = parseInt(_page);
    let limit: number = parseInt(_limit);

    if (Number.isNaN(page)) {
      const error: CustomError = new Error("Page number must be in digit");
      error.status = 400;
      throw error;
    }

    if (Number.isNaN(limit)) {
      const error: CustomError = new Error("limit must be in digit");
      error.status = 400;
      throw error;
    }

    const products = await Product.aggregate([
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          products: [
            { $skip: (page - 1) * limit },
            { $limit: limit },
            {
              $project: {
                _id: 0,
                name: 1,
                price: 1,
                description: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          products: 1,
          total_products: { $arrayElemAt: ["$totalCount.count", 0] },
        },
      },
    ]);

    return res
      .status(200)
      .json({ success: true, products: products[0].products });
  } catch (error) {
    return next(error);
  }
};

export const searchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.search) {
      const error: CustomError = new Error("please provide search text");
      error.status = 400;
      throw error;
    }
    const { search: searchText }: QueryParams = req.query;

    const products = await Product.aggregate([
      {
        $match: { $text: { $search: searchText } },
      },
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          products: [
            {
              $project: {
                _id: 0,
                name: 1,
                price: 1,
                description: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          products: 1,
          total_products: { $arrayElemAt: ["$totalCount.count", 0] },
        },
      },
    ]);
    return res.status(201).json({ success: true, products });
  } catch (error) {
    return next(error);
  }
};
