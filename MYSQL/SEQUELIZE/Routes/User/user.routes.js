const express = require("express");
const User = require("../../Models/user");
const {
  getAllUser,
  getUserById,
  postNewUser,
  putUpadateUser,
  deleteUserById,
  postSearchUser,
  getProductByUserId,
} = require("../../Controllers/user");

const router = express.Router();

//get all Users
router.get("/", getAllUser);

//get particular User
router.get("/:id", getUserById);

//create new User
router.post("/create", postNewUser);

//update User
router.put("/:id", putUpadateUser);

//delete User
router.delete("/:id", deleteUserById);

//search by User name
router.post("/:fullName", postSearchUser);

//get all products of users
router.get("/products/:id", getProductByUserId);

module.exports = router;
