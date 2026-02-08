import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import "./styles/payment.css";

function PaymentModal({ isOpen, total, onClose, onConfirm }) {
  const [formaPagamento, setFormaPagamento] = useState("PIX");

  const portalRoot = useMemo(() => {
    let el = document.getElementById("payment-portal-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "payment-portal-root";
      document.body.appendChild(el);
    }
    return el;
  }, []);

  if (!isOpen) return null;

  const confirmar = () => {
    onConfirm(formaPagamento);
  };

  const conteudo = (
    <div className="payment-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        {/* ===== ESQUERDA ===== */}
        <aside className="payment-summary">
          <div className="summary-top">
            <h3>Seu pedido</h3>

            {/* 🔴 BOTÃO CANCELAR EM VERMELHO */}
            <button
              className="summary-cancel"
              onClick={onClose}
              type="button"
              style={{
                background: "#e03131",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: 6,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>

          <div className="summary-box">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>R$ {total.toFixed(2)}</strong>
            </div>

            <div className="summary-sep" />

            <div className="summary-row total">
              <span>Total</span>
              <strong>R$ {total.toFixed(2)}</strong>
            </div>
          </div>
        </aside>

        {/* ===== DIREITA ===== */}
        <section className="payment-content">
          <div className="payment-header">
            <h2>Pagamento</h2>
            <button
              className="close-btn"
              onClick={onClose}
              aria-label="Fechar"
              type="button"
            >
              ✕
            </button>
          </div>

          <div className="payment-form">
            <div className="field field-full">
              <label>Forma de pagamento</label>

              {/* LISTA VERTICAL */}
              <div
                className="payment-methods"
                role="group"
                aria-label="Forma de pagamento"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <button
                  type="button"
                  className={`method-card ${
                    formaPagamento === "PIX" ? "active" : ""
                  }`}
                  onClick={() => setFormaPagamento("PIX")}
                  style={{ width: "100%", height: 48 }}
                >
                  PIX
                </button>

                <button
                  type="button"
                  className={`method-card ${
                    formaPagamento === "CARTAO" ? "active" : ""
                  }`}
                  onClick={() => setFormaPagamento("CARTAO")}
                  style={{ width: "100%", height: 48 }}
                >
                  💳 Cartão
                </button>

                <button
                  type="button"
                  className={`method-card ${
                    formaPagamento === "DINHEIRO" ? "active" : ""
                  }`}
                  onClick={() => setFormaPagamento("DINHEIRO")}
                  style={{ width: "100%", height: 48 }}
                >
                  💵 Dinheiro
                </button>
              </div>
            </div>

            {/* ✅ TEXTO CENTRALIZADO NO BOTÃO PAGAR */}
            <button
              className="pay-button"
              onClick={confirmar}
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: 50,
                fontWeight: 800,
              }}
            >
              Pagar R$ {total.toFixed(2)} com {formaPagamento}
            </button>
          </div>
        </section>
      </div>
    </div>
  );

  return createPortal(conteudo, portalRoot);
}

export default PaymentModal;
