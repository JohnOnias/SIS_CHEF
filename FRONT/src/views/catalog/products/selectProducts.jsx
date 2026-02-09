import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { listarProdutosPorCategoria, cadastrarProduto } from "../../../services/productService";
import { isElectron } from "../../../services/api";

import ProductsHeader from "./components/ProductsHeader";
import ProductCard from "./components/ProductCard";
import ProductFormModal from "./components/ProductFormModal";

function SelectProductsView() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const categoria = state?.categoria ?? null;
  const backTo = state?.backTo || null;

  // (por enquanto mantém seu controle de permissão do front)
  const role = localStorage.getItem("user_role") || "manager";
  const canManageCatalog = role !== "waiter";

  const [openModal, setOpenModal] = useState(false);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    if (!categoria) return;
    setLoading(true);
    try {
      const data = await listarProdutosPorCategoria(categoria.id);
      setProdutos(data || []);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao listar produtos");
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [categoria?.id]);

  const voltarParaCategorias = () => {
    if (backTo) navigate(backTo);
    else navigate(-1);
  };

  const abrirCriacao = () => {
    setNome("");
    setPreco("");
    setDescricao("");
    setOpenModal(true);
  };

  const salvarModal = async () => {
    try {
      await cadastrarProduto({
        nome,
        preco,
        descricao,
        categoria_id: categoria.id,
      });

      setOpenModal(false);
      await carregar();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao cadastrar produto");
    }
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
      <ProductsHeader
        categoriaNome={categoria.nome}
        onBack={voltarParaCategorias}
        canManageCatalog={canManageCatalog}
        onCreate={abrirCriacao}
      />

      {!isElectron && (
        <div
          style={{
            padding: 10,
            background: "#fff3cd",
            borderRadius: 8,
            marginBottom: 12,
            maxWidth: 900,
          }}
        >
          Você está no Chrome (sem Electron). O BACK via IPC (window.api) não funciona aqui.
        </div>
      )}

      {loading ? (
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
          Carregando produtos...
        </div>
      ) : produtos.length === 0 ? (
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
            <ProductCard
              key={p.id}
              produto={p}
              canManageCatalog={false /* sem editar/excluir ainda no BACK */}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      )}

      <ProductFormModal
        open={openModal && canManageCatalog}
        onClose={() => setOpenModal(false)}
        modo={"create"}
        nome={nome}
        setNome={setNome}
        preco={preco}
        setPreco={setPreco}
        descricao={descricao}
        setDescricao={setDescricao}
        onSave={salvarModal}
      />
    </div>
  );
}

export default SelectProductsView;
