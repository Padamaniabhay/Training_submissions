const { DataTypes } = require("sequelize");
const sequelize = require("../Utils/sequelize");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expDeliveryDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
      defaultValue: 5,
    },
    orderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "undelivered",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Order;
