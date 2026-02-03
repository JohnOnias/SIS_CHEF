const { ipcRenderer } = require("electron");

module.exports = function gerentePreload() {
  return {
    // Categoria
    getCategorias: () => ipcRenderer.invoke("get-categorias"),

    cadastrarCategoria: (nomeCategoria, status) =>
      ipcRenderer.invoke("cadastrar-categoria", nomeCategoria, status),

    // Mesa
    getMesas: () => ipcRenderer.invoke("get-mesas"),

    cadastrarMesa: (numero_mesa, status, n_cadeiras) =>
      ipcRenderer.invoke("cadastro-mesa", numero_mesa, status, n_cadeiras),

    // Produto
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

    // User
    getCurrentUser: () => ipcRenderer.invoke("get-current-user"),

    setCurrentUser: (usuario) =>
      ipcRenderer.invoke("set-current-user", usuario),
  };
};
