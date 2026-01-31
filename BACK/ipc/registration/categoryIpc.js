import { ipcMain } from "electron";
import { createWindow } from "../../screens/createBrowserWindow.js";
import { cadastrarCategoria, getCategoria } from '../../models/registration/category.js';


export function categoryIpc() {

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