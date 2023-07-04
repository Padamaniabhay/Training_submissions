//will render views using ejs engine

const express = require("express");
const path = require("path");
const { I18n } = require("i18n");

const i18n = new I18n({
  locales: ["en", "gu"],
  directory: path.join(__dirname, "Locales"),
  defaultLocale: "gu",
});

const app = express();

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(i18n.init);

app.get("/", (req, res) => {
  res.render("product-list", { products: res.__("products") });
});
app.get("/aboutus", (req, res) => {
  res.render("aboutUs");
});

app.get("/contactus", (req, res) => {
  res.render("contactUs");
});

app.post("/thank-you", (req, res) => {
  console.log(req.body);
  res.render("thankYou");
});

app.use((req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("server up and runing");
});
