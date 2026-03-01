import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Carrega variáveis de ambiente
dotenv.config();

// Resolve caminho relativo do SQLite de forma segura
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storagePath =
  process.env.DB_STORAGE || path.join(__dirname, "../AppRestaurante.sqlite");

// Cria instância do Sequelize
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: false, // opcional: desliga logs SQL
});

// Teste de conexão (opcional)
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco estabelecida com sucesso!");
  } catch (err) {
    console.error("Não foi possível conectar ao banco:", err);
  }
})();
