const { ipcMain } = require("electron");
const {
  cadastrarMesa,
  listarMesas,
  mudarStatus,
  deletarMesa,
  verificarMesaPedido,
} = require("../../models/registration/table.js");

module.exports = function tableIpc() {


  ipcMain.handle("verificar-mesa-pedido", async (event, numeroMesa) => {
    return await verificarMesaPedido(numeroMesa);
  });



  ipcMain.handle(
    "cadastro-mesa",
    async (_, numero) => {
      console.log("numero da messa pego no ipc:", numero);
      console.log("evento?:", _);
      return await cadastrarMesa(numero);
    },
  );

  ipcMain.handle("get-mesas", async () => {
    return await listarMesas();
  });

  
  // Mudar status da mesa
  ipcMain.handle("mudar-status-mesa", async (event, numeroMesa) => {
    try {
      const resultado = await mudarStatus(numeroMesa);
      return { success: true, data: resultado };
    } catch (err) {
      console.error("Erro ao mudar status da mesa:", err);
      return { success: false, error: err.message };
    }
  });

ipcMain.handle("deletar-mesa", async (event, numero) => {
  return await deletarMesa(numero);
});

}