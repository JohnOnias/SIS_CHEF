const { ipcRenderer } = require("electron");

module.exports = function mesasPreload() {
  return {
    ListarMesas: () => ipcRenderer.invoke("get-mesas"),

    cadastrarMesas: (numero_mesa, status, n_cadeiras) =>
      ipcRenderer.invoke("cadastro-mesa", numero_mesa, status, n_cadeiras),
  };
};
