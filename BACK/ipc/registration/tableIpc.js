const { ipcMain } = require("electron");
const {
  cadastrarMesa,
  getMesas,
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
    async (_, mesa) => {
      return await cadastrarMesa(mesa);
    },
  );

  ipcMain.handle("get-mesas", async () => {
    return await getMesas();
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

  ipcMain.handle("deletar-mesa", async (event, numeroMesa) => {
    try {
      const resultado = await deletarMesa(numeroMesa);
      return { success: true, data: resultado };
    } catch (err) {
      console.error("Erro ao deletar a mesa:", err);
      return { success: false, error: err.message };
    }   
});

}