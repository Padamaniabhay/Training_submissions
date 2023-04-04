const express = require("express");
const {
  getAllUser,
  getUserById,
  postNewUser,
  putUpadateUser,
  deleteUserById,
} = require("../../Controllers/user");

const router = express.Router();

//get all Users
router.get("/", getAllUser);

//get particular User
router.get("/:id", getUserById);

//create new User
router.post("/", postNewUser);

//update User
router.put("/:id", putUpadateUser);

//delete User
router.delete("/:id", deleteUserById);

module.exports = router;
