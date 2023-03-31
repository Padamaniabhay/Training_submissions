const { Op } = require("sequelize");
const becrypt = require("bcryptjs");

const User = require("../Models/user");
const product = require("../Models/proudct");

const getAllUser = async (req, res, next) => {
  try {
    return res.json(await User.findAll());
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userDetails = await User.findByPk(req.params.id);
    if (!userDetails) return res.json({ message: "user not found" });
    return res.json({ userDetails });
  } catch (error) {
    next(error);
  }
};

const postNewUser = async (req, res, next) => {
  try {
    const newUser = await User.build(req.body.user);
    const salt = await becrypt.genSalt(10);
    const hashedpassword = await becrypt.hash(req.body.user.password, salt);
    newUser.setDataValue("password", hashedpassword);
    newUser.save();
    return res.json({
      message: "User created successfully!!",
      ...newUser,
    });
  } catch (error) {
    next(error);
  }
};

const putUpadateUser = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ where: { id: req.params.id } });
    if (!userDetails) return res.json({ message: "user not found" });

    userDetails.update(req.body.User);
    return res.json({ userDetails });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ where: { id: req.params.id } });
    if (!userDetails) return res.json({ message: "user not found" });
    await userDetails.destroy();
    return res.json({ message: "user deleted successfully", ...userDetails });
  } catch (error) {
    next(error);
  }
};

const postSearchUser = async (req, res, next) => {
  try {
    return res.json(
      await User.findAll({
        where: {
          fullName: {
            [Op.like]: `%${req.params.fullName}%`,
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
    // const user = await User.findByPk(req.params.id);
    // if (!user) return res.json({ message: "user not found" });
    // const Products = await user.getProducts();
    // if (!Products) return res.json({ message: "product not found" });
    // return res.json({ Products });

    const user = await User.findByPk(req.params.id, {
      include: [{ model: product }],
    });
    if (!user) return res.json({ message: "user not found" });
    return res.json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  getUserById,
  postNewUser,
  putUpadateUser,
  deleteUserById,
  postSearchUser,
  getProductByUserId,
};
