import React, { useMemo, useState } from "react";
import PaymentModal from "./paymentModal.jsx";
import {
  ensureCatalogSeed,
  getCategories,
  getProductsByCategory,
} from "../../../../services/catalogStorage";

const KEY_WAITER_NAMES = "waiter_names_v1";

function readWaiterNames() {
  try {
    const raw = localStorage.getItem(KEY_WAITER_NAMES);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function OpenOrderModal({ isOpen, onClose, mesa }) {
  const [openPagamento, setOpenPagamento] = useState(false);

  // 🔐 papel do usuário
  const role = localStorage.getItem("user_role") || "manager";
  const isManager = role === "manager";

  // ✅ seleção de garçom (somente gerente)
  const [waiterNames] = useState(() => readWaiterNames());
  const [nomeGarcom, setNomeGarcom] = useState("");

  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  // carrinho: { [idProduto]: { id, nome, preco, qtd } }
  const [carrinho, setCarrinho] = useState({});

  const categorias = useMemo(() => {
    ensureCatalogSeed();
    return getCategories();
  }, []);

  const categoriaAtual = useMemo(() => {
    if (categoriaSelecionada) return categoriaSelecionada;
    return categorias.length > 0 ? categorias[0] : null;
  }, [categoriaSelecionada, categorias]);

  const produtos = useMemo(() => {
    if (!categoriaAtual) return [];
    return getProductsByCategory(categoriaAtual.id);
  }, [categoriaAtual]);

  const itensCarrinho = useMemo(() => Object.values(carrinho), [carrinho]);

  const total = useMemo(() => {
    return itensCarrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0);
  }, [itensCarrinho]);

  if (!isOpen || !mesa) return null;

  const addQtd = (p) => {
    setCarrinho((prev) => {
      const atual = prev[p.id];
      const qtd = atual ? atual.qtd + 1 : 1;
      return {
        ...prev,
        [p.id]: { id: p.id, nome: p.nome, preco: Number(p.preco), qtd },
      };
    });
  };

  const subQtd = (p) => {
    setCarrinho((prev) => {
      const atual = prev[p.id];
      if (!atual) return prev;

      const novaQtd = atual.qtd - 1;
      if (novaQtd <= 0) {
        const copy = { ...prev };
        delete copy[p.id];
        return copy;
      }
      return { ...prev, [p.id]: { ...atual, qtd: novaQtd } };
    });
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          padding: 16,
        }}
        onClick={onClose}
      >
        {/* MODAL */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(980px, 96vw)",
            height: "min(92vh, 760px)",
            background: "#f5f6fa",
            borderRadius: 16,
            padding: 18,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <h2 style={{ margin: 0 }}>Mesa {mesa}</h2>

            <button className="bntPadrao" onClick={onClose} type="button">
              Fechar
            </button>
          </div>

          {/* CONTEÚDO */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: 16,
              overflow: "hidden",
            }}
          >
            {/* CATEGORIAS */}
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 12,
                overflowY: "auto",
              }}
            >
              <strong>Categorias</strong>

              <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                {categorias.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setCategoriaSelecionada(c)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: 8,
                      borderRadius: 10,
                      cursor: "pointer",
                      background:
                        categoriaAtual?.id === c.id ? "#e8f5e9" : "#f9fafb",
                      border:
                        categoriaAtual?.id === c.id
                          ? "2px solid #2f9e41"
                          : "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 8,
                        backgroundImage: `url(${c.imagem})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <strong>{c.nome}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* PRODUTOS */}
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <strong style={{ marginBottom: 10 }}>
                {categoriaAtual?.nome || "Produtos"}
              </strong>

              <div style={{ flex: 1, overflowY: "auto", paddingRight: 6 }}>
                {produtos.length === 0 ? (
                  <div
                    style={{
                      padding: 14,
                      borderRadius: 10,
                      border: "1px solid #e5e5e5",
                      fontWeight: 700,
                    }}
                  >
                    Nenhum produto cadastrado
                  </div>
                ) : (
                  <div style={{ display: "grid", gap: 10 }}>
                    {produtos.map((p) => {
                      const qtd = carrinho[p.id]?.qtd || 0;

                      return (
                        <div
                          key={p.id}
                          style={{
                            border: "1px solid #e5e5e5",
                            borderRadius: 10,
                            padding: 12,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 800 }}>{p.nome}</div>
                            <div style={{ fontWeight: 700, color: "#555" }}>
                              R$ {Number(p.preco).toFixed(2)}
                            </div>
                            {p.descricao && (
                              <div style={{ fontSize: 13, color: "#666" }}>
                                {p.descricao}
                              </div>
                            )}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <button
                              className="bntPadraoGreen"
                              style={{ width: 40, height: 40 }}
                              onClick={() => subQtd(p)}
                              type="button"
                            >
                              −
                            </button>

                            <strong>{qtd}</strong>

                            <button
                              className="bntPadraoGreen"
                              style={{ width: 40, height: 40 }}
                              onClick={() => addQtd(p)}
                              type="button"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* RODAPÉ */}
              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                  marginTop: 10,
                  paddingTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <strong>Total: R$ {total.toFixed(2)}</strong>

                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  {/* 🔐 SELECT SÓ PARA GERENTE */}
                  {isManager && (
                    <select
                      value={nomeGarcom}
                      onChange={(e) => setNomeGarcom(e.target.value)}
                      style={{
                        height: 44,
                        minWidth: 240,
                        padding: "0 12px",
                        borderRadius: 8,
                        border: "1px solid #ccc",
                        fontWeight: 700,
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Garçom</option>
                      {waiterNames.map((nome) => (
                        <option key={nome} value={nome}>
                          {nome}
                        </option>
                      ))}
                    </select>
                  )}

                  <button
                    className="bntPadraoGreen"
                    disabled={itensCarrinho.length === 0}
                    onClick={() => setOpenPagamento(true)}
                    style={{
                      height: 44,
                      minWidth: 180,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                    }}
                    type="button"
                  >
                    Finalizar Pedido
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAGAMENTO */}
      <PaymentModal
        isOpen={openPagamento}
        total={total}
        onClose={() => setOpenPagamento(false)}
        onConfirm={(forma) => {
          // 🔜 pronto pro back
          console.log("Pedido:", {
            mesa,
            garcom: isManager ? nomeGarcom : undefined,
            itens: itensCarrinho,
            total,
            formaPagamento: forma,
          });

          setCarrinho({});
          setOpenPagamento(false);
          onClose();
        }}
      />
    </>
  );
}

export default OpenOrderModal;
