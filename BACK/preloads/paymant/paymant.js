const { ipcRenderer } = require('electron');



module.exports = function paymantPreload() {

  return {
    cadastrarPagamento: (idPedido, tipoPagamento, valorPago, mesa) =>
      ipcRenderer.invoke(
        "cadastrar-pagamento",
        idPedido,
        tipoPagamento,
        valorPago,
        mesa
      ),

    todosOsPagamentos: () => ipcRenderer.invoke("get-pagamento"),
    buscarPagamentoPorPedidoId: (pedidoId) =>
      ipcRenderer.invoke("get-pagamento-por-pedido-id", pedidoId),  
  };


}