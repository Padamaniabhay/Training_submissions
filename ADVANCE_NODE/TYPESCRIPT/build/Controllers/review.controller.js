"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReview = exports.createReview = void 0;
const Review_1 = require("../Models/Review");
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const review = yield Review_1.Review.create(Object.assign(Object.assign({}, req.body.review), { userId: req.user._id }));
            return res.status(201).json({ success: true, review });
        }
        const error = new Error("user not found");
        error.status = 400;
        throw error;
    }
    catch (error) {
        return next(error);
    }
});
exports.createReview = createReview;
const getAllReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page: _page = "1", limit: _limit = "5" } = req.query;
        let page = parseInt(_page);
        let limit = parseInt(_limit);
        if (Number.isNaN(page)) {
            const error = new Error("Page number must be in digit");
            error.status = 400;
            throw error;
        }
        if (Number.isNaN(limit)) {
            const error = new Error("limit must be in digit");
            error.status = 400;
            throw error;
        }
        const reviews = yield Review_1.Review.aggregate([
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
    }
    catch (error) {
        return next(error);
    }
});
exports.getAllReview = getAllReview;
