import React from "react";
import "./styles/payment.css";

function PaymentModal({ isOpen, onClose, total, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Forma de Pagamento</h2>

        <p>
          <strong>Total:</strong> R$ {total.toFixed(2)}
        </p>

        <div className="pagamentos">
          <button
            className="bntPadraoGreen"
            onClick={() => onConfirm("Dinheiro")}
          >
            💵 Dinheiro
          </button>

          <button
            className="bntPadraoGreen"
            onClick={() => onConfirm("Cartão")}
          >
            💳 Cartão
          </button>

          <button
            className="bntPadraoGreen"
            onClick={() => onConfirm("PIX")}
          >
            📱 PIX
          </button>
        </div>

        <button className="bntPadrao" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;
