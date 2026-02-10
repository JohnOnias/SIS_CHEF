"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_itens_pedidos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      id_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tb_pedidos",
          key: "id",
        },
        // SQL não define CASCADE, então não adicionamos
      },

      id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tb_produtos",
          key: "id",
        },
        // SQL não define CASCADE, então não adicionamos
      },

      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      data_criacao: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Índices conforme o SQL
    await queryInterface.addIndex("tb_itens_pedidos", ["id_pedido"], {
      name: "fk_item_pedido",
    });

    await queryInterface.addIndex("tb_itens_pedidos", ["id_produto"], {
      name: "fk_item_produto",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_itens_pedidos");
  },
};
