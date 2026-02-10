import { DataTypes } from "sequelize";

export default function PagamentoModel(sequelize) {
  const Pagamento = sequelize.define(
    "Pagamento",    
    {
        id: {   
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,   
        },
        pedido_id: {    
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "tb_pedidos",
                key: "id",
            },
        },
        tipo_pagamento: {    
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: "dinheiro",
        },
        dividido: {    
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        valor_pago: {    
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
    },
    {   
        tableName: "tb_pagamentos",
        timestamps: false,
    }
  );    
    return Pagamento;
    }