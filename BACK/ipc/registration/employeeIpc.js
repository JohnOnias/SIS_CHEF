const { ipcMain } = require("electron");
const { getFuncionario } = require("../../models/utils/getFuncionario.js");

module.exports = function employeeIpc() {
  // Pegar funcionários pelo tipo
  ipcMain.handle("getFuncionario", async (event, tipoFuncionario) => {
    return await getFuncionario(tipoFuncionario);
  });
}

