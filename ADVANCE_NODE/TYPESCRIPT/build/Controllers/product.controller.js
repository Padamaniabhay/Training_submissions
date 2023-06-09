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
exports.searchProduct = exports.getAllProduct = exports.createProduct = void 0;
const Product_1 = require("../Models/Product");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const product = yield Product_1.Product.create(Object.assign(Object.assign({}, req.body.product), { userId: req.user._id }));
            return res.status(201).json({ success: true, product });
        }
        const error = new Error("user not found");
        error.status = 400;
        throw error;
    }
    catch (error) {
        return next(error);
    }
});
exports.createProduct = createProduct;
const getAllProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const products = yield Product_1.Product.aggregate([
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
    }
    catch (error) {
        return next(error);
    }
});
exports.getAllProduct = getAllProduct;
const searchProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.search) {
            const error = new Error("please provide search text");
            error.status = 400;
            throw error;
        }
        const { search: searchText } = req.query;
        const products = yield Product_1.Product.aggregate([
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
    }
    catch (error) {
        return next(error);
    }
});
exports.searchProduct = searchProduct;
