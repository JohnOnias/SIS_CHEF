const { ipcMain } = require("electron");
const {
  cadastrarProduto,
  getProdutosID,
  mudarStatus,
  getTodosProdutos,
} = require("../../models/registration/product.js");



module.exports = function productIpc() {
  ipcMain.handle(
    "cadastrar-produto",
    async (event, nome, preco, idCategoria, descricao) => {
      // Corrigi os parâmetros - o primeiro é sempre o event
      return await cadastrarProduto(nome, preco, idCategoria, descricao);
    },
  );

ipcMain.handle("mudar-status", async (event, idProduto) => {
    try {
      const resultado = await mudarStatus(idProduto); 
      return { success: true, data: resultado };
    } catch (err) {
      console.error("Erro ao mudar status do produto:", err);
      return { success: false, error: err.message };
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
  ipcMain.handle("get-produtos-por-categoria", async (event, idCategoria) => {
    try {
      return await getProdutosID(idCategoria);
    } catch (error) {
      console.error("Erro ao pegar produtos por categoria:", error);
      return [];
    }  });


}

