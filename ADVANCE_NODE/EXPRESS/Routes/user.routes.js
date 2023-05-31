const express = require("express");
const verifyUser = require("../Middlewares/isAuth");
const validateAuthData = require("../Middlewares/validateAuthData");
const router = express.Router();

const { loginUser, registerUser, getAllUserPostedReviews, getAllUsersWithProductCount } = require("./../Controllers/user.controllers");

router.post("/login", validateAuthData, loginUser);
router.post("/register", validateAuthData, registerUser);
router.get("/reviews", verifyUser, getAllUserPostedReviews);
router.get("/productcount", getAllUsersWithProductCount);

module.exports = router;
