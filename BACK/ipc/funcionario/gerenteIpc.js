import { ipcMain } from 'electron';
import { createWindow } from "../../screens/createBrowserWindow.js";


export function gerenteIpc() {
    ipcMain.handle('abrirTelaGerente', async () => {
        try {
            await createWindow();

            if (loginWindow && !loginWindow.isDestroyed()) loginWindow.close();

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    });


}
