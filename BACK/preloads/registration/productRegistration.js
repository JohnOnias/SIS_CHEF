const { ipcRenderer } = require("electron");


module.exports = function produtoPreload() {
  return {
    getCategorias: () => ipcRenderer.invoke("get-categorias"),

    cadastrarProduto: (nome, preco, idCategoria, descricao) =>
      ipcRenderer.invoke(
        "cadastrar-produto",
       nome, preco, idCategoria, descricao
      ),

    getProdutosPorCategoria: (idCategoria) =>
      ipcRenderer.invoke("get-produtos-por-categoria", idCategoria),

   
    getTodosProdutos: () => ipcRenderer.invoke("getTodosProdutos"),
    mudarStatus: (idProduto) => ipcRenderer.invoke("mudar-status", idProduto),

  };
};
 //getProdutosCategoria: (categoriaId) =>
     // ipcRenderer.invoke("getProdutosCategoria", categoriaId),