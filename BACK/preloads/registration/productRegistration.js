const { ipcRenderer } = require("electron");

module.exports = function produtoPreload() {
  return {
    getCategorias: () => ipcRenderer.invoke("get-categorias"),

    cadastrarProduto: (nome, preco, categoria, descricao) =>
      ipcRenderer.invoke(
        "cadastrar-produto",
        nome,
        preco,
        categoria,
        descricao,
      ),

    getProdutosPorCategoria: (idCategoria) =>
      ipcRenderer.invoke("get-produtos-por-categoria", idCategoria),

    getProdutosCategoria: (categoriaId) =>
      ipcRenderer.invoke("getProdutosCategoria", categoriaId),

    getTodosProdutos: () => ipcRenderer.invoke("getTodosProdutos"),
  };
};
