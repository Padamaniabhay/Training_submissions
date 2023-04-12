const { Sequelize } = require("sequelize");
const Models = require("./../Utils/Models");

const getAllUser = async (req, res, next) => {
  try {
    return res.status(200).json(
      await Models.User.findAll({
        include: [
          {
            model: Models.Product,
            attributes: {
              exclude: ["id", "userId"],
            },
          },
          {
            model: Models.Order,
            attributes: {
              exclude: ["id", "userId"],
            },
            include: {
              model: Models.Product,
              attributes: {
                exclude: ["id", "userId"],
              },
            },
          },
        ],
        attributes: {
          exclude: ["id"],
        },
      })
    );
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userDetails = await Models.User.findByPk(req.params.id);
    if (!userDetails)
      return res.status(404).json({ message: "user not found" });
    return res.status(200).json({ userDetails });
  } catch (error) {
    return next(error);
  }
};

const postNewUser = async (req, res, next) => {
  try {
    const newUser = await Models.User.create(req.body.user);
    return res.status(200).json({
      message: "User created successfully!!",
      ...newUser,
    });
  } catch (error) {
    return next(error);
  }
};

const putUpadateUser = async (req, res, next) => {
  try {
    const userDetails = await Models.User.update(req.body.user, {
      where: { id: req.params.id },
    });
    if (!userDetails)
      return res.status(404).json({ message: "user not found" });
    return res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    return next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const userDetails = await Models.User.destroy({
      where: { id: req.params.id },
    });
    if (!userDetails)
      return res.status(404).json({ message: "user not found" });
    return res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

const getMostActiveUser = async (req, res, next) => {
  try {
    const mostActiveUser = await Models.Order.findAll({
      attributes: [
        "userId",
        [Sequelize.fn("count", Sequelize.col("userId")), "totalOrders"],
      ],
      group: ["userId"],
      order: [["totalOrders", "DESC"]],
      limit: 5,
    });
    if (!mostActiveUser)
      return res.status(404).json({ message: "user not found" });
    return res.status(200).json({ mostActiveUser });
  } catch (error) {
    return next(error);
  }
};

const getInActiveUser = async (req, res, next) => {
  try {
    const inActiveUsers = await Models.User.findAll({
      include: [
        {
          model: Models.Order,
          required: false,
          attributes: [],
        },
      ],
      where: {
        "$orders.id$": null,
      },
    });
    if (!inActiveUsers)
      return res.status(404).json({ message: "user not found" });
    return res.status(200).json({ inActiveUsers });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUser,
  getUserById,
  postNewUser,
  putUpadateUser,
  deleteUserById,
  getMostActiveUser,
  getInActiveUser,
};
