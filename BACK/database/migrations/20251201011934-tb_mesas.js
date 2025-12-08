'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('tb_mesas', {
        
       id:{
          primaryKey: true,
          type: Sequelize.INTEGER, 
          allowNull: false,
          autoIncrement: true,
         
        },
      numero: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true, 
      
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'disponivel'

      },
      n_cadeiras: {
        type: Sequelize.INTEGER,
        defaultValue: 4

      }
      });
     
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('tb_mesas');
    
  }
};
