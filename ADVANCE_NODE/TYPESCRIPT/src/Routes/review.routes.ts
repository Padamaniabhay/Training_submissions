import express from "express";

import { getAllReview, createReview } from "../Controllers/review.controller";
import { verifyUser } from "../Middlewares/isAuth";

const router = express.Router();
router.get("/", getAllReview);
router.post("/new", verifyUser, createReview);
export default router;
