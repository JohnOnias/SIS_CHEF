import { DataTypes } from "sequelize";

export default function ItemPedidoModel(sequelize) {
  const ItemPedido = sequelize.define(
    "ItemPedido",
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
      },
      produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantidade: { type: DataTypes.INTEGER, allowNull: false },
      preco_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      data_criacao: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "tb_itens_pedidos",
      timestamps: false,
    }
  );

  return ItemPedido;
}
