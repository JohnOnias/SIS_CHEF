import React, { useState } from "react";
import "./styles/tables.css";
import AbrirPedidoModal from "../modal/orders/openOrder";

function Table({ canManageMesas = true }) {
  const [mesas, setMesas] = useState([
    { id: 1, numero: 1, status: "disponivel" },
    { id: 2, numero: 2, status: "ocupada" },
    { id: 3, numero: 3, status: "disponivel" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [mesaSelecionada, setMesaSelecionada] = useState(null);

  const handleMesaClick = (numero) => {
    setMesaSelecionada(numero);
    setOpenModal(true);
  };

  const adicionarMesa = () => {
    if (!canManageMesas) return;
    const novoNumero = mesas.length + 1;
    setMesas((prev) => [
      ...prev,
      { id: Date.now(), numero: novoNumero, status: "disponivel" },
    ]);
  };

  const removerMesa = () => {
    if (!canManageMesas) return;
    if (mesas.length === 0) return;
    setMesas((prev) => prev.slice(0, -1));
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
              <button className="bntPadraoGreen" onClick={adicionarMesa} type="button">
                + Adicionar Mesa
              </button>
              <button className="bntPadraoRed" onClick={removerMesa} type="button">
                − Remover Mesa
              </button>
            </div>
          )}
        </div>

        <div className="mesas-container">
          {mesas.map((mesa) => (
            <div
              key={mesa.id}
              className={`mesa-card ${mesaSelecionada === mesa.numero ? "ativa" : ""}`}
              onClick={() => handleMesaClick(mesa.numero)}
            >
              <span className="mesa-numero">{mesa.numero}</span>
              <span className={`status-badge ${mesa.status}`}>{mesa.status}</span>
            </div>
          ))}
        </div>
      </div>

      <AbrirPedidoModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        mesa={mesaSelecionada}
      />
    </>
  );
}

export default Table;
