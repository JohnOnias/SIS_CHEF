import React from "react";

function OpenOrderFooter({
  total,
  isManager,
  nomeGarcom,
  setNomeGarcom,
  waiterNames,
  itensCarrinhoCount,
  onFinish,
  formatMoney,
}) {
  return (
    <div
      style={{
        borderTop: "1px solid #e5e7eb",
        marginTop: 10,
        paddingTop: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      <strong>Total: R$ {formatMoney(total)}</strong>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {/* 🔐 SELECT SÓ PARA GERENTE */}
        {isManager && (
          <select
            value={nomeGarcom}
            onChange={(e) => setNomeGarcom(e.target.value)}
            style={{
              height: 44,
              minWidth: 240,
              padding: "0 12px",
              borderRadius: 8,
              border: "1px solid #ccc",
              fontWeight: 700,
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="">Garçom</option>
            {waiterNames.map((nome) => (
              <option key={nome} value={nome}>
                {nome}
              </option>
            ))}
          </select>
        )}

        <button
          className="bntPadraoGreen"
          disabled={itensCarrinhoCount === 0}
          onClick={onFinish}
          style={{
            height: 44,
            minWidth: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
          }}
          type="button"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}

export default OpenOrderFooter;
