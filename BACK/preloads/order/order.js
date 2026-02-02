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

    abrirTelaPedido: () => ipcRenderer.invoke("abrirTelaPedido"),

    fecharTelaPedido: () => ipcRenderer.invoke("fecharTelaPedido"),

    mudarStatus: (numeroMesa) =>
      ipcRenderer.invoke("mudar-status-mesa", numeroMesa),

    abrirTelaSelecaoProdutos: () =>
      ipcRenderer.invoke("abrirTelaSelecaoProdutos"),

    fecharTelaSelecaoProdutos: () =>
      ipcRenderer.invoke("fecharTelaSelecaoProdutos"),

    getDadosPedidoAtual: () => ipcRenderer.invoke("getDadosPedidoAtual"),

    getTodasCategorias: () => ipcRenderer.invoke("getTodasCategorias"),

    getProdutosCategoria: (categoriaId) =>
      ipcRenderer.invoke("getProdutosCategoria", categoriaId),

    getTodosProdutos: () => ipcRenderer.invoke("getTodosProdutos"),

    adicionarProdutosPedido: (pedido) =>
      ipcRenderer.invoke("adicionarProdutosPedido", pedido),

    getTeste: () => ipcRenderer.invoke("get-teste"),
  };
};
