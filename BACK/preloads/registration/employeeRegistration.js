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
    deletarFuncionario: (event ,id) => ipcRenderer.invoke("deletar-funcionario", event, id),

    listarFuncionarios: () => ipcRenderer.invoke("listar-funcionarios"),
    editarFuncionario:(event, id, nome, cpf, email, tipo, novaSenha ) => ipcRenderer.invoke("atualizar-usuario", event ,id, nome, cpf, email, tipo, novaSenha )
    
  };
 
};