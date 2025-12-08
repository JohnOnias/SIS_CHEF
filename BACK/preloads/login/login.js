import { contextBridge, ipcRenderer } from "electron";

function loginPreload() {
  try {
    const apiLogin = {
      // Login
      login: (email, senha) => ipcRenderer.invoke("login", email, senha),
      fecharLogin: () => ipcRenderer.invoke("fecharLogin"),

      // Redefinir senha
      chamarReset: (emailResetTest) =>
        ipcRenderer.invoke("chamar-redefinir", emailResetTest),
      abrirReset: () => ipcRenderer.invoke("abrirResetTela"),
      fecharReset: () => ipcRenderer.invoke("fecharResetTela"),
      gerarToken: (email) => ipcRenderer.invoke("gerar-token", email),
      gerarEEnviarToken: (email) =>
        ipcRenderer.invoke("gerar-e-enviar-token", email),
      validarToken: (token) => ipcRenderer.invoke("validar-token", token),
      resetarSenha: (token, novaSenha) =>
        ipcRenderer.invoke("resetar-senha", token, novaSenha),
      abrirTelaDeVerificacaoToken: () =>
        ipcRenderer.invoke("abrirTelaDeVerificacaoToken"),

      // users
      abrirTelaAdm: () => ipcRenderer.invoke("abrirTelaAdm"),
      abrirTelaGerente: () => ipcRenderer.invoke("abrirTelaGerente"),
      abrirTelaGarcom: () => ipcRenderer.invoke("abrirTelaGarcom"),
    };

    contextBridge.exposeInMainWorld("apiLogin", apiLogin);

    console.log(
      "[preload-login] API exposta com sucesso - keys:",
      Object.keys(apiLogin)
    );
  } catch (err) {
    console.error("[preload-login] ERRO ao carregar preload:", err);
  }
}

export default loginPreload;
