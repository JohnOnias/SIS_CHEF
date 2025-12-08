'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.createTable('tb_itens_pedidos', { 

      id:{
          type: Sequelize.INTEGER, 
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        
        },
      pedido_id: {
          type: Sequelize.INTEGER, 
          allowNull: false,
          references: {       
          model: 'tb_pedidos', 
          key: 'id'           
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        },
      produto_id: {
          type: Sequelize.INTEGER, 
          allowNull: false,
          references: {       
          model: 'tb_produtos', 
          key: 'id'           
        },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
      quantidade: {
            type:Sequelize.INTEGER,
            allowNull: false
        },
      preco_unitario: {
         type: Sequelize.DECIMAL(10, 2)

        },

        data_criacao:{
          allowNull: false,
          type: Sequelize.DATE
        }
    

      });
       
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.dropTable('tb_itens_pedidos');
     
  }
};
