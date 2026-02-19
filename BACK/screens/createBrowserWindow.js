const { BrowserWindow } = require("electron");
const { join } = require("path");

let win; // variável global para a janela

function createWindow() {
  if (win) return win;

  win = new BrowserWindow({
    width: 1920,
    height: 1080,

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: join(__dirname, "..", "preloads", "index.js"),
    },
  });

  // Carrega sua aplicação React no Vite dev server
  win.loadURL("http://localhost:5173/");
     // serve pra testar o back sem o front
  //win.loadFile(join(__dirname, "testeBack.html"));

  win.on("closed", () => {
    win = null; // libera a referência quando a janela é fechada
  });

  return win;
}

module.exports = { createWindow };
