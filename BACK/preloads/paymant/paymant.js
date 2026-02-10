const {ipcRenderer} = require('electron');



module.exports = function paymantPreload() {

  return {
    cadastrarPagamento: (idPedido, tipoPagamento, dividido, valorPago) =>
      ipcRenderer.invoke(
        "cadastrar-pagamento",
        idPedido,
        tipoPagamento,
        dividido,
        valorPago,
      ),

    todosOsPagamentos: () => ipcRenderer.invoke("get-pagamento"),
    buscarPagamentoPorPedidoId: (pedidoId) =>
      ipcRenderer.invoke("get-pagamento-por-pedido-id", pedidoId),  
  };


}