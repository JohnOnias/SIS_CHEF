// ============================================================
// subdividir o main em controllers cada um com sua resposabilidade
// ============================================================
import { app, ipcMain } from "electron";
import { createWindow } from "./screens/createBrowserWindow.js";

// ============================================================
// Imports internos
// ============================================================
// home


// ============================================================
// Inicialização do App
// ============================================================
app.whenReady().then(() => {
  createWindow(); 


// ============================================================
// chamar os ipc
//=============================================================
  loginIpc();
  categoriaIpc();
  produtoIpc();
  funcionarioIpc();
  mesaIpc();
  resetIpc();
  userIpc();
  gerenteIpc();
  admIpc();
  garcomIpc(); 
  pedidoIpc(); 

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});




// ============================================================
// importação dos IpcMains
// ============================================================
import { loginIpc } from './ipc/login/loginIpc.js';
import {categoriaIpc} from './ipc/cadastro/categoriaIpc.js';  
import { produtoIpc } from './ipc/cadastro/produtoIpc.js';
import { funcionarioIpc } from './ipc/cadastro/funcionarioIpc.js';
import { mesaIpc } from './ipc/cadastro/mesaIpc.js';
import { resetIpc } from './ipc/reset/resetIpc.js';
import { userIpc } from './ipc/user/userIpc.js';  
import { gerenteIpc } from './ipc/funcionario/gerenteIpc.js';
import { admIpc} from './ipc/adm/admIpc.js';
import { garcomIpc } from "./ipc/funcionario/garcomIpc.js";
import { pedidoIpc } from "./ipc/pedido/pedidoIpc.js";

ipcMain.handle("get-msg", async () => {
  console.log("get-msg chamado no Main");
  return "Mensagem do Main para o Preload!";
});



