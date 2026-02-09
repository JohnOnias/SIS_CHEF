import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCadastroCategoria from "./components/ModalCadastroCategoria";
import "./styles/categorias.css";

import { listarCategorias, cadastrarCategoria } from "../../../services/categoryService";
import { isElectron } from "../../../services/api";

function Categorias({ canManageCatalog = true, basePath = "/manager" }) {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarCategorias() {
    setLoading(true);
    try {
      const data = await listarCategorias();
      setCategorias(data || []);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao listar categorias");
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  const abrirCategoria = (cat) => {
    navigate("/select-products", {
      state: {
        categoria: cat,
        backTo: `${basePath}?tab=Categorias`,
      },
    });
  };

  const salvarCategoria = async (data) => {
    try {
      await cadastrarCategoria(data, 1);
      await carregarCategorias();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao cadastrar categoria");
    }
  };

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
          <button className="bntPadraoGreen" onClick={() => setOpenModal(true)}>
            + Cadastrar Categoria
          </button>
        )}
      </div>

      {!isElectron && (
        <div
          style={{
            padding: 10,
            background: "#fff3cd",
            borderRadius: 8,
            marginBottom: 12,
            width: "100%",
          }}
        >
          Você está no Chrome (sem Electron). O BACK via IPC (window.api) não funciona aqui.
        </div>
      )}

      <div className="produtos-container" style={{ width: "100%" }}>
        {loading && <div style={{ padding: 8 }}>Carregando categorias...</div>}

        {!loading && categorias.length === 0 && (
          <div style={{ padding: 8 }}>Nenhuma categoria encontrada.</div>
        )}

        {!loading &&
          categorias.map((cat) => (
            <div
              key={cat.id}
              className="produto-card"
              onClick={() => abrirCategoria(cat)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && abrirCategoria(cat)}
            >
              <div
                className="produto-imagem"
                style={{ backgroundImage: `url(${cat.imagem})` }}
              />
              <div className="produto-titulo">{cat.nome}</div>
            </div>
          ))}
      </div>

      <ModalCadastroCategoria
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={salvarCategoria}
        disabled={!canManageCatalog}
      />
    </div>
  );
}

export default Categorias;
