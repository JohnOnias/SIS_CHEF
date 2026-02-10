import { DataTypes } from "sequelize";

export default function PedidoModel(sequelize) {
  const Pedido = sequelize.define(
    "Pedido",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      mesa_numero: { type: DataTypes.INTEGER, allowNull: false },
      data_criacao: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "aberto",
      },
      valor_total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      id_funcionario: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "tb_pedidos",
      timestamps: false,
    },
  );

  return Pedido;
}
