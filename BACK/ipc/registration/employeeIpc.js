const { ipcMain } = require("electron");
const {
  getFuncionario,
  listarFuncionarios,
} = require("../../models/registration/employee.js");

module.exports = function employeeIpc() {
  // Pegar funcionários pelo tipo
  ipcMain.handle("get-funcionario", async (event, tipoFuncionario) => {
    return await getFuncionario(tipoFuncionario);
  });

  ipcMain.handle("listar-funcionarios", async (event) => {
    return await listarFuncionarios();
  });
};
