import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductsCategories() {
  const navigate = useNavigate();

  const categoriasIniciais = useMemo(
    () => [
      {
        id: 1,
        nome: "Entradas",
        imagem:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=60",
      },
      {
        id: 2,
        nome: "Principais",
        imagem:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=60",
      },
      {
        id: 3,
        nome: "Sobremesas",
        imagem:
          "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=60",
      },
    ],
    []
  );

  const [categorias, setCategorias] = useState(categoriasIniciais);

  // Modal cadastro categoria
  const [openModal, setOpenModal] = useState(false);
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");

  const abrirCategoria = (categoria) => {
    navigate("/select-products", { state: { categoria } });
  };

  const salvarCategoria = () => {
    if (!nome.trim()) {
      alert("Informe o nome da categoria.");
      return;
    }

    setCategorias((prev) => [
      ...prev,
      {
        id: Date.now(),
        nome: nome.trim(),
        imagem:
          imagem.trim() ||
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=60",
      },
    ]);

    setOpenModal(false);
  };

  return (
    <div className="tela">
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          marginBottom: 18,
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: "#222" }}>Categorias</h1>
          <p style={{ marginTop: 6, color: "#555" }}>
            Gerencie as categorias de produtos
          </p>
        </div>

        {/* ✅ BOTÕES */}
        <div style={{ display: "flex", gap: 10 }}>

          <button
            className="bntPadraoGreen"
            onClick={() => setOpenModal(true)}
          >
            + Cadastrar Categoria
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="produtos-container">
        {categorias.map((cat) => (
          <div
            key={cat.id}
            className="produto-card"
            onClick={() => abrirCategoria(cat)}
          >
            <div
              className="produto-imagem"
              style={{ backgroundImage: `url(${cat.imagem})` }}
            />
            <div className="produto-titulo">{cat.nome}</div>
          </div>
        ))}
      </div>

      {/* MODAL CATEGORIA */}
      {openModal && (
        <div
          onClick={() => setOpenModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 20,
              width: 420,
              display: "grid",
              gap: 10,
            }}
          >
            <h2>Cadastrar Categoria</h2>

            <input
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              placeholder="URL da imagem"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                className="bntPadrao"
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </button>
              <button className="bntPadraoGreen" onClick={salvarCategoria}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsCategories;
