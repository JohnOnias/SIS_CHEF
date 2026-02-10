const { ipcMain } = require("electron");
const {
  cadastrarPagamento,
  todosOsPagamentos,
   buscarPagamentoPorPedidoId
} = require("../../models/payment/payment.js");

exports = function paymantIpc() {
  ipcMain.handle(
    "cadastrar-pagamento",
    async (_, idPedido, tipoPagamento, dividido, valorPago) => {
      return await cadastrarPagamento(idPedido, tipoPagamento, dividido, valorPago);
    },
  );

  ipcMain.handle("get-pagamento", async () => {
    return await todosOsPagamentos();
  });
  ipcMain.handle("get-pagamento-por-pedido-id", async (_, pedidoId) => {
    return await buscarPagamentoPorPedidoId(pedidoId);
  });
};
