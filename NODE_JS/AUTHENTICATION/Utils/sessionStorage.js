require("dotenv").config();

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//session storage
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "session",
});

store.on("error", (err) => {
  console.log(err);
});

module.exports = store;
