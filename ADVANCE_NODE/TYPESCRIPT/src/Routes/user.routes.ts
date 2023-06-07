import express from "express";
import { verifyUser } from "../Middlewares/isAuth";
import { validateAuthData } from "../Middlewares/validateAuthData";

import {
  loginUser,
  registerUser,
  getAllUserPostedReviews,
  getAllUsersWithProductCount,
} from "./../Controllers/user.controllers";

const router = express.Router();
// router.route("/login").post(validateAuthData, loginUser)
router.post("/login", validateAuthData, loginUser);
router.post("/register", validateAuthData, registerUser);
router.get("/reviews", verifyUser, getAllUserPostedReviews);
router.get("/productcount", getAllUsersWithProductCount);
export default router;
