import React, { useEffect, useMemo, useState } from "react";
import "./styles/tables.css";

import AbrirPedidoModal from "../modal/orders/openOrder";
import { isElectron } from "../../../services/api";
import { getCurrentUser } from "../../../services/authService";

import { listarMesas, cadastrarMesas, verificarMesaPedido } from "../../../services/mesaService";
import { registrarPedido } from "../../../services/pedidoService";

function normalizeStatusClass(status) {
  const s = String(status || "").toLowerCase();
  if (s.includes("ocup")) return "ocupada";
  if (s.includes("livre") || s.includes("disp")) return "disponivel";
  return "disponivel";
}

function normalizeStatusLabel(status) {
  const s = String(status || "").trim();
  if (!s) return "disponivel";
  return s;
}

function Table({ canManageMesas = true }) {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [mesaSelecionada, setMesaSelecionada] = useState(null);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  const [mesaNumero, setMesaNumero] = useState("");

  const carregarMesas = async () => {
    setLoading(true);
    try {
      const data = await listarMesas();
      const normalizadas = (data || []).map((m, idx) => ({
        id: m?.id ?? m?.numero ?? `mesa-${idx}`,
        numero: Number(m?.numero),
        status: normalizeStatusLabel(m?.status),
        n_cadeiras: m?.n_cadeiras ?? m?.cadeiras ?? null,
      }));
      setMesas(Array.isArray(normalizadas) ? normalizadas : []);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao listar mesas");
      setMesas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMesas();
  }, []);

  const mesasOrdenadas = useMemo(() => {
    return [...mesas].sort((a, b) => Number(a.numero) - Number(b.numero));
  }, [mesas]);

  const adicionarMesa = async () => {
    if (!canManageMesas) return;
    if (!isElectron) {
      alert("Mesas só funcionam no Electron (window.api).");
      return;
    }

    const numero = Number(String(mesaNumero).trim());
    if (!numero || Number.isNaN(numero)) {
      alert("Digite um número de mesa válido.");
      return;
    }

    const existe = mesas.some((m) => Number(m.numero) === numero);
    if (existe) {
      alert("Essa mesa já existe.");
      return;
    }

    try {
      await cadastrarMesas({ numero, status: "Disponivel", cadeiras: 4 });
      setMesaNumero("");
      await carregarMesas();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao cadastrar mesa");
    }
  };

  const removerMesa = async () => {
    alert("O BACK não possui API para remover mesa (só cadastrar/listar).");
  };

  const handleMesaClick = async (numeroMesa) => {
    try {
      if (!isElectron) {
        alert("Pedidos só funcionam no Electron (window.api).");
        return;
      }

      // 1) verificar pedido (se a API não existir, retorna null sem quebrar)
      let pedido = await verificarMesaPedido(numeroMesa);

      // 2) se não existe pedido, criar (somente garçom)
      if (!pedido) {
        const usuario = await getCurrentUser();
        if (!usuario?.id) {
          alert("Usuário não logado.");
          return;
        }

        const tipo = String(usuario.tipo || "").toLowerCase();
        const isWaiter =
          tipo.includes("gar") || tipo.includes("garç") || tipo.includes("bart");

        if (!isWaiter) {
          alert(
            "Essa mesa não tem pedido. Para criar, o gerente precisa selecionar um garçom (integraremos no modal)."
          );
          setMesaSelecionada(numeroMesa);
          setPedidoSelecionado(null);
          setOpenModal(true);
          return;
        }

        await registrarPedido(numeroMesa, usuario.id);

        // 3) tenta buscar de novo (se a API existir, ótimo; se não, segue null)
        pedido = await verificarMesaPedido(numeroMesa);
      }

      setMesaSelecionada(numeroMesa);
      setPedidoSelecionado(pedido || null);
      setOpenModal(true);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao abrir/criar pedido");
    }
  };

  return (
    <>
      <div className="tela">
        <div className="tables-header">
          <div className="tables-title-area">
            <h1 className="tables-title">Mesas</h1>
            <p className="subtitulo">Clique em uma mesa para abrir o pedido</p>
          </div>

          {canManageMesas && (
            <div className="tables-actions">
              <input
                value={mesaNumero}
                onChange={(e) => setMesaNumero(e.target.value)}
                placeholder="Nº da mesa"
                inputMode="numeric"
                style={{
                  height: 44,
                  width: 120,
                  padding: "0 12px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  fontWeight: 800,
                }}
              />

              <button
                className="bntPadraoGreen"
                onClick={adicionarMesa}
                type="button"
                disabled={!isElectron}
              >
                + Adicionar Mesa
              </button>

              <button className="bntPadraoRed" onClick={removerMesa} type="button">
                − Remover Mesa
              </button>
            </div>
          )}
        </div>

        {!isElectron && (
          <div style={{ padding: 10, background: "#fff3cd", borderRadius: 8, marginBottom: 12 }}>
            Você está no Chrome (sem Electron). Mesas/Pedidos via window.api não funcionam aqui.
          </div>
        )}

        {loading ? (
          <div style={{ padding: 8, fontWeight: 700 }}>Carregando mesas...</div>
        ) : (
          <div className="mesas-container">
            {mesasOrdenadas.map((mesa) => (
              <div
                key={mesa.id}
                className={`mesa-card ${mesaSelecionada === mesa.numero ? "ativa" : ""}`}
                onClick={() => handleMesaClick(mesa.numero)}
              >
                <span className="mesa-numero">{mesa.numero}</span>

                <span className={`status-badge ${normalizeStatusClass(mesa.status)}`}>
                  {normalizeStatusLabel(mesa.status)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <AbrirPedidoModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        mesa={mesaSelecionada}
        pedido={pedidoSelecionado}
      />
    </>
  );
}

export default Table;
