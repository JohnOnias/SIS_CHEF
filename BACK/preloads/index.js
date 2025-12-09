import { contextBridge, ipcRenderer } from "electron";
import admPreload from "./adm/adm.js";
import categoriaPreload from "./cadastro/cadastroCategoria.js";
import funcionarioPreload from "./cadastro/cadastroFuncionario.js";
import mesasPreload from "./cadastro/cadastroMesas.js";
import produtoPreload from "./cadastro/cadastroProduto.js";
import gerentePreload from "./gerente/gerente.js";
import loginPreload from "./login/login.js";
import pedidoPreload from "./pedido/pedido.js";
import userPreload from "./user/user.js";



  categoriaPreload();
  admPreload();
  funcionarioPreload();
  mesasPreload();
  produtoPreload();
  gerentePreload();
  loginPreload();
  pedidoPreload();
  userPreload();



console.log("Preloads carregados com sucesso.");

contextBridge.exposeInMainWorld("api", {
  getMsg: () => ipcRenderer.invoke("get-msg"),
});