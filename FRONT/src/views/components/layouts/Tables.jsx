import React, { useState } from "react";
import "./styles/tables.css";
import AbrirPedidoModal from "../modal/orders/openOrder";

function Table() {
  const [mesas] = useState([
    { id: 1, numero: 1, status: "disponivel" },
    { id: 2, numero: 2, status: "ocupada" },
    { id: 3, numero: 3, status: "disponivel" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [mesaSelecionada, setMesaSelecionada] = useState(null);

  // Função para abrir pedido ao clicar na mesa
  const handleMesaClick = (numero) => {
    setMesaSelecionada(numero);
    setOpenModal(true); // abre o modal automaticamente
  };

  return (
    <>
      <div className="tela">
        <h1>Mesas</h1>
        <p className="subtitulo">Clique em uma mesa para abrir o pedido</p>

        <div className="mesas-container">
          {mesas.map((mesa) => (
            <div
              key={mesa.id}
              className={`mesa-card ${
                mesaSelecionada === mesa.numero ? "ativa" : ""
              }`}
              onClick={() => handleMesaClick(mesa.numero)}
            >
              <span className="mesa-numero">{mesa.numero}</span>
              <span className={`status-badge ${mesa.status}`}>
                {mesa.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Modal do pedido */}
      <AbrirPedidoModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        mesa={mesaSelecionada}
      />
    </>
  );
}

export default Table;
