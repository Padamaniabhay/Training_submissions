const express = require("express");
const router = express.Router();

const { getAllReview, createReview } = require("../Controllers/review.controller");
const verifyUser = require("../Middlewares/isAuth");

router.get("/", getAllReview);
router.post("/new", verifyUser, createReview);

module.exports = { reviewRoutes: router };
