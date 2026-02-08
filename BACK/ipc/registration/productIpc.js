const { ipcMain } = require("electron");
const {
  cadastrarProduto,
  getProdutosID,
} = require("../../models/registration/product.js");
const {
  getProdutosID: getProdutosIDUtils,
  getTodosProdutos,
} = require("../../models/utils/produto.js");



module.exports = function productIpc() {
  ipcMain.handle(
    "cadastrar-produto",
    async (event, produto) => {
      // Corrigi os parâmetros - o primeiro é sempre o event
      return await cadastrarProduto(produto);
    },
  );



  ipcMain.handle("getTodosProdutos", async () => {
    try {
      return await getTodosProdutos();
    } catch (error) {
      console.error("Erro ao pegar produtos:", error);
      return [];
    }
  });
}

