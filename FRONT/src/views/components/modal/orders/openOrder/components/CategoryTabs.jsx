import React from "react";

function resolveKey(cat, idx) {
  const id =
    cat?.id ??
    cat?.ID ??
    cat?.categoria_id ??
    cat?.categoriaId ??
    cat?.category_id ??
    null;

  const nome = String(cat?.nome || "").trim();
  return id != null ? String(id) : `${nome || "cat"}-${idx}`;
}

function CategoryTabs({ categorias = [], categoriaAtual, onSelect }) {
  const atualId =
    categoriaAtual?.id ??
    categoriaAtual?.ID ??
    categoriaAtual?.categoria_id ??
    categoriaAtual?.categoriaId ??
    categoriaAtual?.category_id ??
    null;

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 12, overflowY: "auto" }}>
      <strong>Categorias</strong>

      <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
        {(categorias || []).map((c, idx) => {
          const cId =
            c?.id ?? c?.ID ?? c?.categoria_id ?? c?.categoriaId ?? c?.category_id ?? null;

          return (
            <div
              key={resolveKey(c, idx)}
              onClick={() => onSelect(c)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: 10,
                borderRadius: 10,
                cursor: "pointer",
                background: String(atualId ?? "") === String(cId ?? "") ? "#e8f5e9" : "#f9fafb",
                border:
                  String(atualId ?? "") === String(cId ?? "")
                    ? "2px solid #2f9e41"
                    : "1px solid #e5e7eb",
              }}
            >
              <strong>{c?.nome || "Sem nome"}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryTabs;
