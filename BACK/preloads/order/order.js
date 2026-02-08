const { ipcRenderer } = require("electron");

module.exports = function pedidoPreload() {
  return {
    registrarPedido: (numeroMesa, idGarcom) =>
      ipcRenderer.invoke("registrarPedido", numeroMesa, idGarcom),

    getMesas: () => ipcRenderer.invoke("get-mesas"),

    getGarcons: () => ipcRenderer.invoke("get-garcons"),

    getFuncionario: (tipoFuncionario) =>
      ipcRenderer.invoke("getFuncionario", tipoFuncionario),

    getCurrentUser: () => ipcRenderer.invoke("get-current-user"),

    setCurrentUser: (usuario) =>
      ipcRenderer.invoke("set-current-user", usuario),

    mudarStatus: (numeroMesa) =>
      ipcRenderer.invoke("mudar-status-mesa", numeroMesa),

    getDadosPedidoAtual: () => ipcRenderer.invoke("getDadosPedidoAtual"),

    getTodasCategorias: () => ipcRenderer.invoke("getTodasCategorias"),

    getProdutosCategoria: (idCategoria) =>
      ipcRenderer.invoke("getProdutosCategoria", idCategoria),

    getTodosProdutos: () => ipcRenderer.invoke("getTodosProdutos"),
      listarPedidos: (numeroMesa) => ipcRenderer.invoke("listarPedidos", numeroMesa),

    adicionarProdutosPedido: (pedido) =>
      ipcRenderer.invoke("adicionarProdutosPedido", pedido),

  };
};
