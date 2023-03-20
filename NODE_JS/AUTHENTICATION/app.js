const path = require("path");
const fs = require("fs");
require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const becrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const MongoDBStore = require("connect-mongodb-session")(session);

const isAuth = require("./isAuth");

//session storage
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "session",
});

store.on("error", (err) => {
  console.log(err);
});

const app = express();

//middlewares
app.use(express.urlencoded());
app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000/" }));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

//session middleware
app.use(
  session({
    secret: process.env.SESSION_TOKEN,
    cookie: { expires: 60 * 60 * 1000 }, //one hour
    store: store, //mongodb as a storage
  })
);

app.get("/logout", (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) return next({ err, status: 505 });
      req.user = undefined;
      return res.status(200).redirect("/login");
    });
  } catch (err) {
    return next({ err, status: 505 });
  }
});

app.get("/signup", (req, res) => {
  return res.status(200).render("signUp", { isAuth: false });
});

app.post("/signup", async (req, res, next) => {
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
});

app.get("/login", (req, res) => {
  return res.status(200).render("login", { isAuth: false });
});

app.post("/login", async (req, res, next) => {
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
});

//jwt token verification middlewares
app.use(isAuth);

app.get("/", (req, res, next) => {
  try {
    fs.readFile("./products.json", "utf-8", (err, data) => {
      if (err) next({ err, status: 505 });
      else {
        const products = data.toString() == "" ? [] : JSON.parse(data);

        return res
          .status(200)
          .render("product-list", { products, isAuth: req.user.isAuth });
      }
    });
  } catch (err) {
    return next({ err, status: 505 });
  }
});
app.get("/aboutus", (req, res) => {
  return res.status(200).render("aboutUs", { isAuth: req.user.isAuth });
});

app.get("/contactus", (req, res) => {
  return res.status(200).render("contactUs", { isAuth: req.user.isAuth });
});

app.post("/thank-you", (req, res) => {
  console.log(req.body);
  return res.status(200).render("thankYou", { isAuth: req.user.isAuth });
});

app.use((req, res) => {
  return res.status(404).render("404");
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.redirect("/logout");
});

app.listen(process.env.PORT, () => {
  console.log("server up and runing");
});

// // Create a JWT token
// const payload = { username: "johndoe" };
// const secretKey = "mysecretkey";
// const token = jwt.sign(payload, secretKey);

// console.log(token); // Print the JWT token

// // Verify a JWT token
// jwt.verify(token, secretKey, (err, decoded) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(decoded); // Print the decoded payload
//   }
// });

// // Decode a JWT token (without verification)
// const decodedToken = jwt.decode(token);
// console.log(decodedToken); // Print the decoded payload
