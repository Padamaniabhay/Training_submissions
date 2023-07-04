import * as mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});
export const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
