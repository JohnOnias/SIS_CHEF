import { contextBridge, ipcRenderer } from "electron";

// testar
console.log("[preload-gerente] iniciando...");

function gerentePreload() {
  try {
    const apiGerente = {
      // Categoria API
      getCategorias: () => ipcRenderer.invoke("get-categorias"),
      cadastrarCategoria: (nomeCategoria, status) =>
        ipcRenderer.invoke("cadastrar-categoria", nomeCategoria, status),
      abrirCadastroCategoria: () =>
        ipcRenderer.invoke("abrirCadastroCategoria"),

      // Mesa API
      getMesas: () => ipcRenderer.invoke("get-mesas"),
      cadastrarMesa: (numero_mesa, status, n_cadeiras) =>
        ipcRenderer.invoke("cadastro-mesa", numero_mesa, status, n_cadeiras),
      abrirCadastroMesa: () => ipcRenderer.invoke("abrirCadastroMesa"),
      abrirTelaPedido: () => ipcRenderer.invoke("abrirTelaPedido"),

      // Produto API
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

      // User
      getCurrentUser: () => ipcRenderer.invoke("get-current-user"),
      setCurrentUser: (usuario) =>
        ipcRenderer.invoke("set-current-user", usuario),
    };

    contextBridge.exposeInMainWorld("apiGerente", apiGerente);
    console.log(
      "[preload-gerente] API exposta com sucesso - keys:",
      Object.keys(apiGerente)
    );
  } catch (err) {
    console.error("[preload-gerente] ERRO ao carregar preload:", err);

    // Expõe stub mínimo para evitar crashes
    contextBridge.exposeInMainWorld("apiGerente", {
      getCurrentUser: () => ipcRenderer.invoke("get-current-user"),
      setCurrentUser: (usuario) =>
        ipcRenderer.invoke("set-current-user", usuario),
    });
  }

  window.addEventListener("mesa-clicada", (e) => {
    console.log("EVENTO RECEBIDO NO PRELOAD:", e.detail);
    window.apiGerente.abrirTelaPedido();
  });
}

export default gerentePreload;
