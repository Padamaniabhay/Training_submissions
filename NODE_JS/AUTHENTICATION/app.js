const path = require("path");
const fs = require("fs");
require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");

const isAuth = require("./isAuth");

//session storage
const store = require("./Utils/sessionStorage");

//routes
const userRoutes = require("./Routes/users");
const productRoutes = require("./Routes/products");

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

app.use(userRoutes);
app.use(isAuth);
app.use(productRoutes);

app.use((req, res) => {
  return res.status(404).render("404");
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.redirect("/product");
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
