const express = require("express");
const {
  getLogout,
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
} = require("./../../Controller/user");

const router = express.Router();

router.get("/logout", getLogout);
router.get("/signup", getSignUp);
router.post("/signup", postSignUp);
router.get("/login", getLogin);
router.post("/login", postLogin);

module.exports = router;
