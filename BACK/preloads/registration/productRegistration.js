const { ipcRenderer } = require("electron");
const { Produto } = require("../../database/models");

module.exports = function produtoPreload() {
  return {
    getCategorias: () => ipcRenderer.invoke("get-categorias"),

    cadastrarProduto: (produto) =>
      ipcRenderer.invoke(
        "cadastrar-produto",
       produto
      ),

    getProdutosPorCategoria: (idCategoria) =>
      ipcRenderer.invoke("get-produtos-por-categoria", idCategoria),

   

    getTodosProdutos: () => ipcRenderer.invoke("getTodosProdutos"),
  };
};
 //getProdutosCategoria: (categoriaId) =>
     // ipcRenderer.invoke("getProdutosCategoria", categoriaId),