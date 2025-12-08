import { ipcRenderer, contextBridge } from "electron";

function userPreload() {
  try {
    const apiUser = {
      setCurrentUser: (usuario) =>
        ipcRenderer.invoke("set-current-user", usuario),
      getCurrentUser: () => ipcRenderer.invoke("get-current-user"),
    };

    // Expõe em namespace próprio
    contextBridge.exposeInMainWorld("apiUser", apiUser);

    console.log(
      "[preload-user] API exposta com sucesso - keys:",
      Object.keys(apiUser)
    );
  } catch (err) {
    console.error("[preload-user] ERRO ao carregar preload:", err);
  }
}

export default userPreload;
