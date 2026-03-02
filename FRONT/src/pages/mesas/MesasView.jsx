import { useState, useEffect, useCallback } from "react";
import "./style/mesas.css";

import AddMesaModal from "../../components/modal/mesas/addmesa";
import RemoverMesaModal from "../../components/modal/mesas/removermesa";
import PedidoModal from "../../components/modal/orders/addPedido";
import EditarPedidoModal from "../../components/modal/orders/editPedido";
import PaymentModal from "../../components/modal/orders/paymentModal";
import CustomModal from "../../components/modal/error/customModal";

const MESA_STATUS = {
  LIVRE: "livre",
  OCUPADA: "ocupada",
};

export default function Mesas() {
  const [mesas, setMesas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modais
  const [modalState, setModalState] = useState({
    addMesa: false,
    removerMesa: false,
    addPedido: false,
    editPedido: false,
    pagamento: false,
    feedback: false,
  });

  // Dados
  const [selectedData, setSelectedData] = useState({
    mesa: null,
    pedido: null,
    total: 0,
  });

  // Feedback
  const [feedback, setFeedback] = useState({
    message: "",
    type: "success",
  });

  // =============================
  // CARREGAR MESAS
  // =============================
  const carregarMesas = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await window.api.mesas.listarMesas();
      const mesasData = Array.isArray(response)
        ? response
        : response?.data
          ? response.data
          : [];
      setMesas(mesasData);
    } catch (error) {
      showFeedback("Erro ao carregar mesas", "error");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    carregarMesas();
  }, []);

  // =============================
  // UTILITÁRIOS
  // =============================
  const showFeedback = (message, type = "success") => {
    setFeedback({ message, type });
    setModalState((prev) => ({ ...prev, feedback: true }));
  };

  const closeModal = (modalName) => {
    setModalState((prev) => ({ ...prev, [modalName]: false }));
    if (
      modalName === "pagamento" ||
      modalName === "addPedido" ||
      modalName === "editPedido"
    ) {
      setSelectedData({ mesa: null, pedido: null, total: 0 });
    }
  };

  // =============================
  // AÇÕES
  // =============================
  const abrirPedido = (mesa) => {
    if (!mesa?.id) {
      showFeedback("Mesa inválida", "error");
      return;
    }

    setSelectedData((prev) => ({ ...prev, mesa }));

    if (mesa.status === MESA_STATUS.LIVRE) {
      setModalState((prev) => ({ ...prev, addPedido: true }));
    } else {
      setModalState((prev) => ({ ...prev, editPedido: true }));
    }
  };

  const handleFecharPedido = (pedidoAtual, total, mesa) => {
    if (!pedidoAtual?.id || total <= 0) {
      showFeedback("Pedido inválido", "error");
      return;
    }

    setSelectedData((prev) => ({
      ...prev,
      pedido: pedidoAtual,
      total: total,
      mesa: mesa.numero, 
    }));

    setModalState((prev) => ({ ...prev, pagamento: true }));
  };

 const handleConfirmPagamento = async (formaPagamento) => {
   // 🟢 1. PEGA OS DADOS PRIMEIRO
   const { mesa, pedido, total } = selectedData;

   // 🟢 2. LOG DEPOIS DE PEGAR OS DADOS (com optional chaining pra não quebrar)
   console.log("📝 Dados do pagamento:", {
     formaPagamento,
     idPedido: pedido?.id,
     numeroMesa: mesa,
     total,
   });

   // 🟢 3. VALIDAÇÕES
   if (!pedido?.id) {
     showFeedback("ID do pedido não encontrado", "error");
     return;
   }

   if (!mesa) {
     showFeedback("Número da mesa não encontrado", "error");
     return;
   }

   if (!formaPagamento) {
     showFeedback("Selecione uma forma de pagamento", "error");
     return;
   }

   if (total <= 0) {
     showFeedback("Total inválido para pagamento", "error");
     return;
   }

   // 🟢 4. PROCESSA PAGAMENTO
   setIsLoading(true);

   try {
     console.log("🔄 Processando pagamento...");

     const resposta = await window.api.pagamento.cadastrarPagamento(
       pedido.id,
       formaPagamento,
       total,
       mesa,
     );

     console.log("✅ Resposta do pagamento:", resposta);

     const success = resposta?.success || resposta?.status === "success";

     if (!success) {
       showFeedback(resposta?.error || "Erro no pagamento", "error");
       return;
     }

     showFeedback("Pagamento realizado com sucesso!", "success");
     closeModal("pagamento");
     await carregarMesas();
   } catch (error) {
     console.error("❌ Erro no pagamento:", error);
     showFeedback(
       "Erro ao processar pagamento: " + (error.message || ""),
       "error",
     );
   } finally {
     setIsLoading(false);
   }
 };

  return (
    <div className="layout">
      <main className="content">
        <div className="header">
          <div>
            <h1>Mesas</h1>
            <p>Clique na mesa para abrir pedido</p>
          </div>
          <div className="buttons">
            <button
              className="remove"
              onClick={() =>
                setModalState((prev) => ({ ...prev, removerMesa: true }))
              }
              disabled={isLoading || mesas.length === 0}
            >
              Remover Mesa
            </button>
            <button
              className="add"
              onClick={() =>
                setModalState((prev) => ({ ...prev, addMesa: true }))
              }
              disabled={isLoading}
            >
              Adicionar Mesa
            </button>
          </div>
        </div>

        {isLoading && !mesas.length ? (
          <div className="loading">Carregando mesas...</div>
        ) : (
          <div className="grid">
            {mesas.map((mesa) => (
              <div
                key={mesa.id}
                className={`card ${isLoading ? "disabled" : ""}`}
                onClick={() => !isLoading && abrirPedido(mesa)}
              >
                <h2>Mesa {mesa.numero}</h2>
                <span
                  className={`status ${
                    mesa.status === MESA_STATUS.LIVRE ? "disponivel" : "ocupada"
                  }`}
                >
                  {mesa.status === MESA_STATUS.LIVRE ? "Disponível" : "Ocupada"}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modais */}
      <AddMesaModal
        isOpen={modalState.addMesa}
        onClose={() => closeModal("addMesa")}
        onMesaCriada={() => {
          carregarMesas();
          showFeedback("Mesa cadastrada com sucesso!");
          closeModal("addMesa");
        }}
      />

      <RemoverMesaModal
        isOpen={modalState.removerMesa}
        onClose={() => closeModal("removerMesa")}
        onMesaRemovida={() => {
          carregarMesas();
          showFeedback("Mesa removida com sucesso!");
          closeModal("removerMesa");
        }}
      />

      <PedidoModal
        isOpen={modalState.addPedido}
        onClose={(sucesso) => {
          closeModal("addPedido");
          if (sucesso) carregarMesas();
        }}
        mesa={selectedData.mesa}
      />

      <EditarPedidoModal
        isOpen={modalState.editPedido}
        onClose={() => closeModal("editPedido")}
        mesa={selectedData.mesa}
        onAdicionarItens={() => {
          closeModal("editPedido");
          setModalState((prev) => ({ ...prev, addPedido: true }));
        }}
        onFecharPedido={handleFecharPedido}
      />

      <PaymentModal
        isOpen={modalState.pagamento}
        onClose={() => closeModal("pagamento")}
        total={selectedData.total}
        onConfirm={handleConfirmPagamento}
        isLoading={isLoading}
      />

      <CustomModal
        isOpen={modalState.feedback}
        title={feedback.type === "success" ? "Sucesso" : "Erro"}
        message={feedback.message}
        onClose={() => closeModal("feedback")}
        duration={3000}
        type={feedback.type}
        cancelText="Fechar"
      />
    </div>
  );
}
