const { contextBridge, ipcRenderer } = require ("electron");


function pedidoPreload() {
  try {
    const apiPedido = {
      registrarPedido: (numeroMesa, idGarcom) =>
        ipcRenderer.invoke("registrarPedido", numeroMesa, idGarcom),
      getMesas: () => ipcRenderer.invoke("get-mesas"),
      getGarcons: () => ipcRenderer.invoke("get-garcons"),
      getFuncionario: (tipoFuncionario) =>
        ipcRenderer.invoke("getFuncionario", tipoFuncionario),
      getCurrentUser: () => ipcRenderer.invoke("get-current-user"),
      abrirTelaPedido: () => ipcRenderer.invoke("abrirTelaPedido"),
      setCurrentUser: (usuario) =>
        ipcRenderer.invoke("set-current-user", usuario),
      mudarStatus: (numeroMesa) =>
        ipcRenderer.invoke("mudar-status-mesa", numeroMesa),
      fecharTelaPedido: () => ipcRenderer.invoke("fecharTelaPedido"),
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
      getTeste: () => ipcRenderer.invoke("get-teste")


    };

    // Expõe em namespace próprio
    contextBridge.exposeInMainWorld("apiPedido", apiPedido);

    console.log(
      "[preload-pedido] API exposta com sucesso - keys:",
      Object.keys(apiPedido)
    );
  } catch (err) {
    console.error("[preload-pedido] ERRO ao carregar preload:", err);
  }
}

export default pedidoPreload;
