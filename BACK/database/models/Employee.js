import { DataTypes } from "sequelize";

export default function FuncionarioModel(sequelize) {
  const Funcionario = sequelize.define(
    "Funcionario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: { type: DataTypes.STRING, allowNull: false },
      cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      tipo: { type: DataTypes.STRING, allowNull: false },
      senha: { type: DataTypes.STRING, allowNull: false },
      reset_token: { type: DataTypes.STRING, allowNull: true },
      reset_expires: { type: DataTypes.STRING, allowNull: true },
    },
    {
      tableName: "tb_funcionarios",
      timestamps: false,
    },
  );

  return Funcionario;
}
