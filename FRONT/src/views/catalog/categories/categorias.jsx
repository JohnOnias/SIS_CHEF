import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCadastroCategoria from "./components/ModalCadastroCategoria";
import "./styles/categorias.css";

import {
  getCategorias,
  cadastrarCategoria,
  atualizarCategoria,
  removerCategoria,
} from "../../../services/categoryService";

function Categorias({ canManageCatalog = true, basePath = "/manager" }) {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  const [menuOpenId, setMenuOpenId] = useState(null);

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregar = async () => {
    setLoading(true);
    try {
      const data = await getCategorias();
      setCategorias(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao buscar categorias");
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const abrirCategoria = (cat) => {
    navigate("/select-products", {
      state: { categoria: cat, backTo: `${basePath}?tab=Categorias` },
    });
  };

  const abrirCadastro = () => {
    setEditingCat(null);
    setOpenModal(true);
  };

  const abrirEdicao = (cat) => {
    setEditingCat(cat);
    setOpenModal(true);
  };

  const salvar = async (data) => {
    try {
      if (editingCat?.id != null) {
        // ⚠️ back ainda não tem API: função fica “quieta”
        await atualizarCategoria(editingCat.id, data.nome, 1);
      } else {
        await cadastrarCategoria(data.nome, 1);
      }

      setOpenModal(false);
      setEditingCat(null);
      setMenuOpenId(null);
      await carregar();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao salvar categoria");
    }
  };

  const excluir = async (cat) => {
    try {
      // ⚠️ back ainda não tem API: função fica “quieta”
      await removerCategoria(cat.id);
    } catch (e) {
      // não quebra
      console.warn(e);
    } finally {
      setMenuOpenId(null);
    }
  };

  // ✅ key nunca undefined
  const categoriasComKey = useMemo(() => {
    return (categorias || []).map((cat, idx) => {
      const id =
        cat?.id ??
        cat?.ID ??
        cat?.categoria_id ??
        cat?.categoriaId ??
        null;

      const nome = String(cat?.nome || "").trim();

      // fallback seguro: nome + idx (evita duplicar se nome repetir)
      const key = id != null ? String(id) : `${nome || "cat"}-${idx}`;

      return { ...cat, __key: key, __id: id, __nome: nome };
    });
  }, [categorias]);

  return (
    <div className="categorias-page tela">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          marginBottom: 18,
          width: "100%",
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: "#222" }}>Categorias</h1>
          <p style={{ margin: "6px 0 0", color: "#667085", fontWeight: 500 }}>
            Categorias de produtos
          </p>
        </div>

        {canManageCatalog && (
          <button className="bntPadraoGreen" onClick={abrirCadastro} type="button">
            + Cadastrar Categoria
          </button>
        )}
      </div>

      <div className="produtos-container" style={{ width: "100%" }}>
        {loading && <div style={{ padding: 8 }}>Carregando...</div>}
        {!loading && categoriasComKey.length === 0 && (
          <div style={{ padding: 8 }}>Nenhuma categoria encontrada.</div>
        )}

        {!loading &&
          categoriasComKey.map((cat) => (
            <div
              key={cat.__key}
              className="produto-card"
              onClick={() => abrirCategoria(cat)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && abrirCategoria(cat)}
              style={{
                position: "relative",
                minHeight: 110,
                padding: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* ✅ sem imagem, só nome */}
              <div
                className="produto-titulo"
                style={{
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                {cat.__nome || "Sem nome"}
              </div>

              {/* ✅ ações no canto */}
              {canManageCatalog && (
                <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 6 }}>
                  <button
                    type="button"
                    title="Editar"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      abrirEdicao(cat);
                    }}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      background: "#fff",
                      cursor: "pointer",
                      fontWeight: 900,
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    type="button"
                    title="Remover"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMenuOpenId(cat.__key);
                    }}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      background: "#fff",
                      cursor: "pointer",
                      fontWeight: 900,
                    }}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* ✅ confirmação simples para remover (quieto) */}
      {canManageCatalog && menuOpenId != null && (
        <div
          onClick={() => setMenuOpenId(null)}
          style={{ position: "fixed", inset: 0, zIndex: 9999 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              right: 18,
              top: 130,
              width: 240,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              padding: 10,
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 10 }}>
              Remover categoria?
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="bntPadrao" type="button" onClick={() => setMenuOpenId(null)}>
                Cancelar
              </button>

              <button
                className="bntPadraoRed"
                type="button"
                onClick={async () => {
                  const cat = categoriasComKey.find((c) => c.__key === menuOpenId);
                  if (!cat) {
                    setMenuOpenId(null);
                    return;
                  }
                  await excluir(cat); // quieto
                }}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      <ModalCadastroCategoria
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingCat(null);
        }}
        onSave={salvar}
        disabled={!canManageCatalog}
        initialNome={editingCat?.nome || ""}
        isEdit={!!editingCat?.id}
      />
    </div>
  );
}

export default Categorias;
