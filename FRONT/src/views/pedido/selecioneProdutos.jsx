import React, { useState, useEffect } from "react";
import './styleSelecionarProdutos.css';

function SelecionarProdutos() {
  // Lista de produtos de exemplo
  const produtosDisponiveis = [
    { id: 1, nome: "Pizza Margherita", categoria: "Pizza", preco: 25.0 },
    { id: 2, nome: "Pizza Calabresa", categoria: "Pizza", preco: 28.0 },
    { id: 3, nome: "Refrigerante", categoria: "Bebida", preco: 5.0 },
    { id: 4, nome: "Suco Natural", categoria: "Bebida", preco: 6.5 },
    { id: 5, nome: "Sobremesa", categoria: "Sobremesa", preco: 10.0 },
  ];

  const categoriasDisponiveis = [
    "Todas as categorias",
    "Pizza",
    "Bebida",
    "Sobremesa",
  ];

  const [categoriaSelecionada, setCategoriaSelecionada] = useState(
    "Todas as categorias"
  );
  const [carrinho, setCarrinho] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] =
    useState(produtosDisponiveis);
  const [total, setTotal] = useState(0);

  // Filtra produtos sempre que mudar a categoria
  useEffect(() => {
    if (categoriaSelecionada === "Todas as categorias") {
      setProdutosFiltrados(produtosDisponiveis);
    } else {
      setProdutosFiltrados(
        produtosDisponiveis.filter(
          (produto) => produto.categoria === categoriaSelecionada
        )
      );
    }
  }, [categoriaSelecionada]);

  // Atualiza total sempre que carrinho mudar
  useEffect(() => {
    const totalPreco = carrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
    setTotal(totalPreco);
  }, [carrinho]);

  const handleCategoriaChange = (e) => {
    setCategoriaSelecionada(e.target.value);
  };

  const handleAdicionarProduto = (produto) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        // aumenta a quantidade se já estiver no carrinho
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  const handleRemoverProduto = (produtoId) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const handleVoltar = () => {
    console.log("Voltar para tela anterior");
  };

  const handleFinalizar = () => {
    console.log("Pedido finalizado", carrinho);
    alert(`Pedido finalizado! Total: R$ ${total.toFixed(2)}`);
    setCarrinho([]);
  };

  return (
    <div id="container">
      <div id="main-content">
        {/* Seção de seleção de produtos */}
        <div id="produtos-section">
          <h2>Selecione os Produtos</h2>

          {/* Filtro por categoria */}
          <div id="categorias-container">
            <label htmlFor="categoria-select">Categoria:</label>
            <select
              id="categoria-select"
              value={categoriaSelecionada}
              onChange={handleCategoriaChange}
            >
              {categoriasDisponiveis.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Lista de produtos */}
          <div id="produtos-lista">
            {produtosFiltrados.map((produto) => (
              <div key={produto.id} style={{ marginBottom: "8px" }}>
                <span>
                  {produto.nome} - R$ {produto.preco.toFixed(2)}
                </span>
                <button
                  style={{ marginLeft: "8px" }}
                  onClick={() => handleAdicionarProduto(produto)}
                >
                  Adicionar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Seção do carrinho/pedido */}
        <div id="pedido-section">
          <h2>Produtos no Pedido</h2>
          <div id="carrinho-items">
            {carrinho.length === 0 && <p>Carrinho vazio</p>}
            {carrinho.map((item) => (
              <div key={item.id} style={{ marginBottom: "4px" }}>
                {item.nome} x {item.quantidade} - R${" "}
                {(item.preco * item.quantidade).toFixed(2)}
                <button
                  style={{ marginLeft: "8px" }}
                  onClick={() => handleRemoverProduto(item.id)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
          <div id="resumo-pedido">
            <p>
              <strong>Total:</strong> R${" "}
              <span id="total-preco">{total.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div id="buttons-container">
        <button className="bntPadrao" onClick={handleVoltar}>
          Voltar
        </button>
        <button className="bntPadraoGreen" onClick={handleFinalizar}>
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}

export default SelecionarProdutos;
