const { ipcRenderer } = require("electron");
const { fecharPedido, listarItensPedido } = require("../../models/registration/order");

module.exports = function pedidoPreload() {
  return {
    registrarPedido: (numeroMesa, idGarcom) =>
      ipcRenderer.invoke("registrarPedido", numeroMesa, idGarcom),
    editarPedido: (idPedido, dadosAtualizados) =>
      ipcRenderer.invoke("editarPedido", idPedido, dadosAtualizados),
    removerItem: (idPedido, idProduto, quantidade) =>
      ipcRenderer.invoke("removerProdutoPedido", idPedido, idProduto, quantidade),
    fecharPedido: (idPedido) => ipcRenderer.invoke("fecharPedido", idPedido),
    listarItensPedido: (idPedido) => ipcRenderer.invoke("listarItensPedido", idPedido),


    getMesas: () => ipcRenderer.invoke("get-mesas"),

    getGarcons: () => ipcRenderer.invoke("get-garcons"),

    getFuncionario: (tipoFuncionario) =>
      ipcRenderer.invoke("getFuncionario", tipoFuncionario),

    getCurrentUser: () => ipcRenderer.invoke("get-current-user"),

    setCurrentUser: (usuario) =>
      ipcRenderer.invoke("set-current-user", usuario),

    getDadosPedidoAtual: () => ipcRenderer.invoke("getDadosPedidoAtual"),

    getTodasCategorias: () => ipcRenderer.invoke("getTodasCategorias"),

    getProdutosCategoria: (idCategoria) =>
      ipcRenderer.invoke("getProdutosCategoria", idCategoria),

    getTodosProdutos: () => ipcRenderer.invoke("getTodosProdutos"),
    listarPedidos: (numeroMesa) =>
      ipcRenderer.invoke("listarPedidos", numeroMesa),

    adicionarProdutosPedido: (idPedido, idProduto, quantidade) =>
      ipcRenderer.invoke(
        "adicionarProdutosPedido",
        idPedido,
        idProduto,
        quantidade,
      ),
  };
};
