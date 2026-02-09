import { Pedido, Mesa } from "../../database/models/index.js";

// Registrar pedido



export async function registrarPedido(numeroMesa, idGarcom) {
  try {
    console.log("Entrou no registrarPedido, mesa:", numeroMesa, idGarcom);

    // Verifica se a mesa existe
    const mesa = await Mesa.findOne({ where: { numero: numeroMesa } });
    if (!mesa) {
      throw new Error("Numeração de mesa não cadastrada!");
    }

    if (mesa.status.toLowerCase() === "ocupada") {
      throw new Error("Mesa já ocupada.");
    }

    // Verifica se já existe um pedido para essa mesa aberto
    const pedidoExistente = await Pedido.findOne({
      where: { mesa_numero: numeroMesa, status: "aberto" },
    });

    if (pedidoExistente) {
      throw new Error("Mesa já tem um pedido.");
    }

    // Muda o status da mesa para "ocupada"
    mesa.status = "ocupada";
    await mesa.save();

    // Cria o pedido
    const pedido = await Pedido.create({
      mesa_numero: numeroMesa,
      data_criacao: new Date(),
      status: "aberto",
      valor_total: 0,
      id_funcionario: idGarcom,
    });

    return { success: true, id: pedido.id };
  } catch (err) {
    console.error("Erro no registrarPedido:", err);
    throw err;
  }
}
