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
    async (event, nome, preco, categoria, descricao) => {
      // Corrigi os parâmetros - o primeiro é sempre o event
      return await cadastrarProduto(nome, preco, categoria, descricao);
    },
  );

  // Pegar produtos de uma categoria
  ipcMain.handle("getProdutosCategoria", async (event, categoriaId) => {
    try {
      // Aqui você precisa decidir qual getProdutosID usar
      // Vou usar o da primeira importação, mas você escolha
      return await getProdutosID(categoriaId);
    } catch (error) {
      console.error("Erro ao pegar produtos:", error);
      return [];
    }
  });

  ipcMain.handle("getTodosProdutos", async () => {
    try {
      return await getTodosProdutos();
    } catch (error) {
      console.error("Erro ao pegar produtos:", error);
      return [];
    }
  });
}

