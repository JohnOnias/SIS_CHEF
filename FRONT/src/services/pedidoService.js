// src/services/pedidoService.js
import { api, isElectron } from "./api";

/**
 * BACK (sua lista):
 * - window.api.pedido.registrarPedido(numeroMesa, idGarcom) -> true
 * - window.api.pedido.adicionarProdutosPedido(idPedido, idProduto, quantidade) -> item
 * - window.api.pedido.listarItensPedido(id_pedido) -> array
 * - window.api.pedido.editarPedido(idpedido, dadosAtualizados) -> true/false
 * - window.api.pedido.removerItem(idPedido, idProduto, quantidade) -> true/false
 * - window.api.pedido.fecharPedido(idpedido, valor_total) -> objeto pedido
 */

export async function registrarPedido(numeroMesa, idGarcom) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");
  if (!api?.pedido?.registrarPedido) throw new Error("Preload não expõe pedido.registrarPedido.");

  const ok = await api.pedido.registrarPedido(Number(numeroMesa), Number(idGarcom));
  if (!ok) throw new Error("Backend retornou false ao registrar pedido.");
  return true;
}

export async function adicionarProdutosPedido(idPedido, idProduto, quantidade) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");
  if (!api?.pedido?.adicionarProdutosPedido) {
    throw new Error("Preload não expõe pedido.adicionarProdutosPedido.");
  }

  const item = await api.pedido.adicionarProdutosPedido(
    Number(idPedido),
    Number(idProduto),
    Number(quantidade)
  );

  return item || null;
}

export async function listarItensPedido(idPedido) {
  if (!isElectron) return [];
  if (!api?.pedido?.listarItensPedido) return [];

  const data = await api.pedido.listarItensPedido(Number(idPedido));
  return Array.isArray(data) ? data : [];
}

export async function editarPedido(idPedido, dadosAtualizados) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");
  if (!api?.pedido?.editarPedido) throw new Error("Preload não expõe pedido.editarPedido.");

  const ok = await api.pedido.editarPedido(Number(idPedido), {
    mesa_numero: dadosAtualizados?.mesa_numero ?? dadosAtualizados?.mesaNumero,
    status: dadosAtualizados?.status,
    id_funcionario: dadosAtualizados?.id_funcionario ?? dadosAtualizados?.idFuncionario,
  });

  if (ok !== true) throw new Error("Não foi possível editar o pedido.");
  return true;
}

export async function removerItem(idPedido, idProduto, quantidade) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");
  if (!api?.pedido?.removerItem) throw new Error("Preload não expõe pedido.removerItem.");

  const ok = await api.pedido.removerItem(
    Number(idPedido),
    Number(idProduto),
    Number(quantidade)
  );

  if (ok !== true) throw new Error("Não foi possível remover item do pedido.");
  return true;
}

export async function fecharPedido(idPedido, valor_total) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");
  if (!api?.pedido?.fecharPedido) throw new Error("Preload não expõe pedido.fecharPedido.");

  const pedido = await api.pedido.fecharPedido(Number(idPedido), Number(valor_total));
  if (!pedido) throw new Error("Falha ao fechar pedido.");
  return pedido;
}
