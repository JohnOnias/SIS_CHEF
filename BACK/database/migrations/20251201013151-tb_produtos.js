'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('tb_produtos', {
      
    id:{
          type: Sequelize.INTEGER, 
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        
        },
        nome:{
          type: Sequelize.STRING,
          allowNull: false,

        },
        preco: {
           type: Sequelize.DECIMAL(10, 2),
           allowNull: false


        },
         categoria_id:{
          type: Sequelize.INTEGER, 
          allowNull: false,
             references: {       
          model: 'tb_Categorias', 
          key: 'id'           
        },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        descricao: {
          type: Sequelize.TEXT,
          allowNull: false
        }

    
    });
     
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.dropTable('tb_produtos');
    
  }
};
