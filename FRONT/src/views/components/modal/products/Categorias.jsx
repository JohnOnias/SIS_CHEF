import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCadastroCategoria from "./CadastroCategorias";
import "./styles/categorias.css";

import {
  ensureCatalogSeed,
  getCategories,
  addCategory,
} from "../../../../services/catalogStorage";

function Categorias({ canManageCatalog = true, basePath = "/manager" }) {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const categorias = useMemo(() => {
    ensureCatalogSeed();
    return getCategories();
  }, [refresh]);

  const abrirCategoria = (cat) => {
    navigate("/select-products", {
      state: {
        categoria: cat,
        backTo: `${basePath}?tab=Categorias`,
      },
    });
  };

  const salvarCategoria = (data) => {
    addCategory(data);
    setRefresh((r) => r + 1);
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
          <p style={{ margin: "6px 0 0", color: "#555", fontWeight: 500 }}>
            Categorias de produtos
          </p>
        </div>

        {canManageCatalog && (
          <button className="bntPadraoGreen" onClick={() => setOpenModal(true)}>
            + Cadastrar Categoria
          </button>
        )}
      </div>

      <div className="produtos-container" style={{ width: "100%" }}>
        {categorias.map((cat) => (
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
