"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyUser = (req, res, next) => {
    try {
        const token = req.header("authToken");
        if (!token) {
            const error = new Error("Unauthorized");
            error.status = 401;
            throw error;
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        return next();
    }
    catch (error) {
        return next(error);
    }
};
exports.verifyUser = verifyUser;
