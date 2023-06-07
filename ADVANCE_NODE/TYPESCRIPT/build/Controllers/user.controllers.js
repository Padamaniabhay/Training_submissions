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
exports.getAllUsersWithProductCount = exports.getAllUserPostedReviews = exports.loginUser = exports.registerUser = void 0;
const User = require("./../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Product = require("../Models/Product");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const user = yield User.create({ email, password: hashedPassword });
        return res.status(201).json({ success: true, user });
    }
    catch (error) {
        return next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User.findOne({ email });
        if (!user) {
            const error = new Error("User Not Found");
            error.status = 404;
            throw error;
        }
        const comparePassword = yield bcrypt.compare(password, user.password);
        if (!comparePassword) {
            const error = new Error("Incorrect Password");
            error.status = 401;
            throw error;
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });
        return res.status(200).json({ success: true, token });
    }
    catch (error) {
        return next(error);
    }
});
exports.loginUser = loginUser;
const getAllUserPostedReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const users = yield User.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(req.user._id),
                    },
                },
                {
                    $lookup: {
                        from: "reviews",
                        localField: "_id",
                        foreignField: "userId",
                        as: "reviews",
                        pipeline: [
                            {
                                $group: {
                                    _id: "$productId",
                                    reviews: { $push: { name: "$name", body: "$body" } },
                                },
                            },
                        ],
                    },
                },
                {
                    $project: {
                        _id: 0,
                        email: 1,
                        reviews: 1,
                    },
                },
            ]);
            return res.status(200).json({ success: true, users });
        }
        const error = new Error("user not found");
        error.status = 400;
        throw error;
    }
    catch (error) {
        return next(error);
    }
});
exports.getAllUserPostedReviews = getAllUserPostedReviews;
const getAllUsersWithProductCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Product.aggregate([
            {
                $group: {
                    _id: "$userId",
                    total_product: { $sum: 1 },
                    product_name: { $push: "$name" },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "users",
                },
            },
            {
                $addFields: {
                    email: {
                        $arrayElemAt: ["$users.email", 0],
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    users: 0,
                },
            },
        ]);
        return res.status(200).json({ success: true, users });
    }
    catch (error) {
        return next(error);
    }
});
exports.getAllUsersWithProductCount = getAllUsersWithProductCount;
