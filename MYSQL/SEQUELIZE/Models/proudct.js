const { DataTypes } = require("sequelize");
const sequelize = require("../Utils/sequelize");

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
      validate: {
        len: [5, 45],
      },
      get() {
        return this.getDataValue("pname").toUpperCase();
      },
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0,
      },
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
