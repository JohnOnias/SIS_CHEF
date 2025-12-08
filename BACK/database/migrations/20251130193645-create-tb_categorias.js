'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('tb_categorias', {
       id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true, 
          autoIncrement:true
       },
         nome: {
          type:Sequelize.STRING,
          allowNull: false

        },
          status: {
          type:Sequelize.STRING,
          allowNull: false

        },
          descricao: {
          type:Sequelize.STRING,
          allowNull: true

        }
      
      });
  },
  async down (queryInterface, Sequelize) {

      await queryInterface.dropTable('tb_categorias');
    
  }
};


