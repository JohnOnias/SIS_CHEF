// FRONT/src/services/apiCheck.js
import { isElectron } from "./api";

export function warnIfNotElectron() {
  if (!isElectron) {
    console.warn(
      "[IPC] window.api não disponível. Você está no Chrome (sem Electron/preload). " +
      "As telas podem abrir, mas chamadas ao backend não vão funcionar."
    );
  }
}
