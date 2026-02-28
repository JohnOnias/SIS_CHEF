const { ipcRenderer } = require("electron");


module.exports = function pedidoPreload() {
  return {
    registrarPedido: (numeroMesa, idGarcom) =>
      ipcRenderer.invoke("registrarPedido", numeroMesa, idGarcom),
    editarPedido: (idPedido, dadosAtualizados) =>
      ipcRenderer.invoke("editarPedido", idPedido, dadosAtualizados),
    removerItem: (idPedido, idProduto, quantidade) =>
      ipcRenderer.invoke("removerItem", idPedido, idProduto, quantidade),
    getListaPedidos: () => ipcRenderer.invoke("listarTodosPedidos"),
    fecharPedido: (idPedido) => ipcRenderer.invoke("fecharPedido", idPedido),
    listarItensPedido: (idPedido) =>
      ipcRenderer.invoke("listarItensPedido", idPedido),
    cancelarPedido: (idPedido) =>
      ipcRenderer.invoke("cancelarPedido", idPedido),
    listarPedidos: (numeroMesa) =>
      ipcRenderer.invoke("listarPedidos", numeroMesa),

    getDadosPedidoAtual: () => ipcRenderer.invoke("getDadosPedidoAtual"),

    getTodasCategorias: () => ipcRenderer.invoke("getTodasCategorias"),

    getProdutosCategoria: (idCategoria) =>
      ipcRenderer.invoke("getProdutosCategoria", idCategoria),

    getTodosProdutos: () => ipcRenderer.invoke("getTodosProdutos"),

    adicionarProdutosPedido: (idPedido, itens) =>
      ipcRenderer.invoke("adicionarProdutosPedido", idPedido, itens),

    atualizarItemPedido: (idPedido, idProduto, quantidade) =>
      ipcRenderer.invoke("atualizarPedido", idPedido, idProduto, quantidade),
    removerItemPedido: (idPedido, idItem) => ipcRenderer.invoke("removerItemPedido", idPedido, idItem),

  };
};
