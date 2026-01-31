// ============================================================
// subdividir o main em controllers cada um com sua resposabilidade
// ============================================================
import pkg from "electron"; //Alterei esse import J*
const { app, ipcMain, BrowserWindow } = pkg;//Alterei esse import J*
 
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
  categoryIpc();
  produtoIpc();
  funcionarioIpc();
  tableIpc();
  resetIpc();
  userIpc();
  managerIpc();
  admIpc();
  bartenderIpc(); 
  orderIpc(); 

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
import {categoryIpc} from './ipc/registration/categoryIpc.js';  
import { productIpc } from './ipc/registration/productIpc.js';
import { employeeIpc } from './ipc/registration/employeeIpc.js';
import { tableIpc } from './ipc/registration/tableIpc.js';
import { resetIpc } from './ipc/reset/resetIpc.js';
import { userIpc } from './ipc/user/userIpc.js';  
import { managerIpc } from './ipc/employee/managerIpc.js';
import { admIpc} from './ipc/adm/admIpc.js';
import { bartenderIpc } from "./ipc/employee/bartenderIpc.js";
import { orderIpc } from "./ipc/order/orderIpc.js";

ipcMain.handle("get-msg", async () => {
  console.log("get-msg chamado no Main");
  return "Mensagem do Main para o Preload!";
});



