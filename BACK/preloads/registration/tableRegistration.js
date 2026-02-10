const { ipcRenderer } = require("electron");

module.exports = function mesasPreload() {
  return {
    listarMesas: () => ipcRenderer.invoke("get-mesas"),

    cadastrarMesas: (mesa) =>
      ipcRenderer.invoke("cadastro-mesa", mesa),
    deletarMesa: (numero) => ipcRenderer.invoke("deletar-mesa", numero),
    verificarMesaPedido: (numeroMesa) => ipcRenderer.invoke("verificar-mesa-pedido", numeroMesa),
    mudarStatusMesa: (numeroMesa) => ipcRenderer.invoke("mudar-status-mesa", numeroMesa),
    
  };
};
