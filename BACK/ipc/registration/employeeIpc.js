const { ipcMain } = require("electron");
const {
  getFuncionario,
  listarFuncionarios,
  cadastrarFuncionario,
  atualizarFuncionario,
  deletarFuncionario
} = require("../../models/registration/employee.js");


module.exports = function employeeIpc() {
  // Pegar funcionários pelo tipo
  ipcMain.handle("get-funcionario", async (event, tipoFuncionario) => {
    return await getFuncionario(tipoFuncionario);
  });

  ipcMain.handle("listar-funcionarios", async (event) => {
    return await listarFuncionarios();
  });
   ipcMain.handle(
     "cadastrar-funcionario",
     async (_, nome, cpf, email, tipo, senha) => {
       return await cadastrarFuncionario(nome, cpf, email, tipo, senha);
     },
   );
   ipcMain.handle("deletar-funcionario", async( event, id) => {
      console.log("chegou no IPC", id);
      return await deletarFuncionario(id);
   });


   ipcMain.handle("atualizar-usuario", async (event, id, nome, cpf, email, tipo, novaSenha)=> {

    console.log(id, nome, cpf, email, tipo, novaSenha);

      return await atualizarFuncionario(id, nome, cpf, email, tipo, novaSenha); 
   }
   );

};
