"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuth_1 = require("../Middlewares/isAuth");
const validateAuthData_1 = require("../Middlewares/validateAuthData");
const user_controllers_1 = require("./../Controllers/user.controllers");
const router = express_1.default.Router();
// router.route("/login").post(validateAuthData, loginUser)
router.post("/login", validateAuthData_1.validateAuthData, user_controllers_1.loginUser);
router.post("/register", validateAuthData_1.validateAuthData, user_controllers_1.registerUser);
router.get("/reviews", isAuth_1.verifyUser, user_controllers_1.getAllUserPostedReviews);
router.get("/productcount", user_controllers_1.getAllUsersWithProductCount);
exports.default = router;
