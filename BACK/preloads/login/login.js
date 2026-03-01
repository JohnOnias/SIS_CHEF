const { ipcRenderer } = require("electron");

module.exports = function loginPreload() {
  return {
    login: (email, senha) => ipcRenderer.invoke("login", email, senha)

   
  };
};
