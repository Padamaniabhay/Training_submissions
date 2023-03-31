const fs = require("fs");
const becrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getLogout = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) return next({ err, status: 505 });
      req.user = undefined;
      return res.status(200).redirect("/login");
    });
  } catch (err) {
    return next({ err, status: 505 });
  }
};

const getSignUp = (req, res) => {
  return res.status(200).render("signUp", { isAuth: false });
};

const postSignUp = async (req, res, next) => {
  try {
    fs.readFile("./users.json", "utf-8", async (err, data) => {
      if (err) {
        return next({ status: 505, err });
      } else {
        const users = data.toString() == "" ? [] : JSON.parse(data);

        //check whether user alredy exist
        for (let i = 0; i < users.length; i++) {
          if (users[i].email === req.body.email)
            return res.status(409).redirect("/login");
        }
        const salt = await becrypt.genSalt(10);
        const hashedpassword = await becrypt.hash(req.body.password, salt);
        users.push({ email: req.body.email, password: hashedpassword });
        fs.writeFile("./users.json", JSON.stringify(users), (err) => {
          if (err) {
            return next({ status: 505, err });
          } else return res.status(200).redirect("/login");
        });
      }
    });
  } catch (err) {
    return next({ err, status: 505 });
  }
};

const getLogin = (req, res) => {
  return res.status(200).render("login", { isAuth: false });
};

const postLogin = async (req, res, next) => {
  try {
    fs.readFile("./users.json", "utf-8", async (err, data) => {
      if (err) {
        return next({ status: 505, err });
      } else {
        const users = data.toString() == "" ? [] : JSON.parse(data);

        const userIdx = users.findIndex((user) => user.email == req.body.email);
        if (userIdx < 0) return res.status(401).redirect("/login");

        const validPassword = await becrypt.compare(
          req.body.password,
          users[userIdx].password
        );
        if (!validPassword) return res.status(401).redirect("/login");

        const token = jwt.sign(users[userIdx], process.env.JWT_TOKEN);

        //to store jwt in session
        req.session.token = token;
        return res.status(200).redirect("/");

        //to store jwt in cookies
        // return res.status(200).cookie("token", token).redirect("/");
      }
    });
  } catch (err) {
    return next({ err, status: 505 });
  }
};

module.exports = { getLogout, getSignUp, postSignUp, getLogin, postLogin };
