const { DataTypes } = require("sequelize");
const sequelize = require("../Utils/sequelize");

const OrderDetails = sequelize.define("orderDetails", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
    defaultValue: 1,
  },
});

module.exports = OrderDetails;
