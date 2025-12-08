import { DataTypes } from "sequelize";

export default function MesaModel(sequelize) {
  const Mesa = sequelize.define(
    "Mesa",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "disponivel",
      },
      n_cadeiras: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4,
      },
    },
    {
      tableName: "tb_mesas",
      timestamps: false,
    }
  );

  return Mesa;
}
