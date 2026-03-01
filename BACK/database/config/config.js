import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config(); // garante que as variáveis estão carregadas

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  development: {
    dialect: "sqlite",
    storage:
      process.env.DB_STORAGE ||
      path.join(__dirname, "../AppRestaurante.sqlite"),
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:", // banco em memória para testes
  },
  production: {
    dialect: "sqlite",
    storage:
      process.env.DB_STORAGE ||
      path.join(__dirname, "../AppRestaurante.sqlite"),
  },
};
