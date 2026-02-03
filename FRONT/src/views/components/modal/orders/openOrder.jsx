import React, { useState } from "react";
import PaymentModal from "./paymentModal.jsx";

function OpenOrderModal({ isOpen, onClose, mesa }) {


  const [carrinho, setCarrinho] = useState([]);
  const [openPagamento, setOpenPagamento] = useState(false);

  // Produtos disponíveis
  const produtos = [
    { id: 1, nome: "Produto A", preco: 10.0 },
    { id: 2, nome: "Produto B", preco: 20.0 },
    { id: 3, nome: "Produto C", preco: 15.5 },
  ];

  
  if (!isOpen || !mesa) return null;

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  return (
    <>
      <div id="container">
        <div id="pedidoAberto">
          <h2>Mesa {mesa}</h2>

          {/* Produtos */}
          <ul>
            {produtos.map((p) => (
              <li key={p.id}>
                {p.nome} - R$ {p.preco.toFixed(2)}
                <button onClick={() => setCarrinho([...carrinho, p])}>
                  +
                </button>
              </li>
            ))}
          </ul>

          {/* Total */}
          <p>
            <strong>Total:</strong> R$ {total.toFixed(2)}
          </p>

          {/* Botões */}
          <button
            className="bntPadraoGreen"
            disabled={carrinho.length === 0}
            onClick={() => setOpenPagamento(true)}
          >
            Finalizar Pedido
          </button>

          <button className="bntPadrao" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>

      {/* 🔹 MODAL DE PAGAMENTO */}
      <PaymentModal
        isOpen={openPagamento}
        total={total}
        onClose={() => setOpenPagamento(false)}
        onConfirm={(forma) => {
          alert(`Pago com ${forma}`);
          setCarrinho([]);
          setOpenPagamento(false);
          onClose();
        }}
      />
    </>
  );
}

export default OpenOrderModal;
