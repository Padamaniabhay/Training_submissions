const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "./.env" });

module.exports = new Sequelize(
  process.env.DATABASE,
  process.env.DBUSER,
  process.env.PASSWORD,

  {
    host: "localhost",
    dialect: "mysql",
  }
);
