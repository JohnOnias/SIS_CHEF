const { ipcMain } = require("electron");

const { registrarPedido } = require("../../models/utils/registrarPedido.js");
const {
  listarPedidos
} = require("../../models/registration/table.js");
const {
  getProdutosID,
  adicionarProdutosPedido,
} = require("../../models/utils/produto.js");
const { getCategoria } = require("../../models/registration/category.js");
//const { inicializarTabelas } = require('../../database/db/inicializador.js');

let pedidoAtual = {
  numeroMesa: null,
  idGarcom: null,
  idPedido: null,
};

module.exports = function orderIpc() {
  // Registrar pedido com verificação de erros
  ipcMain.handle("registrarPedido", async (event, numeroMesa, idGarcom) => {
    try {
      const resultado = await registrarPedido(numeroMesa, idGarcom);
      // Armazenar dados do pedido atual
      pedidoAtual.numeroMesa = numeroMesa;
      pedidoAtual.idGarcom = idGarcom;
      pedidoAtual.idPedido = resultado.id;

      return { success: true, data: resultado };
    } catch (err) {
      console.error("Erro ao registrar pedido:", err);
      return { success: false, error: err.message };
    }
  });

  // Pegar dados do pedido atual
  ipcMain.handle("getDadosPedidoAtual", async () => {
    return pedidoAtual;
  });
  
  ipcMain.handle("listarPedidos", async (event, numeroMesa) => {
     return listarPedidos(numeroMesa);
  });
    




  // Adicionar produtos ao pedido
  ipcMain.handle("adicionarProdutosPedido", async (event, pedido) => {
    try {
      const resultado = await adicionarProdutosPedido(
        pedido.idPedido,
        pedido.produtos,
      );
      return { success: true, data: resultado };
    } catch (err) {
      console.error("Erro ao adicionar produtos:", err);
      return { success: false, error: err.message };
    }
  });
}

