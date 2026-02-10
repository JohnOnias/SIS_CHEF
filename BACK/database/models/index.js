import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import FuncionarioModel from "./Employee.js";
import CategoriaModel from "./Category.js";
import ProdutoModel from "./Product.js";
import MesaModel from "./Table.js";
import PedidoModel from "./Order.js";
import ItemPedidoModel from "./OrderItens.js";
import PagamentoModel from "./Payment.js";

dotenv.config({
  path: ".env", // opcional: especificar o caminho
  quiet: true, // <-- Isso remove o aviso do dotenv
});
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexão com o banco
const sequelize = new Sequelize({
  dialect: "sqlite",
  //storage: process.env.DB_STORAGE || "../AppRestaurante.sqlite",
  storage: path.join(__dirname, "../AppRestaurante.sqlite"),
  logging: false, // opcional: desliga logs SQL
});

// Inicializa os models
const Funcionario = FuncionarioModel(sequelize, Sequelize.DataTypes);
const Categoria = CategoriaModel(sequelize, Sequelize.DataTypes);
const Produto = ProdutoModel(sequelize, Sequelize.DataTypes);
const Mesa = MesaModel(sequelize, Sequelize.DataTypes);
const Pedido = PedidoModel(sequelize, Sequelize.DataTypes);
const ItemPedido = ItemPedidoModel(sequelize, Sequelize.DataTypes);
const Pagamento = PagamentoModel(sequelize, Sequelize.DataTypes);

// --- Associações ---

// Categoria ↔ Produto
Categoria.hasMany(Produto, { foreignKey: "id_categoria" });
Produto.belongsTo(Categoria, { foreignKey: "id_categoria" });

// Funcionario ↔ Pedido
Funcionario.hasMany(Pedido, { foreignKey: "id_funcionario" });
Pedido.belongsTo(Funcionario, { foreignKey: "id_funcionario" });


// Pedido ↔ ItemPedido
Pedido.hasMany(ItemPedido, { 
  foreignKey: "id_pedido",
  as: "itens"
});

ItemPedido.belongsTo(Pedido, { 
  foreignKey: "id_pedido",
  as: "pedido"
});

// Produto ↔ ItemPedido
Produto.hasMany(ItemPedido, { foreignKey: "id_produto" });
ItemPedido.belongsTo(Produto, { foreignKey: "id_produto" });

// Pagamento ↔ Pedido
Pedido.hasOne(Pagamento, {
   foreignKey: "id_pedido",
   as: "pagamento"});
Pagamento.belongsTo(Pedido, { 
  foreignKey: "id_pedido",
  as: "pedido"});

// Exporta tudo
export {
  sequelize,
  Sequelize,
  Funcionario,
  Categoria,
  Produto,
  Mesa,
  Pedido,
  ItemPedido,
  Pagamento,
};
