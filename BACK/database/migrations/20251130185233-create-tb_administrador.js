'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('tb_administrador',
       {
         id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true, 
          autoIncrement:true
       },
    
       nome: {
         type: Sequelize.STRING,
         allowNull: false,

       },
       email: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true

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
 
     await queryInterface.dropTable('tb_administrador');
     
  }
};
