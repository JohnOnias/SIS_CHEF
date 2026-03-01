const { ipcMain } = require("electron");
const { gerarToken, validarToken, resetarSenha } = require("../../models/email/email.js");












module.exports = function emailIpc() {
  
ipcMain.handle("gerar-e-enviar-token", async (_, email) => {
  return await gerarToken(email);
});

ipcMain.handle("validar-token", async (_, token) => {
  return await validarToken(token);
});

ipcMain.handle("resetar-senha", async (_, token, novaSenha) => {
  return await resetarSenha(token, novaSenha);
});


}