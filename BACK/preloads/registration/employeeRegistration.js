const { ipcRenderer} = require("electron");


module.exports = function funcionarioPreload() {
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

    getFuncionario: (tipoFuncionario) =>
      ipcRenderer.invoke("get-funcionario", tipoFuncionario),

    listarFuncionarios: () => ipcRenderer.invoke("listar-funcionarios"),
  };
};