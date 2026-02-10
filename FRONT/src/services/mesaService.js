// src/services/mesaService.js
import { api, isElectron } from "./api";

/**
 * BACK (sua lista):
 * - window.api.mesas.cadastrarMesas(objeto) -> true
 * - window.api.mesas.listarMesas() -> array
 * - window.api.mesa.remover(mesa_numero) -> true
 * - window.api.mesas.verificarMesaPedido(numeroMesa) -> pedido ou null
 *
 * Compatibilidades:
 * - alguns preloads usam mesas.ListarMesas()
 * - alguns preloads usam mesas.cadastrarMesas(numero, status, n_cadeiras)
 */

export async function listarMesas() {
  if (!isElectron) return [];

  const fn =
    api?.mesas?.listarMesas ||
    api?.mesas?.ListarMesas;

  if (typeof fn !== "function") return [];

  const data = await fn();
  return Array.isArray(data) ? data : [];
}

export async function cadastrarMesa(objeto) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");

  const fn = api?.mesas?.cadastrarMesas;
  if (typeof fn !== "function") throw new Error("Preload não expõe mesas.cadastrarMesas.");

  const numero = Number(objeto?.numero);
  const status = String(objeto?.status || "").trim();
  const cadeiras = Number(objeto?.cadeiras ?? objeto?.n_cadeiras);

  if (!numero || Number.isNaN(numero)) throw new Error("Número da mesa inválido.");
  if (!status) throw new Error("Status da mesa inválido.");
  if (!cadeiras || Number.isNaN(cadeiras)) throw new Error("Cadeiras inválido.");

  // 1) tenta como objeto (sua API)
  try {
    const okObj = await fn({ numero, status, cadeiras });
    if (okObj === true) return true;
  } catch {
    // fallback
  }

  // 2) fallback como parâmetros (preload antigo)
  const okParams = await fn(numero, status, cadeiras);
  if (!okParams) throw new Error("Backend retornou false ao cadastrar mesa.");
  return true;
}

// alias mantendo nome que você usa nas telas
export const cadastrarMesas = cadastrarMesa;

export async function removerMesa(mesa_numero) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");

  // sua lista: window.api.mesa.remover(...)
  const fn = api?.mesa?.remover;
  if (typeof fn !== "function") throw new Error("Preload não expõe mesa.remover.");

  const n = Number(mesa_numero);
  if (!n || Number.isNaN(n)) throw new Error("Número da mesa inválido.");

  const ok = await fn(n);
  if (!ok) throw new Error("Backend retornou false ao remover mesa.");
  return true;
}

export async function verificarMesaPedido(numeroMesa) {
  if (!isElectron) return null;

  const fn = api?.mesas?.verificarMesaPedido;
  if (typeof fn !== "function") {
    // se ainda não estiver exposto, tratamos como sem pedido (não quebra tela)
    return null;
  }

  const pedido = await fn(Number(numeroMesa));
  return pedido || null;
}
