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

    getGarcons: () => ipcRenderer.invoke("get-garcons"),
    getGerentes: () => ipcRenderer.invoke("get-gerentes"),
    getFuncionario: (tipoFuncionario) =>
      ipcRenderer.invoke("get-funcionario", tipoFuncionario),
  };
};