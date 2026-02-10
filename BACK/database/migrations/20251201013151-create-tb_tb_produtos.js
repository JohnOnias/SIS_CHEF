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

      id_mesa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: "tb_mesas",
          key: "id",
        },
        // SQL não define CASCADE
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

      categoria_id: {
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
    await queryInterface.addIndex("tb_produtos", ["categoria_id"], {
      name: "fk_produto_categoria",
    });

    await queryInterface.addIndex("tb_produtos", ["id_mesa"], {
      name: "fk_mesa_produto",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_produtos");
  },
};
