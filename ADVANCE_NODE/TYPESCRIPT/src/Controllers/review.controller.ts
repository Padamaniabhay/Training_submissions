import { NextFunction, Request, Response } from "express";
import { Review } from "../Models/Review";
import { CustomError, CustomRequest, QueryParams } from "../Utils/type";

export const createReview = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user) {
      const review = await Review.create({
        ...req.body.review,
        userId: req.user._id,
      });
      return res.status(201).json({ success: true, review });
    }
    const error: CustomError = new Error("user not found");
    error.status = 400;
    throw error;
  } catch (error) {
    return next(error);
  }
};

export const getAllReview = async (
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

    const reviews = await Review.aggregate([
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          reviews: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        },
      },
      {
        $project: {
          reviews: 1,
          total_reviews: { $arrayElemAt: ["$totalCount.count", 0] },
        },
      },
    ]);

    return res.status(201).json({ success: true, reviews });
  } catch (error) {
    return next(error);
  }
};
