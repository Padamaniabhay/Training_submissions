const { DataTypes } = require("sequelize");
// const becrypt = require("bcryptjs");

const sequelize = require("../Utils/sequelize");

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 45],
      },
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 45],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 120],
      },
      //   async set(value) {
      //     const salt = await becrypt.genSalt(10);
      //     const hashedpassword = await becrypt.hash(value, salt);
      //     // this.setDataValue("password", hashedpassword);
      //     return hashedpassword;
      //   },
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.getDataValue("fname")} ${this.getDataValue("lname")}`;
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = user;
