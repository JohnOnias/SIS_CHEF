import { ipcRenderer, contextBridge } from "electron";

function funcionarioPreload() {
  try {
    const apiFuncionario = {
      cadastrarFuncionario: (nome, cpf, email, cargo, senha) =>
        ipcRenderer.invoke(
          "cadastrar-funcionario",
          nome,
          cpf,
          email,
          cargo,
          senha
        ),
      abrirTelaDeCadastroFuncionario: () =>
        ipcRenderer.invoke("abrirCadastroFuncionario"),
    };

    // Expõe em namespace próprio para não sobrescrever outras APIs
    contextBridge.exposeInMainWorld("apiFuncionario", apiFuncionario);

    console.log(
      "[preload-funcionario] API exposta com sucesso - keys:",
      Object.keys(apiFuncionario)
    );
  } catch (err) {
    console.error("[preload-funcionario] ERRO ao carregar preload:", err);
  }
}

export default funcionarioPreload;
