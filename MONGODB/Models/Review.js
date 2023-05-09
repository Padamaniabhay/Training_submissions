const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
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
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;