const { ipcMain } = require("electron");
const {
  cadastrarPagamento,
  todosOsPagamentos,
  buscarPagamentoPorPedidoId,
} = require("../../models/payment/payment.js");

module.exports = function paymentIpc() {
  ipcMain.handle(
    "cadastrar-pagamento",
    async (_, idPedido, tipoPagamento, valorPago, mesaId) => {
      return await cadastrarPagamento(
        idPedido,
        tipoPagamento,
        valorPago,
        mesaId,
      );
    },
  );

  ipcMain.handle("get-pagamento", async () => {
    return await todosOsPagamentos();
  });

  ipcMain.handle("get-pagamento-por-pedido-id", async (_, pedidoId) => {
    return await buscarPagamentoPorPedidoId(pedidoId);
  });
};
