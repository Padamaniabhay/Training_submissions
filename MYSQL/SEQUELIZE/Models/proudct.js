const { DataTypes } = require("sequelize");
const sequelize = require("../Utils/sequelize");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 45],
      },
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Product;
