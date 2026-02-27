import React, { useState, useEffect } from "react";
import "./styles/pedido.css";

function PedidoModal({ isOpen, onClose, mesa }) {
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [produtos, setProdutos] = useState([]);

  // Busca categorias do backend
  async function getCategorias() {
    try {
      const resposta = await window.api.categoria.getCategorias();
      if (resposta?.data) setCategorias(resposta.data);
    } catch (error) {
      console.log("erro ao pegar categorias", error);
    }
  }

  // Busca produtos da categoria selecionada
  async function getProdutosByCategoria(categoriaId) {
    try {
      const produtos = await window.api.produto.getProdutosPorCategoria(categoriaId);
      setProdutos(produtos || []);
    } catch (error) {
      console.log("erro ao pegar produtos", error);
    }
  }

  useEffect(() => {
    getCategorias();
  }, []);

  useEffect(() => {
    if (categoriaSelecionada) getProdutosByCategoria(categoriaSelecionada);
  }, [categoriaSelecionada]);

  if (!isOpen || !mesa) return null;

  function adicionarProduto(produto) {
    setItensSelecionados((prev) => {
      const existe = prev.find((item) => item.id === produto.dataValues.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.dataValues.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...produto.dataValues, quantidade: 1 }];
    });
  }

  function removerProduto(id) {
    setItensSelecionados((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  const total = itensSelecionados.reduce(
    (acc, item) => acc + Number(item.preco) * item.quantidade,
    0
  );

  return (
    <div className="overlay">
      <div className="container-pedido">
        {/* HEADER */}
        <div className="container-titulo">
          <h2>Mesa {mesa}</h2>
          <button className="btn-fechar" onClick={onClose}>
            X
          </button>
        </div>

        {/* COLUNA ESQUERDA: categorias e produtos */}
        <div className="col-esquerda">
          {/* Categorias */}
          <div className="listar-categoria-container">
            {categorias.map((categoria) => (
              <div
                key={categoria.dataValues.id}
                className={`listar-categoria ${
                  categoria.dataValues.id === categoriaSelecionada ? "active" : ""
                }`}
                onClick={() => setCategoriaSelecionada(categoria.dataValues.id)}
              >
                {categoria.dataValues.nome}
              </div>
            ))}
          </div>

          {/* Produtos */}
          <div>
            {categoriaSelecionada && (
              <>
                {produtos.length === 0 ? (
                  <p>Nenhum produto nessa categoria</p>
                ) : (
                  produtos.map((produto) => (
                    <div
                      key={produto.dataValues.id}
                      className="produto-item"
                      onClick={() => adicionarProduto(produto)}
                    >
                      <span>{produto.dataValues.nome}</span>
                      <span>R$ {produto.dataValues.preco}</span>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA: pedido */}
        <div className="col-direita">
          <div className="container-list">
            <h3>Pedido</h3>
            {itensSelecionados.length === 0 && <p>Nenhum item</p>}
            {itensSelecionados.map((item) => (
              <div key={item.id} className="pedido-item">
                <span>
                  {item.nome} x{item.quantidade}
                </span>
                <div>
                  <button onClick={() => removerProduto(item.id)}>-</button>
                  <button
                    onClick={() =>
                      adicionarProduto({ dataValues: item })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="container-buttons">
            <h3>Total: R$ {total}</h3>
            <button className="btn-finalizar">Finalizar Pedido</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PedidoModal;