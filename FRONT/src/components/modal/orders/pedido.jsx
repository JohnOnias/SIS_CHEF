import React, { useState } from "react";
import "./styles/pedido.css";

const produtosMock = [
  { id: 1, nome: "Hambúrguer", preco: 18 },
  { id: 2, nome: "Refrigerante", preco: 6 },
  { id: 3, nome: "Batata Frita", preco: 12 },
  { id: 4, nome: "Suco", preco: 8 },
];

function PedidoModal({ isOpen, onClose, mesa }) {
  const [itensSelecionados, setItensSelecionados] = useState([]);

  if (!isOpen || !mesa) {
    return null;
  }

  function adicionarProduto(produto) {
    setItensSelecionados((prev) => {
      const existe = prev.find((item) => item.id === produto.id);

      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function removerProduto(id) {
    setItensSelecionados((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }

  const total = itensSelecionados.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0,
  );

  return (
    <div className="overlay">
      <div className="container-pedido">
        <div className="container-titulo">
          <h2>Mesa {mesa}</h2>
          <button className="btn-fechar" onClick={onClose}>
            X
          </button>
        </div>

        <div className="container-pedido-lista">
          <h3>Produtos</h3>
          {produtosMock.map((produto) => (
            <div key={produto.id} className="produto-item">
              <span>
                {produto.nome} - R$ {produto.preco}
              </span>
              <button onClick={() => adicionarProduto(produto)}>
                Adicionar
              </button>
            </div>
          ))}
        </div>

        <div className="container-produto-selecionado">
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
                  <button onClick={() => adicionarProduto(item)}>+</button>
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
