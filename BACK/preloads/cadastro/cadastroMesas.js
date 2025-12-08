import { ipcRenderer, contextBridge } from "electron";

function mesasPreload() {
  try {
    const apiMesas = {
      getMesas: () => ipcRenderer.invoke("get-mesas"),
      abrirCadastroMesa: () => ipcRenderer.invoke("abrirCadastroMesa"),
      cadastrarMesa: (numero_mesa, status, n_cadeiras) =>
        ipcRenderer.invoke("cadastro-mesa", numero_mesa, status, n_cadeiras),
    };

    // Expõe em namespace próprio
    contextBridge.exposeInMainWorld("apiMesas", apiMesas);

    console.log(
      "[preload-mesas] API exposta com sucesso - keys:",
      Object.keys(apiMesas)
    );
  } catch (err) {
    console.error("[preload-mesas] ERRO ao carregar preload:", err);
  }
}

export default mesasPreload;
