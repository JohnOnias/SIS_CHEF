import React, { useState, useEffect, useRef } from "react";
import "./styles/pedido.css";

// Configurações
const TIMEOUTS = {
  PEDIDO: 10000, // 10 segundos
  PRODUTOS: 8000, // 8 segundos
  CATEGORIAS: 5000, // 5 segundos
};

const MESA_STATUS = {
  LIVRE: "livre",
  OCUPADA: "ocupada",
};

function AddPedidoModal({ isOpen, onClose, mesa }) {
    console.log("🎯 PedidoModal renderizando:", { isOpen, mesa });
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [slowConnection, setSlowConnection] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);
  const slowTimerRef = useRef(null);

  // Reset ao abrir/fechar
  useEffect(() => {
    if (isOpen) {
      resetModal();
      carregarCategorias();
    } else {
      cleanup();
    }
  }, [isOpen, mesa?.numero]);

  function resetModal() {
    setItensSelecionados([]);
    setCategoriaSelecionada(null);
    setError(null);
    setSlowConnection(false);
  }

  function cleanup() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (slowTimerRef.current) {
      clearTimeout(slowTimerRef.current);
    }
  }

  // =============================
  // CARREGAR CATEGORIAS
  // =============================
  async function carregarCategorias() {
    abortControllerRef.current = new AbortController();

    setSlowConnection(false);
    slowTimerRef.current = setTimeout(() => {
      setSlowConnection(true);
    }, 3000);

    try {
      const response = await Promise.race([
        window.api.categoria.getCategorias({
          signal: abortControllerRef.current.signal,
        }),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("timeout_categorias")),
            TIMEOUTS.CATEGORIAS,
          ),
        ),
      ]);

      setCategorias(Array.isArray(response?.data) ? response.data : []);
      setSlowConnection(false);
    } catch (err) {
      if (err.message === "timeout_categorias") {
        setError("Conexão lenta ao carregar categorias");
      }
    } finally {
      clearTimeout(slowTimerRef.current);
    }
  }

  // =============================
  // CARREGAR PRODUTOS
  // =============================
  useEffect(() => {
    if (!categoriaSelecionada || !isOpen) return;

    async function getProdutos() {
      try {
        const response =
          await window.api.produto.getProdutosPorCategoria(
            categoriaSelecionada,
          );
        setProdutos(Array.isArray(response) ? response : response?.data || []);
      } catch (err) {
        console.error("Erro produtos:", err);
        setProdutos([]);
      }
    }

    getProdutos();
  }, [categoriaSelecionada, isOpen]);

  if (!isOpen || !mesa){
        console.log("❌ PedidoModal não vai renderizar:", { isOpen, mesa });
    return null;


  } 

  // =============================
  // MANIPULAR ITENS
  // =============================
  function adicionarProduto(produto) {
    if (isLoading) return;

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
    if (isLoading) return;

    setItensSelecionados((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }

  const total = itensSelecionados.reduce(
    (acc, item) =>
      acc + (Number(item.preco) || 0) * (Number(item.quantidade) || 0),
    0,
  );

  // =============================
  // FINALIZAR PEDIDO
  // =============================
  async function finalizarPedido() {
    if (itensSelecionados.length === 0) {
      setError("Adicione pelo menos um item");
      return;
    }

    if (isLoading) {
      setError("Processando, aguarde...");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSlowConnection(false);

    const slowTimer = setTimeout(() => setSlowConnection(true), 5000);
    const tentativaId = Date.now() + "-" + Math.random();

    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario?.id) throw new Error("Usuário não autenticado");

      // 1️⃣ Verifica pedido existente
      let pedidoId = await verificarPedidoExistente(mesa.numero);

      // 2️⃣ Cria novo se não existir
      if (!pedidoId) {
        pedidoId = await criarNovoPedido(mesa.numero, usuario.id, tentativaId);
      }

      // 3️⃣ Adiciona itens
      await adicionarItensPedido(pedidoId, itensSelecionados, tentativaId);

      // 4️⃣ Sucesso!
      clearTimeout(slowTimer);
      setItensSelecionados([]);
      onClose(true);
    } catch (err) {
      clearTimeout(slowTimer);
      tratarErroFinalizacao(err, mesa.numero);
    } finally {
      setIsLoading(false);
      setSlowConnection(false);
    }
  }

  async function verificarPedidoExistente(numeroMesa) {
    try {
      const response = await Promise.race([
        window.api.pedido.listarPedidos(numeroMesa),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("timeout_verificacao")),
            TIMEOUTS.PEDIDO,
          ),
        ),
      ]);

      const pedidos = Array.isArray(response) ? response : response?.data || [];
      const pedidoAtivo = pedidos.find((p) => p.status === "aberto");

      return pedidoAtivo?.id || null;
    } catch (err) {
      if (err.message === "timeout_verificacao") {
        throw new Error("Tempo esgotado ao verificar mesa");
      }
      return null;
    }
  }

  async function criarNovoPedido(numeroMesa, usuarioId, tentativaId) {
    try {
      const response = await Promise.race([
        window.api.pedido.registrarPedido(numeroMesa, usuarioId),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("timeout_criacao")),
            TIMEOUTS.PEDIDO,
          ),
        ),
      ]);

      const pedidoId = response?.data?.id || response?.id;
      if (!pedidoId) throw new Error("Falha ao criar pedido");

      return pedidoId;
    } catch (err) {
      if (err.message === "timeout_criacao") {
        // Tenta buscar se foi criado mesmo com timeout
        const pedidoId = await verificarPedidoExistente(numeroMesa);
        if (pedidoId) return pedidoId;
        throw new Error("Timeout ao criar pedido. Tente novamente.");
      }
      throw err;
    }
  }

  async function adicionarItensPedido(pedidoId, itens, tentativaId) {
    try {
      await Promise.race([
        window.api.pedido.adicionarProdutosPedido(pedidoId, itens),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("timeout_itens")),
            TIMEOUTS.PRODUTOS,
          ),
        ),
      ]);
    } catch (err) {
      if (err.message === "timeout_itens") {
        throw new Error(
          "Timeout ao adicionar itens. Verifique se foram adicionados.",
        );
      }
      throw err;
    }
  }

  function tratarErroFinalizacao(err, numeroMesa) {
    if (err.message.includes("timeout")) {
      setError("⚠️ Banco lento! Tente novamente em alguns segundos.");

      // Tenta verificar se o pedido foi criado mesmo com erro
      setTimeout(async () => {
        const pedidoId = await verificarPedidoExistente(numeroMesa);
        if (pedidoId) {
          alert("✅ Seu pedido pode ter sido criado! Verifique a mesa.");
        }
      }, 3000);
    } else if (err.message.includes("Usuário")) {
      setError("Erro de autenticação. Faça login novamente.");
    } else {
      setError(err.message || "Erro inesperado ao finalizar pedido");
    }
  }

  return (
    <div className="overlay">
      <div className="container-pedido">
        <div className="container-titulo">
          <h2>Mesa {mesa.numero}</h2>
          <button className="btn-fechar" onClick={() => onClose()}>
            X
          </button>
        </div>

        {/* Alertas */}
        {slowConnection && (
          <div
            style={{
              background: "#fff3cd",
              color: "#856404",
              padding: "10px",
              margin: "10px",
              borderRadius: "4px",
              border: "1px solid #ffeeba",
              textAlign: "center",
            }}
          >
            ⚠️ Conexão lenta... Aguarde
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#f8d7da",
              color: "#721c24",
              padding: "15px",
              margin: "10px",
              borderRadius: "4px",
              border: "1px solid #f5c6cb",
            }}
          >
            <strong>Erro:</strong> {error}
            {error.includes("Banco lento") && (
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginLeft: "10px",
                  background: "#721c24",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Recarregar
              </button>
            )}
          </div>
        )}

        {/* Coluna Esquerda - Produtos */}
        <div className="col-esquerda">
          <div className="listar-categoria-container">
            {categorias.map((categoria) => (
              <div
                key={categoria.id}
                className={`listar-categoria ${
                  categoria.id === categoriaSelecionada ? "active" : ""
                }`}
                onClick={() =>
                  !isLoading && setCategoriaSelecionada(categoria.id)
                }
              >
                {categoria.nome}
              </div>
            ))}
          </div>

          <div>
            {produtos.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>
                {categoriaSelecionada
                  ? "Carregando produtos..."
                  : "Selecione uma categoria"}
              </p>
            ) : (
              produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="produto-item"
                  onClick={() => adicionarProduto(produto)}
                  style={{
                    opacity: isLoading ? 0.5 : 1,
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  <span>{produto.nome}</span>
                  <span>R$ {Number(produto.preco).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Coluna Direita - Itens Selecionados */}
        <div className="col-direita">
          <h3>Itens Selecionados</h3>

          {itensSelecionados.length === 0 && (
            <p style={{ textAlign: "center", color: "#999" }}>Nenhum item</p>
          )}

          {itensSelecionados.map((item) => (
            <div key={item.id} className="pedido-item">
              <span>
                {item.nome} x{item.quantidade}
              </span>
              <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
              <div>
                <button
                  onClick={() => removerProduto(item.id)}
                  disabled={isLoading}
                >
                  -
                </button>
                <button
                  onClick={() => adicionarProduto(item)}
                  disabled={isLoading}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <h3>Total: R$ {total.toFixed(2)}</h3>

          <div className="container-buttons">
            <button
              className="btn-finalizar"
              onClick={finalizarPedido}
              disabled={isLoading || itensSelecionados.length === 0}
              style={{
                background: isLoading ? "#ccc" : "#4CAF50",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading
                ? slowConnection
                  ? "🔄 Processando (lento)..."
                  : "⏳ Processando..."
                : "Fazer Pedido"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPedidoModal;
