// ============================================================
// subdividir o main em controllers cada um com sua responsabilidade
// ============================================================
const { app, ipcMain, BrowserWindow } = require("electron");
const { createWindow } = require("./screens/createBrowserWindow.js");

// ============================================================
// importação dos IpcMains (colocado no topo para evitar hoisting issues)
// ============================================================
const loginIpc = require("./ipc/login/loginIpc.js");
const categoryIpc = require("./ipc/registration/categoryIpc.js");
//const productIpc = require('./ipc/registration/productIpc.js');
//const employeeIpc = require('./ipc/registration/employeeIpc.js');
const tableIpc = require("./ipc/registration/tableIpc.js");
const resetIpc = require("./ipc/reset/resetIpc.js");
const userIpc = require("./ipc/user/userIpc.js");
const managerIpc = require("./ipc/employee/managerIpc.js");
const admIpc = require("./ipc/adm/admIpc.js");
const bartenderIpc = require("./ipc/employee/bartenderIpc.js");
const orderIpc = require("./ipc/order/orderIpc.js");

// ============================================================
// Função para inicializar todos os IPC handlers
// ============================================================
function inicializarIpcHandlers() {
  try {
    loginIpc();
    categoryIpc();
    //produtoIpc();
    //funcionarioIpc();
    tableIpc();
    resetIpc();
    userIpc();
    managerIpc();
    admIpc();
    bartenderIpc();
    orderIpc();

    console.log("Todos os IPC handlers foram inicializados com sucesso.");
  } catch (error) {
    console.error("Erro ao inicializar IPC handlers:", error);
  }
}

// ============================================================
// Inicialização do App
// ============================================================
app.whenReady().then(() => {
  createWindow();

  // ============================================================
  // chamar os ipc
  // ============================================================
  inicializarIpcHandlers();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// ============================================================
// Exportações se necessário para outros módulos
// ============================================================
module.exports = {
  inicializarIpcHandlers,
  loginIpc,
  categoryIpc,
  tableIpc,
  resetIpc,
  userIpc,
  managerIpc,
  admIpc,
  bartenderIpc,
  orderIpc,
};
