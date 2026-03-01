const { ipcRenderer } = require("electron");

module.exports = function categoriaPreload() {
  return {
    getCategorias: () => ipcRenderer.invoke("get-categorias"),

    cadastrarCategoria: (nomeCategoria, status) =>
      ipcRenderer.invoke("cadastrar-categoria", nomeCategoria, status),

    editarCategoria: (idCategoria, nome, status) =>
      ipcRenderer.invoke("editar-categoria", idCategoria, nome, status),
  };
};
