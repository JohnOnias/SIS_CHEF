const { ipcRenderer } = require("electron");


module.exports = function produtoPreload() {
  return {
    getCategorias: () => ipcRenderer.invoke("get-categorias"),

    cadastrarProduto: (nome, preco, idCategoria, descricao) =>
      ipcRenderer.invoke(
        "cadastrar-produto",
        nome,
        preco,
        idCategoria,
        descricao,
      ),

    getProdutosPorCategoria: (idCategoria) =>
      ipcRenderer.invoke("get-produtos-por-categoria", idCategoria),

    getTodosProdutos: () => ipcRenderer.invoke("getTodosProdutos"),
    mudarStatus: (idProduto) => ipcRenderer.invoke("mudar-status", idProduto),
    editarProduto: (idProduto, nome, preco, descricao) =>
      ipcRenderer.invoke("update-produto", idProduto, nome, preco, descricao),
  //não se deleta produto, apenas muda o status para inativo para não quebrar o database chave estrangeira
    deletarProduto: (idProduto) => ipcRenderer.invoke("deletar-produto", idProduto),
  };
};
 //getProdutosCategoria: (categoriaId) =>
     // ipcRenderer.invoke("getProdutosCategoria", categoriaId),