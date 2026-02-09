import React, { useEffect, useMemo, useState } from "react";
import PaymentModal from "./paymentModal.jsx";

import { listarCategorias } from "../../../../services/categoryService";
import { listarProdutosPorCategoria } from "../../../../services/productService";
import { isElectron } from "../../../../services/api";

import { readWaiterNames } from "./openOrder/utils/waiterNames";
import { formatMoney } from "./openOrder/utils/money";

import OpenOrderShell from "./openOrder/components/OpenOrderShell";
import OpenOrderHeader from "./openOrder/components/OpenOrderHeader";
import CategoryTabs from "./openOrder/components/CategoryTabs";
import ProductsList from "./openOrder/components/ProductsList";
import OpenOrderFooter from "./openOrder/components/OpenOrderFooter";

function OpenOrderModal({ isOpen, onClose, mesa }) {
  const [openPagamento, setOpenPagamento] = useState(false);

  // 🔐 papel do usuário
  const role = localStorage.getItem("user_role") || "manager";
  const isManager = role === "manager";

  // ✅ seleção de garçom (somente gerente)
  const [waiterNames] = useState(() => readWaiterNames());
  const [nomeGarcom, setNomeGarcom] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const [produtos, setProdutos] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProds, setLoadingProds] = useState(true);

  // carrinho: { [idProduto]: { id, nome, preco, qtd } }
  const [carrinho, setCarrinho] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      setLoadingCats(true);
      try {
        const cats = await listarCategorias();
        setCategorias(cats || []);
        setCategoriaSelecionada((prev) => prev || (cats?.[0] ?? null));
      } catch (e) {
        console.error(e);
        setCategorias([]);
      } finally {
        setLoadingCats(false);
      }
    })();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (!categoriaSelecionada?.id) return;

    (async () => {
      setLoadingProds(true);
      try {
        const prods = await listarProdutosPorCategoria(categoriaSelecionada.id);
        setProdutos(prods || []);
      } catch (e) {
        console.error(e);
        setProdutos([]);
      } finally {
        setLoadingProds(false);
      }
    })();
  }, [isOpen, categoriaSelecionada?.id]);

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

  const removeQtd = (p) => {
    setCarrinho((prev) => {
      const atual = prev[p.id];
      if (!atual) return prev;
      const qtd = atual.qtd - 1;
      if (qtd <= 0) {
        const copy = { ...prev };
        delete copy[p.id];
        return copy;
      }
      return { ...prev, [p.id]: { ...atual, qtd } };
    });
  };

  return (
    <>
      <OpenOrderShell onClose={onClose}>
        <OpenOrderHeader
          mesa={mesa}
          isManager={isManager}
          nomeGarcom={nomeGarcom}
          setNomeGarcom={setNomeGarcom}
          waiterNames={waiterNames}
        />

        {!isElectron && (
          <div
            style={{
              padding: 10,
              background: "#fff3cd",
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            Você está no Chrome (sem Electron). O BACK via IPC (window.api) não funciona aqui.
          </div>
        )}

        <CategoryTabs
          categorias={categorias}
          categoriaAtual={categoriaSelecionada}
          onSelect={(c) => setCategoriaSelecionada(c)}
          loading={loadingCats}
        />

        <ProductsList
          produtos={produtos}
          loading={loadingProds}
          onAdd={addQtd}
          onRemove={removeQtd}
          carrinho={carrinho}
        />

        <OpenOrderFooter
          itens={itensCarrinho}
          total={formatMoney(total)}
          onPagamento={() => setOpenPagamento(true)}
        />
      </OpenOrderShell>

      <PaymentModal
        open={openPagamento}
        onClose={() => setOpenPagamento(false)}
        total={total}
      />
    </>
  );
}

export default OpenOrderModal;
