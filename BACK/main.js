// ============================================================
// ============================================================
const { app, BrowserWindow } = require("electron");
const { createWindow } = require("./screens/createBrowserWindow.js");

// ============================================================
// importação dos IpcMains dos diversos módulos
// ============================================================
const loginIpc = require("./ipc/login/loginIpc.js");
const categoryIpc = require("./ipc/registration/categoryIpc.js");
const productIpc = require("./ipc/registration/productIpc.js");
const tableIpc = require("./ipc/registration/tableIpc.js");
const userIpc = require("./ipc/user/userIpc.js");
const orderIpc = require("./ipc/order/orderIpc.js");
const employeeIpc = require("./ipc/registration/employeeIpc.js");
const paymantIpc = require("./ipc/paymant/paymantIpc.js");
const emailIpc = require("./ipc/email/emailIpc.js");

// ============================================================
// Função para inicializar todos os IPC handlers
// ============================================================
function inicializarIpcHandlers() {
  try {
    loginIpc();
    categoryIpc();
    employeeIpc();
    productIpc();
    tableIpc();
    userIpc();
    orderIpc();
    paymantIpc();
    emailIpc();

    console.log("Todos os IPC handlers foram inicializados com sucesso.");
  } catch (error) {
    console.error("Erro ao inicializar IPC handlers:", error);
  }
}

// ============================================================
// Inicialização do App
// ============================================================
app.whenReady().then(() => {
  inicializarIpcHandlers();
  createWindow();

  // ============================================================
  // chamar os ipc
  // ============================================================

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
  employeeIpc,
  categoryIpc,
  tableIpc,
  userIpc,
  orderIpc,
};
