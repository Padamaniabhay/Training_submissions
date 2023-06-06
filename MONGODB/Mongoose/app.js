const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.listen(3000, async () => {
  try {
    await mongoose.connect("");
    console.log("server is up and runnig");
  } catch (error) {
    console.log(error);
  }
});
