'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('tb_pedidos', {
      
     id:{
          type: Sequelize.INTEGER, 
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        
        },

    mesa_numero: {
      type: Sequelize.INTEGER,
      allowNull: false

    },
     data_criacao:{
          allowNull: false,
          type: Sequelize.DATE
        },
   status: {
        type: Sequelize.STRING,
        defaultValue: 'aberto'

      },
  valor_total: {
   type: Sequelize.DECIMAL(10, 2),
   allowNull: false


    },
        funcionario_id:{
          type: Sequelize.INTEGER, 
          allowNull: false,
             references: {       
          model: 'tb_funcionarios', 
          key: 'id'           
        },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
      
    
    
    });
     
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('tb_pedidos');
     
  }
};
