import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../services/catalogStorage";

function SelectProductsView() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const categoria = state?.categoria ?? null;
  const backTo = state?.backTo || null;

  const role = localStorage.getItem("user_role") || "manager";
  const canManageCatalog = role !== "waiter";

  const [openModal, setOpenModal] = useState(false);
  const [modo, setModo] = useState("create");
  const [editId, setEditId] = useState(null);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  const [refresh, setRefresh] = useState(0);

  const produtos = useMemo(() => {
    if (!categoria) return [];
    return getProductsByCategory(categoria.id);
  }, [categoria, refresh]);

  const voltarParaCategorias = () => {
    if (backTo) navigate(backTo);
    else navigate(-1);
  };

  if (!categoria) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Produtos</h1>
        <button className="bntPadrao" onClick={voltarParaCategorias}>
          Voltar para Categorias
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      {/* ===== HEADER ===== */}
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
          <h1 style={{ margin: 0 }}>{categoria.nome}</h1>
          <p style={{ marginTop: 6, color: "#555" }}>
            Produtos da categoria
          </p>
        </div>

        {/* 🔧 BOTÕES PADRONIZADOS */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <button
            className="bntPadrao"
            onClick={voltarParaCategorias}
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
              onClick={() => {
                setModo("create");
                setEditId(null);
                setNome("");
                setPreco("");
                setDescricao("");
                setOpenModal(true);
              }}
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

      {/* ===== LISTA ===== */}
      {produtos.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            padding: 18,
            fontWeight: 700,
            maxWidth: 820,
          }}
        >
          Nenhum produto cadastrado
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12, maxWidth: 900 }}>
          {produtos.map((p) => (
            <div
              key={p.id}
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
                <strong>{p.nome}</strong>
                <div>R$ {Number(p.preco).toFixed(2)}</div>
                {p.descricao && <p>{p.descricao}</p>}
              </div>

              {canManageCatalog && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="bntPadrao"
                    onClick={() => {
                      setModo("edit");
                      setEditId(p.id);
                      setNome(p.nome);
                      setPreco(String(p.preco));
                      setDescricao(p.descricao || "");
                      setOpenModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bntPadrao"
                    style={{ color: "#e03131", borderColor: "#e03131" }}
                    onClick={() => {
                      if (
                        window.confirm("Deseja excluir este produto?")
                      ) {
                        deleteProduct(categoria.id, p.id);
                        setRefresh((r) => r + 1);
                      }
                    }}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ===== MODAL ===== */}
      {openModal && canManageCatalog && (
        <div
          onClick={() => setOpenModal(false)}
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
              <button className="bntPadrao" onClick={() => setOpenModal(false)}>
                Cancelar
              </button>
              <button
                className="bntPadraoGreen"
                onClick={() => {
                  if (modo === "create") {
                    addProduct(categoria.id, {
                      nome,
                      preco: Number(preco),
                      descricao,
                    });
                  } else {
                    updateProduct(categoria.id, editId, {
                      nome,
                      preco: Number(preco),
                      descricao,
                    });
                  }
                  setOpenModal(false);
                  setRefresh((r) => r + 1);
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectProductsView;
