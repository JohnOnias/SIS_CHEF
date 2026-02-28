import React, { useState, useEffect } from "react";
import "./styles/pedido.css";

function AddPedidoModal({ isOpen, onClose, mesa }) {
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [idPedido, setIdPedido] = useState(null);

  // =============================
  // CARREGAR CATEGORIAS
  // =============================
  useEffect(() => {
    async function getCategorias() {
      try {
        const resposta = await window.api.categoria.getCategorias();
        setCategorias(Array.isArray(resposta?.data) ? resposta.data : []);
      } catch {
        setCategorias([]);
      }
    }

    getCategorias();
  }, []);

  // =============================
  // PRODUTOS POR CATEGORIA
  // =============================
  useEffect(() => {
    if (!categoriaSelecionada) return;

    async function getProdutos() {
      try {
        const resposta =
          await window.api.produto.getProdutosPorCategoria(
            categoriaSelecionada,
          );

        setProdutos(Array.isArray(resposta) ? resposta : resposta?.data || []);
      } catch {
        setProdutos([]);
      }
    }

    getProdutos();
  }, [categoriaSelecionada]);

  if (!isOpen || !mesa) return null;

  // =============================
  // MANIPULAÇÃO DE ITENS
  // =============================
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
    (acc, item) => acc + Number(item.preco || 0) * Number(item.quantidade || 0),
    0,
  );

  // FINALIZAR PEDIDO
  // =============================
  async function finalizarPedido() {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario?.id) throw new Error("Usuário inválido");

      let pedidoId = idPedido;

      // 1️⃣ Verifica se já existe um pedido aberto na mesa
      if (!pedidoId) {
        const pedidosNaMesa = await window.api.pedido.listarPedidos(
          mesa.numero,
        );
        const pedidoAtivo = Array.isArray(pedidosNaMesa)
          ? pedidosNaMesa.find((p) => p.status === "aberto")
          : pedidosNaMesa?.status === "aberto"
            ? pedidosNaMesa
            : null;

        if (pedidoAtivo) {
          // já existe pedido aberto, pega o id
          pedidoId = pedidoAtivo.id;
          setIdPedido(pedidoId);
        }
      }

      // 2️⃣ Se ainda não existe, cria um novo
      if (!pedidoId) {
        const response = await window.api.pedido.registrarPedido(
          mesa.numero,
          usuario.id,
        );
        pedidoId = response?.data?.id;
        if (!pedidoId) throw new Error("Pedido não criado");
        setIdPedido(pedidoId);
      }

      // 3️⃣ Adiciona os itens selecionados ao pedido (novo ou existente)
      await window.api.pedido.adicionarProdutosPedido(
        pedidoId,
        itensSelecionados,
      );

      // 4️⃣ Limpa a seleção e fecha modal
      setItensSelecionados([]);
      onClose();
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
    }
  }
  return (
    <div className="overlay">
      <div className="container-pedido">
        <div className="container-titulo">
          <h2>Mesa {mesa.numero}</h2>
          <button className="btn-fechar" onClick={onClose}>
            X
          </button>
        </div>

        {/* COLUNA ESQUERDA - PRODUTOS */}
        <div className="col-esquerda">
          <div className="listar-categoria-container">
            {categorias.map((categoria) => (
              <div
                key={categoria.id}
                className={`listar-categoria ${
                  categoria.id === categoriaSelecionada ? "active" : ""
                }`}
                onClick={() => setCategoriaSelecionada(categoria.id)}
              >
                {categoria.nome}
              </div>
            ))}
          </div>

          <div>
            {produtos.length === 0 ? (
              <p>Selecione uma categoria</p>
            ) : (
              produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="produto-item"
                  onClick={() => adicionarProduto(produto)}
                >
                  <span>{produto.nome}</span>
                  <span>R$ {produto.preco}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUNA DIREITA - ITENS */}
        <div className="col-direita">
          <h3>Itens Selecionados</h3>

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

          <h3>Total: R$ {total.toFixed(2)}</h3>

          <div className="container-buttons">
            <button className="btn-finalizar" onClick={finalizarPedido}>
              Fazer Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPedidoModal;
