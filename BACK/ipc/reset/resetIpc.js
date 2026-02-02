const { ipcMain } = require("electron");
const {
  salvarToken,
  validarToken,
  enviarTokenEmail,
} = require("../../models/reset/token.js");
const { atualizarSenha } = require("../../models/reset/reset.js");

module.exports = function resetIpc() {
  // Estas variáveis/funções não estão definidas - você precisa implementá-las
  // let VerificacaoToken = null;
  // let resetWindow = null;



  ipcMain.handle("gerar-token", async (_, email) => {
    return await salvarToken(email);
  });

  ipcMain.handle("gerar-e-enviar-token", async (_, email) => {
    const resultado = await salvarToken(email);
    if (!resultado) return null;

    try {
      await enviarTokenEmail(email, resultado.token);
      return { sucesso: true };
    } catch (err) {
      return { sucesso: false, erro: err.message };
    }
  });

  ipcMain.handle("validar-token", async (_, token) => {
    return (await validarToken(token)) ? true : false;
  });

  ipcMain.handle("resetar-senha", async (_, token, novaSenha) => {
    return await atualizarSenha(token, novaSenha);
  });

  ipcMain.handle("chamar-redefinir", async (_, email) => {
    return await verificarEmailCadastrado(email);
  });
}

