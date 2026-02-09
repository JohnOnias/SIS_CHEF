import React from "react";

function CategoryTabs({ categorias, categoriaAtual, onSelect }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 12,
        overflowY: "auto",
      }}
    >
      <strong>Categorias</strong>

      <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
        {categorias.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelect(c)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 8,
              borderRadius: 10,
              cursor: "pointer",
              background: categoriaAtual?.id === c.id ? "#e8f5e9" : "#f9fafb",
              border:
                categoriaAtual?.id === c.id
                  ? "2px solid #2f9e41"
                  : "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                backgroundImage: `url(${c.imagem})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <strong>{c.nome}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryTabs;
