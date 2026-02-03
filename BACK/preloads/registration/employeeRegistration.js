const { ipcRenderer, contextBridge } = require("electron");

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
  

  
};
};