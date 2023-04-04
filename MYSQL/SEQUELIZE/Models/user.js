const { DataTypes } = require("sequelize");
// const becrypt = require("bcryptjs");

const sequelize = require("../Utils/sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 45],
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 45],
    },
  },
});

module.exports = User;
