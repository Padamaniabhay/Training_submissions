"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../Controllers/review.controller");
const isAuth_1 = require("../Middlewares/isAuth");
const router = express_1.default.Router();
router.get("/", review_controller_1.getAllReview);
router.post("/new", isAuth_1.verifyUser, review_controller_1.createReview);
exports.default = router;
