const { ipcRenderer } = require("electron");

module.exports = function mesasPreload() {
  return {
    listarMesas: () => ipcRenderer.invoke("get-mesas"),

    cadastrarMesas: (numero) =>
      ipcRenderer.invoke("cadastro-mesa", numero),

    
    remover: (numero) => ipcRenderer.invoke("deletar-mesa", numero),
    verificarMesaPedido: (numeroMesa) => ipcRenderer.invoke("verificar-mesa-pedido", numeroMesa),
    mudarStatusMesa: (numeroMesa) => ipcRenderer.invoke("mudar-status-mesa", numeroMesa),
    
  };
};
