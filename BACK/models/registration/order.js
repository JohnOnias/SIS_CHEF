import { Pedido } from "../../database/models/index.js";

export async function cadastrarPedido(pedido) {


  try {
    await Pedido.create({   
        mesa_numero: pedido.numeroMesa,
        status: pedido.status || "aberto", 
        total: pedido.total || 0, 
        id_funcionario: pedido.idFuncionario,
    });
    return { success: true, message: "Pedido cadastrado com sucesso" }; 
  }
    catch (error) {
    console.error("Erro ao cadastrar pedido:", error);
    return { success: false, error: error.message };
  }
}


export async function getPedidos() {
  try {
    const pedidos = await Pedido.findAll({
      attributes: ["id", "mesa_numero", "data_criacao", "status", "valor_total", "id_funcionario"],
      order: [["data_criacao", "DESC"]],
    }); 
    return pedidos;
    } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw error; 
  }
}

export async function editarPedido(idPedido, dadosAtualizados) {
  try {
    const pedido = await Pedido.findByPk(idPedido);

    if (!pedido) {
      return { success: false, error: "Pedido não encontrado." };
    }

    const { mesa_numero, status, valor_total, id_funcionario } =
      dadosAtualizados;

    await pedido.update({
      mesa_numero,
      status,
      valor_total,
      id_funcionario,
    });

    return { success: true, message: "Pedido atualizado com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    return { success: false, error: error.message };
  }
}


export async function excluirItemPedido(idPedido, idItem) {
  try {
    const pedido = await Pedido.findByPk(idPedido);

    if (!pedido) {
      return { success: false, error: "Pedido não encontrado." };
    } 
    const item = await pedido.getItens({ where: { id: idItem } });

    if (item.length === 0) {
      return { success: false, error: "Item não encontrado no pedido." };
    }     
    await item[0].destroy();
    return { success: true, message: "Item excluído do pedido com sucesso" };
  } catch (error) {
    console.error("Erro ao excluir item do pedido:", error);
    return { success: false, error: error.message };
  } 
}

export async function listarPedidosMesa(MesaNumero){
try {
  const pedidos = await Pedido.findAll({
    where: { mesa_numero: MesaNumero, status: "aberto" },
    attributes: ["id", "mesa_numero", "data_criacao", "status", "valor_total", "id_funcionario"],
    order: [["data_criacao", "DESC"]], 
  }); 
  return pedidos;
} catch (error) {
  console.error("Erro ao listar pedidos da mesa:", error);
  throw error;
} 
}
export async function fecharPedido(idPedido, valorTotal) {
  try {
    const pedido = await Pedido.findByPk(idPedido); 
    if (!pedido) {
      return { success: false, error: "Pedido não encontrado." };
    }
    await pedido.update({ status: "fechado", valor_total: valorTotal });
    return pedido;
  } catch (error) {
    console.error("Erro ao fechar pedido:", error);
    return { success: false, error: error.message };
  }   
}
