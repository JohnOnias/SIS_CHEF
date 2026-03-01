const { ipcRenderer } = require("electron");



module.exports = function emailPreload() {
  return {

    
    gerarEEnviarToken: (email) =>
      ipcRenderer.invoke("gerar-e-enviar-token", email),

    validarToken: (token) => ipcRenderer.invoke("validar-token", token),

    resetarSenha: (token, novaSenha) =>
      ipcRenderer.invoke("resetar-senha", token, novaSenha),

  };



}