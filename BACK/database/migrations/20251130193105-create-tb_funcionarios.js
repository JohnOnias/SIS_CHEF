'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('tb_funcionarios', 
      { 
        id:{
          type: Sequelize.INTEGER, 
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        
        },
        nome: {
          type:Sequelize.STRING,
          allowNull: false

        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true

        },
          email: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true

       },
       tipo: {
        type: Sequelize.STRING,
        allowNull: false
       },
          senha: {
          type: Sequelize.STRING,
          allowNull: false

       },
       reset_token: {
          type: Sequelize.STRING,

  
       },
        reset_expires: {
          type:Sequelize.STRING
        }

        
      
      });
     
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('tb_funcionarios');
     
  }
};
