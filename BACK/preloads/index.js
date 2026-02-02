const { contextBridge, ipcRenderer } = require("electron");

// Importar todos os preloads específicos
const admPreload = require("./adm/adm.js");
const categoriaPreload = require("./registration/categoryRegistration.js");
const funcionarioPreload = require("./registration/employeeRegistration.js");
const mesasPreload = require("./registration/tableRegistration.js");
const produtoPreload = require("./registration/productRegistration.js");
const gerentePreload = require("./manager/manager.js");
const loginPreload = require("./login/login.js");
const pedidoPreload = require("./order/order.js");
const userPreload = require("./user/user.js");

// API única
const api = {
  adm: admPreload(),
  categoria: categoriaPreload(),
  funcionario: funcionarioPreload(),
  mesas: mesasPreload(),
  produto: produtoPreload(),
  gerente: gerentePreload(),
  login: loginPreload(),
  pedido: pedidoPreload(),
  user: userPreload(),

  // Métodos  globais
  testConnection: () => ipcRenderer.invoke("test-connection"),
};

// Exposição única
contextBridge.exposeInMainWorld("api", api);

console.log(
  " Preload index carregado | módulos:",
  Object.keys(api),
);
