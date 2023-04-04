const Models = require("./../Utils/Models");

const getAllUser = async (req, res, next) => {
  try {
    return res.json(
      await Models.User.findAll({
        include: {
          all: true,
          nested: true,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
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
    if (!userDetails) return res.json({ message: "user not found" });
    return res.json({ userDetails });
  } catch (error) {
    return next(error);
  }
};

const postNewUser = async (req, res, next) => {
  try {
    const newUser = await Models.User.create(req.body.user);
    return res.json({
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
    if (!userDetails) return res.json({ message: "user not found" });
    return res.json({ message: "user updated successfully" });
  } catch (error) {
    return next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const userDetails = await Models.User.destroy({
      where: { id: req.params.id },
    });
    if (!userDetails) return res.json({ message: "user not found" });
    return res.json({ message: "user deleted successfully" });
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
};
