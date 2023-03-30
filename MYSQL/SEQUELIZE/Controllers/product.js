const express = require("express");
const Product = require("../../Models/proudct");

const router = express.Router();

const getAllProduct = async (req, res) => {
  const page = req.query.page || 1;
  return res.json(await Product.findAll({ offset: (page - 1) * 2, limit: 2 }));
};

const getProductById = async (req, res) => {
  const productItem = await Product.findByPk(req.params.id);
  if (!productItem) {
    return res.json({ message: "prdouct not found" });
  }
  return res.json({ productItem });
};

const postNewProduct = async (req, res) => {
  const newproduct = await Product.create(req.body.product);
  return res.json({ message: "product created successfully!!", ...newproduct });
};

const putUpadateProduct = async (req, res) => {
  const productItem = await Product.findOne({ where: { id: req.params.id } });
  productItem.update(req.body.product);

  return res.json({ productItem });
};

const deleteProductById = async (req, res) => {
  const productItem = await Product.findOne({ where: { id: req.params.id } });
  await productItem.destroy();

  return res.json({ productItem });
};

exports = {
  getAllProduct,
  getProductById,
  postNewProduct,
  putUpadateProduct,
  deleteProductById,
};

module.exports = router;
