"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_funcionarios", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      cpf: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
        defaultValue: null,
      },

      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },

      tipo: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "garçom",
      },

      senha: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      reset_token: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },

      reset_expires: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_funcionarios");
  },
};
