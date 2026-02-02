"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_pedidos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      data_hora: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      status: {
  type: Sequelize.STRING,
  defaultValue: "aberto",
},

      valor_total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: "0.00",
      },

      id_funcionario: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "tb_funcionarios",
          key: "id",
        },
        // SQL não define CASCADE
      },
    });

    // Índice conforme o SQL
    await queryInterface.addIndex("tb_pedidos", ["id_funcionario"], {
      name: "fk_pedido_funcionario",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_pedidos");
  },
};
