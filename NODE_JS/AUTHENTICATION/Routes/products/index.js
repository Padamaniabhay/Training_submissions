const express = require("express");
const {
  getProduct,
  getAbouttUs,
  getContactUs,
  postThankYou,
} = require("./../../Controller/products");

const router = express.Router();

router.get("/", getProduct);
router.get("/aboutus", getAbouttUs);
router.get("/contactus", getContactUs);
router.post("/thank-you", postThankYou);

module.exports = router;
