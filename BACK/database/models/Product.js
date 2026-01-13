import { DataTypes } from "sequelize";

export default function ProdutoModel(sequelize) {
  const Produto = sequelize.define(
    "Produto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: { type: DataTypes.STRING, allowNull: false },
      preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      categoria_id: { type: DataTypes.INTEGER, allowNull: false },
      descricao: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      tableName: "tb_produtos",
      timestamps: false,
    }
  );

  return Produto;
}
