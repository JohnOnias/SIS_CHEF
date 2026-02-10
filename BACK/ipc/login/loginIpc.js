const { ipcMain } = require("electron");
const { login } = require("../../models/login/login.js");

module.exports = function loginIpc() {
  
  ipcMain.handle("login", async (_, email, senha) => {
    return await login(email, senha);
  });
}


