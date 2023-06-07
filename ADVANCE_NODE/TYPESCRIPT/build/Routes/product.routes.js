"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../Controllers/product.controller");
const isAuth_1 = require("../Middlewares/isAuth");
const validateProductData_1 = require("../Middlewares/validateProductData");
const router = express_1.default.Router();
router.post("/", isAuth_1.verifyUser, validateProductData_1.validateProductData, product_controller_1.createProduct);
router.get("/", product_controller_1.getAllProduct);
router.get("/search", product_controller_1.searchProduct);
exports.default = router;
