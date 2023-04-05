const { Op, Sequelize } = require("sequelize");
const Models = require("../Utils/Models");

const getAllProduct = async (req, res, next) => {
  try {
    return res.json(await Models.Product.findAll());
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productItem = await Models.Product.findByPk(req.params.id);
    if (!productItem) return res.json({ message: "prdouct not found" });
    return res.json({ productItem });
  } catch (error) {
    next(error);
  }
};

const postNewProduct = async (req, res, next) => {
  try {
    const user = await Models.User.findByPk(req.body.userID);
    if (!user) return res.json({ message: "user not found" });
    const newProduct = await Models.Product.create(req.body.product);
    await newProduct.setUser(req.body.userID);
    return res.json({
      message: "product created successfully!!",
      ...newProduct,
    });
  } catch (error) {
    next(error);
  }
};

const putUpadateProduct = async (req, res, next) => {
  try {
    const productItem = await Models.Product.update(req.body.product, {
      where: { id: req.params.id },
    });
    if (!productItem[0]) return res.json({ message: "product not found" });
    return res.json({ message: "prdouct updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const productItem = await Models.Product.destroy({
      where: { id: req.params.id },
    });
    if (!productItem) return res.json({ message: "product not found" });
    return res.json({
      message: "product deleted successfully",
      ...productItem,
    });
  } catch (error) {
    next(error);
  }
};

const postSearchProduct = async (req, res, next) => {
  try {
    return res.json(
      await Models.Product.findAll({
        where: {
          pname: {
            [Op.like]: `%${req.params.pname}%`,
          },
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

const getProductByUserId = async (req, res, next) => {
  try {
    const products = await Models.Product.findAll({
      where: {
        userId: req.params.id,
      },
    });
    if (!products) return res.json({ message: "product not found" });
    return res.json({ products });
  } catch (error) {
    return next(error);
  }
};

const getMostPurchasedProduct = async (req, res, next) => {
  try {
    const mostPurchasedProduct = await Models.OrderDetails.findAll({
      attributes: [
        "productId",
        [Sequelize.fn("sum", Sequelize.col("quantity")), "productCount"],
      ],
      include: {
        model: Models.Product,
        attributes: ["pname", "price"],
      },
      order: [["productCount", "DESC"]],
      group: "productId",
      limit: 5,
    });
    if (!mostPurchasedProduct)
      return res.json({ message: "product not found" });
    return res.json({ mostPurchasedProduct });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  postNewProduct,
  putUpadateProduct,
  deleteProductById,
  postSearchProduct,
  getProductByUserId,
  getMostPurchasedProduct,
};
