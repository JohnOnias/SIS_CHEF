import React from "react";

function ProductRow({ p, qtd, onAdd, onSub, formatMoney }) {
  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: 10,
        padding: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div>
        <div style={{ fontWeight: 800 }}>{p.nome}</div>
        <div style={{ fontWeight: 700, color: "#555" }}>
          R$ {formatMoney(p.preco)}
        </div>
        {p.descricao && (
          <div style={{ fontSize: 13, color: "#666" }}>{p.descricao}</div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          className="bntPadraoGreen"
          style={{ width: 40, height: 40 }}
          onClick={onSub}
          type="button"
        >
          −
        </button>

        <strong>{qtd}</strong>

        <button
          className="bntPadraoGreen"
          style={{ width: 40, height: 40 }}
          onClick={onAdd}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductRow;
