const { ipcRenderer } = require("electron");

module.exports = function mesasPreload() {
  return {
    ListarMesas: () => ipcRenderer.invoke("get-mesas"),

    cadastrarMesas: (mesa) =>
      ipcRenderer.invoke("cadastro-mesa", mesa),
  };
};
