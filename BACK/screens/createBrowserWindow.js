import pkg from "electron";
const { BrowserWindow } = pkg;
import { fileURLToPath } from "url";
import { dirname, join } from "path";

let win; // variável global para a janela

// Corrige __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function createWindow() {
  if (win) return win;

  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "..", "preloads", "index.js"),
    },
  });

  // Carrega sua aplicação React no Vite dev server
  win.loadURL("http://localhost:5173/#garcom");

  win.on("closed", () => {
    win = null; // libera a referência quando a janela é fechada
  });

  return win;
}
