"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Person", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 45],
        },
      },
      lname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 45],
        },
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 120],
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Person");
  },
};
