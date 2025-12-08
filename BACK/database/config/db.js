// back/database/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE || "../AppRestaurante.sqlite",
  logging: false, // opcional: desliga logs SQL
});

// Teste de conexão
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco estabelecida com sucesso!");
  } catch (err) {
    console.error("Não foi possível conectar ao banco:", err);
  }
})();
