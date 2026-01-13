"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_mesas", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },

      status: {
        type: Sequelize.ENUM("disponivel", "ocupada", "reservada"),
        allowNull: false,
        defaultValue: "disponivel",
      },

      n_cadeiras: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 4,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_mesas");
  },
};
