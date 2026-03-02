import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "../../../assets/modal/close.png"; // ícone de fechar
import "./styles/paymentModal.css";

function PaymentModal({ isOpen, total, onClose, onConfirm }) {
  const [formaPagamento, setFormaPagamento] = useState("PIX");

  const portalRoot = useMemo(() => {
    let el = document.getElementById("payment-modal-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "payment-modal-root";
      document.body.appendChild(el);
    }
    return el;
  }, []);

  if (!isOpen || total <= 0) return null; // Validação do total

  const confirmar = () => {
    if (!formaPagamento) {
      alert("Selecione uma forma de pagamento."); // Feedback simples
      return;
    }
    onConfirm(formaPagamento);
  };

  return createPortal(
    <div className="payment-modal-overlay" onClick={onClose}>
      <div
        className="payment-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== HEADER ===== */}
        <div className="payment-modal-header">
          <h2>Pagamento</h2>
          <img
            src={CloseIcon}
            className="payment-modal-close"
            alt="Fechar"
            onClick={onClose}
          />
        </div>

        {/* ===== CONTEÚDO ===== */}
        <div className="payment-modal-content">
          <p className="payment-total">Total a pagar: R$ {total.toFixed(2)}</p>

          <label className="payment-label">Forma de pagamento:</label>
          <div className="payment-methods">
            <button
              className={`payment-method-btn ${
                formaPagamento === "PIX" ? "active" : ""
              }`}
              onClick={() => setFormaPagamento("PIX")}
            >
              PIX
            </button>
            <button
              className={`payment-method-btn ${
                formaPagamento === "CARTAO" ? "active" : ""
              }`}
              onClick={() => setFormaPagamento("CARTAO")}
            >
              💳 Cartão
            </button>
            <button
              className={`payment-method-btn ${
                formaPagamento === "DINHEIRO" ? "active" : ""
              }`}
              onClick={() => setFormaPagamento("DINHEIRO")}
            >
              💵 Dinheiro
            </button>
          </div>

          <button className="payment-confirm-btn" onClick={confirmar}>
            Pagar R$ {total.toFixed(2)} com {formaPagamento}
          </button>
        </div>
      </div>
    </div>,
    portalRoot,
  );
}

export default PaymentModal;
