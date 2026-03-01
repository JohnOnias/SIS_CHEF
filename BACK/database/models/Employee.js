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
      ativo: { type: DataTypes.BOOLEAN, allowNull: true },

      resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetTokenExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "tb_funcionarios",
      timestamps: false,
    },
  );

  return Funcionario;
}
