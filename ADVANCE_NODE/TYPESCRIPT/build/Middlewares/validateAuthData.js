"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthData = void 0;
const joi_1 = __importDefault(require("joi"));
const validateAuthData = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(5).required(),
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
exports.validateAuthData = validateAuthData;
