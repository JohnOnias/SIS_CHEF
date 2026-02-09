import React from "react";

function ProductsHeader({ categoriaNome, onBack, canManageCatalog, onCreate }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h1 style={{ margin: 0 }}>{categoriaNome}</h1>
        <p style={{ marginTop: 6, color: "#555" }}>Produtos da categoria</p>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          className="bntPadrao"
          onClick={onBack}
          style={{
            height: 44,
            minWidth: 200,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Voltar
        </button>

        {canManageCatalog && (
          <button
            className="bntPadraoGreen"
            onClick={onCreate}
            style={{
              height: 44,
              minWidth: 200,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            + Cadastrar Produto
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductsHeader;
