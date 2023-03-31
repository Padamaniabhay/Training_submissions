const Product = require("../Models/proudct");
const User = require("../Models/user");
const { Op } = require("sequelize");

const getAllProduct = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    return res.json(
      await Product.findAll({ offset: (page - 1) * 2, limit: 2 })
    );
    // const p = await Product.findAll({ attributes: ["id", "fullName"] });

    // const p = await sequelize.query("select * from products", {
    //   mapToModel: true,
    //   model: Product,
    // });
    // res.json({ p });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productItem = await Product.findByPk(req.params.id);
    if (!productItem) return res.json({ message: "prdouct not found" });
    return res.json({ productItem });
  } catch (error) {
    next(error);
  }
};

const postNewProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body.product);
    const userDetails = await User.findOne({ where: { id: req.body.userID } });
    newProduct.setUser(userDetails);
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
    const productItem = await Product.findOne({ where: { id: req.params.id } });
    if (!productItem) return res.json({ message: "product not found" });
    productItem.update(req.body.product);
    return res.json({ productItem });
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const productItem = await Product.findOne({ where: { id: req.params.id } });
    if (!productItem) return res.json({ message: "product not found" });
    await productItem.destroy();
    return res.json({ message: "user deleted successfully", ...productItem });
  } catch (error) {
    next(error);
  }
};

const postSearchProduct = async (req, res, next) => {
  try {
    return res.json(
      await Product.findAll({
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

module.exports = {
  getAllProduct,
  getProductById,
  postNewProduct,
  putUpadateProduct,
  deleteProductById,
  postSearchProduct,
};
