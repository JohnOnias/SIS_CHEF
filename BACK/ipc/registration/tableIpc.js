import { ipcMain } from "electron";
import { criarTelaCadastroMesa } from '../../screens/cadastro/screenTable.js';
import { cadastrarMesa, getMesas } from '../../models/registration/table.js';

export function tableIpc() {
   
   ipcMain.handle("abrirCadastroMesa", async () => {
      await criarTelaCadastroMesa();
    });

    ipcMain.handle("cadastro-mesa", async (_, numero_mesa, status, n_cadeiras) => {
      return await cadastrarMesa(numero_mesa, status, n_cadeiras);
    });

    ipcMain.handle("get-mesas", async () => {
      return await getMesas();
    });
  };