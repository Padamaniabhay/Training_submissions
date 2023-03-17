const path = require("path");
const fs = require("fs");
const multer = require("multer");

const express = require("express");

const app = express();

//middlewares
app.use(express.urlencoded());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, "./public/files/");
  },
  filename: (req, file, next) => {
    next(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, next) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      next(null, true);
    } else {
      next(null, false);
      return next(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
app.get("/", (req, res, next) => {
  try {
    fs.readFile("./products.json", "utf-8", (err, data) => {
      if (err) return next({ err, status: 505 });
      else {
        const products = data.toString() == "" ? [] : JSON.parse(data);
        return res.status(200).render("product-list", { products });
      }
    });
  } catch (err) {
    return next({ err, status: 505 });
  }
});

app.get("/upload", (req, res) => {
  return res.render("upload");
});

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    let products = [];
    fs.readFile("./products.json", "utf-8", (err, data) => {
      if (err) return next({ err, status: 505 });
      products = data.toString() == "" ? [] : JSON.parse(data);
      products.push({
        title: req.body.title,
        filePath: `files/${req.file.filename}`,
      });
      fs.writeFile("./products.json", JSON.stringify(products), (err) => {
        if (err) {
          return next({ status: 505, err });
        }
        return res.redirect("/");
      });
    });
  } catch (err) {
    return next({ err, status: 505 });
  }
});

app.use((req, res) => {
  return res.status(404).render("404");
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.redirect("/");
});

app.listen(3000, () => {
  console.log("server up and runing");
});
