import { ipcRenderer, contextBridge } from "electron";

function categoriaPreload() {
  try {
    const apiCategoria = {
      getCategorias: () => ipcRenderer.invoke("get-categorias"),
      cadastrarCategoria: (nomeCategoria, status) =>
        ipcRenderer.invoke("cadastrar-categoria", nomeCategoria, status),
      abrirCadastroCategoria: () =>
        ipcRenderer.invoke("abrirCadastroCategoria"),
    };

    contextBridge.exposeInMainWorld("apiCategoria", apiCategoria);

    console.log(
      "[preload-categoria] API exposta com sucesso - keys:",
      Object.keys(apiCategoria)
    );
  } catch (err) {
    console.error("[preload-categoria] ERRO ao carregar preload:", err);
  }
}

export default categoriaPreload;
