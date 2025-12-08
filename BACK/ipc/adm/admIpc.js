import { ipcMain } from "electron";
import { loginIpc } from "../login/loginIpc.js";
import { createWindow } from "../../screens/createBrowserWindow.js";

export function admIpc() {
  ipcMain.handle("abrirTelaAdm", async () => {
    try {
      await createWindow();
      if (loginIpc && !loginIpc.isDestroyed()) loginIpc.close();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
}
