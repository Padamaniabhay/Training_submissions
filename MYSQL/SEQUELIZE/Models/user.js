const { DataTypes } = require("sequelize");

const sequelize = require("../Utils/sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 45],
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 45],
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
