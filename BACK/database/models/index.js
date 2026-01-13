import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import AdministradorModel from "./Administrator.js";
import FuncionarioModel from "./Employee.js";
import CategoriaModel from "./Category.js";
import ProdutoModel from "./Product.js";
import MesaModel from "./Table.js";
import PedidoModel from "./Order.js";
import ItemPedidoModel from "./OrderItens.js";
dotenv.config({
  path: ".env", // opcional: especificar o caminho
  quiet: true, // <-- Isso remove o aviso do dotenv
});

// Conexão com o banco
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE || "../AppRestaurante.sqlite",
  logging: false, // opcional: desliga logs SQL
});

// Inicializa os models
const Administrador = AdministradorModel(sequelize, Sequelize.DataTypes);
const Funcionario = FuncionarioModel(sequelize, Sequelize.DataTypes);
const Categoria = CategoriaModel(sequelize, Sequelize.DataTypes);
const Produto = ProdutoModel(sequelize, Sequelize.DataTypes);
const Mesa = MesaModel(sequelize, Sequelize.DataTypes);
const Pedido = PedidoModel(sequelize, Sequelize.DataTypes);
const ItemPedido = ItemPedidoModel(sequelize, Sequelize.DataTypes);

// --- Associações ---

// Categoria ↔ Produto
Categoria.hasMany(Produto, { foreignKey: "categoria_id" });
Produto.belongsTo(Categoria, { foreignKey: "categoria_id" });

// Funcionario ↔ Pedido
Funcionario.hasMany(Pedido, { foreignKey: "funcionario_id" });
Pedido.belongsTo(Funcionario, { foreignKey: "funcionario_id" });

// Pedido ↔ ItemPedido
Pedido.hasMany(ItemPedido, { foreignKey: "pedido_id" });
ItemPedido.belongsTo(Pedido, { foreignKey: "pedido_id" });

// Produto ↔ ItemPedido
Produto.hasMany(ItemPedido, { foreignKey: "produto_id" });
ItemPedido.belongsTo(Produto, { foreignKey: "produto_id" });

// Exporta tudo
export {
  sequelize,
  Sequelize,
  Administrador,
  Funcionario,
  Categoria,
  Produto,
  Mesa,
  Pedido,
  ItemPedido,
};
