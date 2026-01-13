import { ipcMain } from "electron";
import { criarTelaCadastroFuncionario } from '../../screens/cadastro/screenFuncionario.js';
import { cadastrarFuncionario } from '../../models/cadastro/funcionario.js';


export function funcionarioIpc() {
        
    ipcMain.handle("cadastrar-funcionario", async (_, nome, cpf, email, senha, tipo) => {
      return await cadastrarFuncionario(nome, cpf, email, senha, tipo);
    });
    ipcMain.handle("abrirCadastroFuncionario", async () => {
      await criarTelaCadastroFuncionario();
    });
  
};