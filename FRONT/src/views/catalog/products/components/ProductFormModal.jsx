import React from "react";

function ProductFormModal({
  open,
  onClose,
  modo,
  nome,
  setNome,
  preco,
  setPreco,
  descricao,
  setDescricao,
  onSave,
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          width: "min(560px, 96vw)",
          display: "grid",
          gap: 12,
        }}
      >
        <h2>{modo === "create" ? "Cadastrar Produto" : "Editar Produto"}</h2>

        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button className="bntPadrao" onClick={onClose}>
            Cancelar
          </button>

          <button className="bntPadraoGreen" onClick={onSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductFormModal;
