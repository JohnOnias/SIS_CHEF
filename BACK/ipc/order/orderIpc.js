const { ipcMain } = require("electron");

const { registrarPedido, editarPedido, fecharPedido, listarItensPedido} = require("../../models/registration/order.js");
const {
  listarPedidos
} = require("../../models/registration/table.js");


const { adicionarProdutosPedido } = require("../../models/registration/order.js");
const {
  getProdutosID,

} = require("../../models/utils/produto.js");




let pedidoAtual = {
  numeroMesa: null,
  idGarcom: null,
  idPedido: null,
};

module.exports = function orderIpc() {


  // Registrar pedido 
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
    
  // Pegar produtos de uma categoria
  ipcMain.handle("getProdutosCategoria", async (event, idCategoria) => {
    try {
      // Aqui você precisa decidir qual getProdutosID usar
      // Vou usar o da primeira importação, mas você escolha
      return await getProdutosID(idCategoria);
    } catch (error) {
      console.error("Erro ao pegar produtos:", error);
      return [];
    }
  });
  ipcMain.handle("editarPedido", async (event, idPedido, dadosAtualizados) => {
    try {
        return await editarPedido(idPedido, dadosAtualizados);
    } catch (error) {
        console.error("Erro ao editar pedido:", error);
        return { success: false, error: error.message };
    } 
  });


  // Adicionar produtos ao pedido
  ipcMain.handle("adicionarProdutosPedido", async (event, idPedido, idProduto, quantidade) => {
    try {
      const resultado = await adicionarProdutosPedido(
        idPedido,
        idProduto,
        quantidade
      );
      return { success: true, data: resultado };
    } catch (err) {
      console.error("Erro ao adicionar produtos:", err);
      return { success: false, error: err.message };
    }
  });

   ipcMain.handle(
     "removerProdutoPedido",
     async (event, idPedido, idItem, quantidade) => {
       return await removerProdutoPedido(idPedido, idItem, quantidade);
     },
   );

   ipcMain.handle("fecharPedido", async (event, idPedido) => {
     try {
       const resultado = await fecharPedido(idPedido);
       return { success: true, data: resultado };
     } catch (err) {
       console.error("Erro ao fechar pedido:", err);
       return { success: false, error: err.message };
     }
});

  ipcMain.handle("listarItensPedido", async (event, idPedido) => {  
    try {      const resultado = await listarItensPedido(idPedido);
      return { success: true, data: resultado };
    } catch (err) {
      console.error("Erro ao listar itens do pedido:", err);
      return { success: false, error: err.message };
    }
  });
}

