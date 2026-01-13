import { DataTypes } from "sequelize";

export default function CategoriaModel(sequelize) {
  const Categoria = sequelize.define(
    "Categoria",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      descricao: { type: DataTypes.STRING, allowNull: true },
    },
    {
      tableName: "tb_categorias",
      timestamps: false,
    }
  );

  return Categoria;
}
