import { DataTypes } from "sequelize";

export default function AdministradorModel(sequelize) {
  const Administrador = sequelize.define(
    "Administrador",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      senha: { type: DataTypes.STRING, allowNull: false },
      reset_token: { type: DataTypes.STRING },
      reset_expires: { type: DataTypes.STRING },
    },
    {
      tableName: "tb_administrador",
      timestamps: false,
    }
  );

  return Administrador;
}
