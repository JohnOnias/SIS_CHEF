import { ipcMain } from "electron";
import { criarTelaCadastroFuncionario } from '../../screens/cadastro/screenEmployee.js';
import { cadastrarFuncionario } from '../../models/registration/employee.js';


export function employeeIpc() {
        
    ipcMain.handle("cadastrar-funcionario", async (_, nome, cpf, email, senha, tipo) => {
      return await cadastrarFuncionario(nome, cpf, email, senha, tipo);
    });
    ipcMain.handle("abrirCadastroFuncionario", async () => {
      await criarTelaCadastroFuncionario();
    });
  
};