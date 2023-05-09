const express = require("express");
const {
  getAllUser,
  getUserById,
  postNewUser,
  putUpadateUser,
  deleteUserById,
  getMostActiveUser,
  getInActiveUser,
} = require("../../Controllers/user");

const router = express.Router();

//get all Users
router.get("/", getAllUser);

//get top 5 most active users
router.get("/active", getMostActiveUser);

//get top 5 most inactive users
router.get("/inactive", getInActiveUser);

//get particular User
router.get("/:id", getUserById);

//create new User
router.post("/", postNewUser);

//update User
router.put("/:id", putUpadateUser);

//delete User
router.delete("/:id", deleteUserById);

module.exports = router;
