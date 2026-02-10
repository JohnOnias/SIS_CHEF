const { ipcRenderer } = require("electron");

module.exports = function gerentePreload() {
  return {
    // User
    getCurrentUser: () => ipcRenderer.invoke("get-current-user"),

    setCurrentUser: (usuario) =>
      ipcRenderer.invoke("set-current-user", usuario),
  };
};
