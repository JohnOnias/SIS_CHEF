"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_produtos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "disponivel",
      },

      nome: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tb_categorias",
          key: "id",
        },
        // SQL não define CASCADE
      },

      descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
    
    });

    // Índices conforme o SQL
    await queryInterface.addIndex("tb_produtos", ["id_categoria"], {
      name: "fk_produto_categoria",
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_produtos");
  },
};
