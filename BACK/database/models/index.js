import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import FuncionarioModel from "./Employee.js";
import CategoriaModel from "./Category.js";
import ProdutoModel from "./Product.js";
import MesaModel from "./Table.js";
import PedidoModel from "./Order.js";
import ItemPedidoModel from "./OrderItens.js";
import PagamentoModel from "./Payment.js";

dotenv.config({
  path: ".env",
  quiet: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================
// Conexão com banco
// ==========================
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../AppRestaurante.sqlite"),
  logging: false,
});

// ==========================
// Inicialização dos models
// ==========================
const Funcionario = FuncionarioModel(sequelize, Sequelize.DataTypes);
const Categoria = CategoriaModel(sequelize, Sequelize.DataTypes);
const Produto = ProdutoModel(sequelize, Sequelize.DataTypes);
const Mesa = MesaModel(sequelize, Sequelize.DataTypes);
const Pedido = PedidoModel(sequelize, Sequelize.DataTypes);
const ItemPedido = ItemPedidoModel(sequelize, Sequelize.DataTypes);
const Pagamento = PagamentoModel(sequelize, Sequelize.DataTypes);

// ==========================
// ASSOCIAÇÕES
// ==========================

// Categoria ↔ Produto
Categoria.hasMany(Produto, {
  foreignKey: "id_categoria",
  as: "produtos",
});
Produto.belongsTo(Categoria, {
  foreignKey: "id_categoria",
  as: "categoria",
});

// Funcionario ↔ Pedido
Funcionario.hasMany(Pedido, {
  foreignKey: "id_funcionario",
  as: "pedidos",
});
Pedido.belongsTo(Funcionario, {
  foreignKey: "id_funcionario",
  as: "funcionario",
});

// Mesa ↔ Pedido
Mesa.hasMany(Pedido, {
  foreignKey: "mesa_numero",
  as: "pedidos",
});
Pedido.belongsTo(Mesa, {
  foreignKey: "mesa_numero",
  as: "mesa",
});

// Pedido ↔ ItemPedido
Pedido.hasMany(ItemPedido, {
  foreignKey: "id_pedido",
  as: "itens",
});
ItemPedido.belongsTo(Pedido, {
  foreignKey: "id_pedido",
  as: "pedido",
});

// Produto ↔ ItemPedido
Produto.hasMany(ItemPedido, {
  foreignKey: "id_produto",
  as: "itensPedido",
});
ItemPedido.belongsTo(Produto, {
  foreignKey: "id_produto",
  as: "produto",
});

// Pedido ↔ Pagamento
Pedido.hasOne(Pagamento, {
  foreignKey: "id_pedido",
  as: "pagamento",
});
Pagamento.belongsTo(Pedido, {
  foreignKey: "id_pedido",
  as: "pedido",
});

// ==========================
// EXPORTS
// ==========================
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
