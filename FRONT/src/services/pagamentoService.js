// src/services/pagamentoService.js
import { api, isElectron } from "./api";

/**
 * BACK (sua lista):
 * - window.api.pagamento.cadastrarPagamento(idPedido, tipoPagamento, dividido, valorPago) -> pagamento
 * - window.api.pagamento.todosOsPagamentos() -> array
 * - window.api.pagamento.buscarPagamentoPorPedidoId(id_pedido) -> pagamento
 */

export async function cadastrarPagamento(idPedido, tipoPagamento, dividido, valorPago) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");
  if (!api?.pagamento?.cadastrarPagamento) {
    throw new Error("Preload não expõe pagamento.cadastrarPagamento.");
  }

  const pagamento = await api.pagamento.cadastrarPagamento(
    Number(idPedido),
    String(tipoPagamento || "").trim(),
    Boolean(dividido),
    Number(valorPago)
  );

  if (!pagamento) throw new Error("Falha ao cadastrar pagamento.");
  return pagamento;
}

export async function todosOsPagamentos() {
  if (!isElectron) return [];
  if (!api?.pagamento?.todosOsPagamentos) return [];

  const data = await api.pagamento.todosOsPagamentos();
  return Array.isArray(data) ? data : [];
}

export async function buscarPagamentoPorPedidoId(idPedido) {
  if (!isElectron) return null;
  if (!api?.pagamento?.buscarPagamentoPorPedidoId) return null;

  const pagamento = await api.pagamento.buscarPagamentoPorPedidoId(Number(idPedido));
  return pagamento || null;
}
