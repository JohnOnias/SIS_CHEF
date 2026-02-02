"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_pagamentos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      pedido_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tb_pedidos",
          key: "id",
        },
        // SQL não define CASCADE
      },

      tipo_pagamento: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: "dinheiro",
      },
    });

    // Índice conforme o SQL
    await queryInterface.addIndex("tb_pagamentos", ["pedido_id"], {
      name: "fk_id_pedido",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_pagamentos");
  },
};
