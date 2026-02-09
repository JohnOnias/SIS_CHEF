const { ipcRenderer } = require("electron");

module.exports = function userPreload() {
  return {
    setCurrentUser: (usuario) => ipcRenderer.invoke("set-current-user", usuario),

    getCurrentUser: () => ipcRenderer.invoke("get-current-user"),
  };
};
