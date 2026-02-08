const { ipcMain } = require("electron");
const {
  cadastrarFuncionario,
} = require("../../models/registration/employee.js");

module.exports = function admIpc() {
  ipcMain.handle(
    "cadastrar-funcionario",
    async (_, nome, cpf, email, tipo, senha) => {
      return await cadastrarFuncionario(nome, cpf, email, tipo, senha);
    },
  );
}
