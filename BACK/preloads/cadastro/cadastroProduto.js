import { ipcRenderer, contextBridge } from "electron";

function produtoPreload() {
  try {
    const apiProduto = {
      getCategorias: () => ipcRenderer.invoke("get-categorias"),
      cadastrarProduto: (nome, preco, categoria, descricao) =>
        ipcRenderer.invoke(
          "cadastrarProduto",
          nome,
          preco,
          categoria,
          descricao
        ),
      abrirCadastroProduto: () => ipcRenderer.invoke("abrirCadastroProduto"),
      getProdutosPorCategoria: (idCategoria) =>
        ipcRenderer.invoke("get-produtos-por-categoria", idCategoria),
    };

    // Expõe em namespace próprio
    contextBridge.exposeInMainWorld("apiProduto", apiProduto);

    console.log(
      "[preload-produto] API exposta com sucesso - keys:",
      Object.keys(apiProduto)
    );
  } catch (err) {
    console.error("[preload-produto] ERRO ao carregar preload:", err);
  }
}

export default produtoPreload;
