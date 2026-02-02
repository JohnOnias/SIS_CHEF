const { ipcMain } = require("electron");

let currentUser = null;

module.exports = function userIpc() {
  ipcMain.handle("set-current-user", async (_, usuario) => {
    currentUser = usuario || null;
    return { success: true };
  });

  ipcMain.handle("get-current-user", async () => currentUser);
}

