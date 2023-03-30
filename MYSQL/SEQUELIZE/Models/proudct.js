const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const product = sequelize.define(
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
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ["price"],
      },
    ],
  }
);

module.exports = product;
