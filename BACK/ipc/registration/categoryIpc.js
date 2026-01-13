import { ipcMain } from "electron";
import { createWindow } from "../../screens/createBrowserWindow.js";
import { cadastrarCategoria, getCategoria } from '../../models/cadastro/categoria.js';


export function categoriaIpc() {

  ipcMain.handle("abrirCadastroCategoria", async () => {
    await createWindow();
    return { success: true };
  });

  ipcMain.handle("cadastrar-categoria", async (_, nomeCategoria, status) => {
    return await cadastrarCategoria(nomeCategoria, status);
  });
  ipcMain.handle("get-categorias", async () => {
    return await getCategoria();
  });

};