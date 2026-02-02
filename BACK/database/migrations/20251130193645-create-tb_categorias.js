"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_categorias", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },

      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "disponivel",
      },

      descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_categorias");
  },
};
