import { Pedido } from "../../database/models/index.js";

export async function cadastrarPedido(pedido) {
  try {
    await Pedido.create({   
        mesa_numero: pedido.numeroMesa,
        status: pedido.status || "aberto", // Valor padrão
        total: pedido.total || 0, // Valor padrão
        id_funcionario: pedido.idFuncionario,
    });
    return { success: true, message: "Pedido cadastrado com sucesso" }; // sucesso
  }
    catch (error) {
    console.error("Erro ao cadastrar pedido:", error);
    return { success: false, error: error.message }; // erro
  }
}


export async function getPedidos() {
  try {
    const pedidos = await Pedido.findAll({
      attributes: ["id", "mesa_numero", "data_criacao", "status", "valor_total", "id_funcionario"],
      order: [["data_criacao", "DESC"]], // Ordena por data de criação (opcional)
    }); 
    return pedidos;
    } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw error; // Mantém o mesmo comportamento de rejeição
  }
}

export async function editarPedido(id, dadosAtualizados) {
  try {
    const pedido = await Pedido.findByPk(id);


    if (!pedido) {
      return { success: false, error: "Pedido não encontrado." };
    }   
    await pedido.update(dadosAtualizados);
    
    return { success: true, message: "Pedido atualizado com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    return { success: false, error: error.message };
  }
}

