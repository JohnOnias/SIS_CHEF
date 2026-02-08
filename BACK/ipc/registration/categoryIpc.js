const { ipcMain } = require("electron");
const {
  cadastrarCategoria,
  getCategoria,
} = require("../../models/registration/category.js");

module.exports = function categoryIpc() {
  
  ipcMain.handle("cadastrar-categoria", async (_, nomeCategoria, status) => {
    return await cadastrarCategoria(nomeCategoria, status);
  });

  ipcMain.handle("get-categorias", async () => {
    return await getCategoria();
  });

  // Pegar todas as categorias
  ipcMain.handle("getTodasCategorias", async () => {
    try {
      return await getCategoria();
    } catch (error) {
      console.error("Erro ao pegar categorias:", error);
      return [];
    }
  });
}

