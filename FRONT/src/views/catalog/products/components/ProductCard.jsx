import React from "react";

function ProductCard({ produto, canManageCatalog, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: 12,
        padding: 16,
        display: "flex",
        justifyContent: "space-between",
        gap: 14,
      }}
    >
      <div>
        <strong>{produto.nome}</strong>
        <div>R$ {Number(produto.preco).toFixed(2)}</div>
        {produto.descricao && <p>{produto.descricao}</p>}
      </div>

      {canManageCatalog && (
        <div style={{ display: "flex", gap: 8 }}>
          <button className="bntPadrao" onClick={onEdit}>
            Editar
          </button>

          <button
            className="bntPadrao"
            style={{ color: "#e03131", borderColor: "#e03131" }}
            onClick={onDelete}
          >
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
