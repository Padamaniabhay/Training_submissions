import * as mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
export const Product = mongoose.model("Product", productSchema);
