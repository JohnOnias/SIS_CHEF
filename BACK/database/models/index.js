import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import AdministradorModel from "./Administrador.js";
import FuncionarioModel from "./Funcionario.js";
import CategoriaModel from "./Categoria.js";
import ProdutoModel from "./Produto.js";
import MesaModel from "./Mesa.js";
import PedidoModel from "./Pedido.js";
import ItemPedidoModel from "./ItemPedido.js";

dotenv.config();

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
