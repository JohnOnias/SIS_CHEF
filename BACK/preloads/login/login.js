const { ipcRenderer } = require("electron");

module.exports = function loginPreload() {
  return {
    login: (email, senha) => ipcRenderer.invoke("login", email, senha),

    gerarToken: (email) => ipcRenderer.invoke("gerar-token", email),

    gerarEEnviarToken: (email) =>
      ipcRenderer.invoke("gerar-e-enviar-token", email),

    validarToken: (token) => ipcRenderer.invoke("validar-token", token),

    resetarSenha: (token, novaSenha) =>
      ipcRenderer.invoke("resetar-senha", token, novaSenha),
  };
};
