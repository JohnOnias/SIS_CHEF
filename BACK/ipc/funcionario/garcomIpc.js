import { ipcMain } from 'electron';
import { createWindow } from "../../screens/createBrowserWindow.js";


export function garcomIpc() {
    ipcMain.handle('abrirTelaGarcom', async () => {
        try {
            await createWindow();

            if (loginWindow && !loginWindow.isDestroyed()) loginWindow.close();

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    });


}
