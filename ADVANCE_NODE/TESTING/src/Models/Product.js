const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be greater than 0"],
  },
});
productSchema.index({ name: "text", description: "text" });
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
