const { ipcRenderer } = require("electron");

module.exports = function admPreload() {
  return {
    cadastrarFuncionario: (nome, cpf, email, cargo, senha) =>
      ipcRenderer.invoke(
        "cadastrar-funcionario",
        nome,
        cpf,
        email,
        cargo,
        senha,
      ),
  };
};
