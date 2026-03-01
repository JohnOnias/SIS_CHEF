import { useState, useEffect } from "react";
import "./style/mesas.css";

import AddMesaModal from "../../components/modal/mesas/addmesa";
import RemoverMesaModal from "../../components/modal/mesas/removermesa";
import PedidoModal from "../../components/modal/orders/addPedido";
import EditarPedidoModal from "../../components/modal/orders/editPedido";
import PaymentModal from "../../components/modal/orders/paymentModal";
import CustomModal from "../../components/modal/error/customModal";

export default function Mesas() {
  const [mesas, setMesas] = useState([]);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalRemover, setOpenModalRemover] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [mesaSelecionada, setMesaSelecionada] = useState(null);

  const [openPagamento, setOpenPagamento] = useState(false);
  const [pedidoParaPagamento, setPedidoParaPagamento] = useState(null);
  const [totalPagamento, setTotalPagamento] = useState(0);

  const [openFeedback, setOpenFeedback] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState("");
  const [tipoFeedback, setTipoFeedback] = useState("success");

  async function carregarMesas() {
    try {
      const data = await window.api.mesas.listarMesas();
      setMesas(data);
    } catch (error) {
      setMensagemFeedback("Erro ao carregar mesas");
      setTipoFeedback("error");
      setOpenFeedback(true);
    }
  }

  useEffect(() => {
    carregarMesas();
  }, []);

  const abrirPedido = (mesa) => {
    setMesaSelecionada(mesa);

    if (mesa.status === "livre") {
      setOpenAdd(true);
    } else {
      setOpenEdit(true);
    }
  };

  const handleFecharPedido = (pedidoAtual, total) => {
    setPedidoParaPagamento(pedidoAtual);
    setTotalPagamento(total);
    setOpenPagamento(true);
  };

  const handleConfirmPagamento = async (formaPagamento) => {
    if (!pedidoParaPagamento || !mesaSelecionada) return;

    try {
      const resposta = await window.api.pagamento.cadastrarPagamento(
        pedidoParaPagamento.id,
        formaPagamento,
        totalPagamento,
        mesaSelecionada.numero,
      );

      if (!resposta?.success) {
        setMensagemFeedback(resposta?.error || "Erro ao registrar pagamento");
        setTipoFeedback("error");
        setOpenFeedback(true);
        return;
      }

      setMensagemFeedback("Pagamento realizado com sucesso!");
      setTipoFeedback("success");
      setOpenFeedback(true);

      setOpenPagamento(false);
      carregarMesas();
    } catch (error) {
      setMensagemFeedback("Erro inesperado ao processar pagamento");
      setTipoFeedback("error");
      setOpenFeedback(true);
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
              onClick={() => setOpenModalRemover(true)}
            >
              Remover Mesa
            </button>

            <button className="add" onClick={() => setOpenModalAdd(true)}>
              Adicionar Mesa
            </button>
          </div>
        </div>

        <div className="grid">
          {mesas.map((mesa) => (
            <div
              key={mesa.id}
              className="card"
              onClick={() => abrirPedido(mesa)}
            >
              <h2>{mesa.numero}</h2>

              <span
                className={
                  mesa.status === "livre"
                    ? "status disponivel"
                    : "status ocupada"
                }
              >
                {mesa.status === "livre" ? "Disponível" : "Ocupada"}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* MODAIS */}

      <AddMesaModal
        isOpen={openModalAdd}
        onClose={() => setOpenModalAdd(false)}
        onMesaCriada={() => {
          carregarMesas();
          setMensagemFeedback("Mesa cadastrada com sucesso!");
          setTipoFeedback("success");
          setOpenFeedback(true);
        }}
      />

      <RemoverMesaModal
        isOpen={openModalRemover}
        onClose={() => setOpenModalRemover(false)}
        onMesaRemovida={() => {
          carregarMesas();
          setMensagemFeedback("Mesa removida com sucesso!");
          setTipoFeedback("success");
          setOpenFeedback(true);
        }}
      />

      <PedidoModal
        isOpen={openAdd}
        onClose={() => {
          setOpenAdd(false);
          carregarMesas();
        }}
        mesa={mesaSelecionada}
      />

      <EditarPedidoModal
        isOpen={openEdit}
        onClose={() => {
          setOpenEdit(false);
          carregarMesas();
        }}
        mesa={mesaSelecionada}
        onAdicionarItens={() => {
          setOpenEdit(false);
          setOpenAdd(true);
        }}
        onFecharPedido={handleFecharPedido}
      />

      <PaymentModal
        isOpen={openPagamento}
        onClose={() => setOpenPagamento(false)}
        total={totalPagamento}
        pedidoAtual={pedidoParaPagamento}
        onConfirm={handleConfirmPagamento}
      />

      <CustomModal
        isOpen={openFeedback}
        title={tipoFeedback === "success" ? "Sucesso" : "Erro"}
        message={mensagemFeedback}
        onClose={() => setOpenFeedback(false)}
        duration={3000}
        type={tipoFeedback}
        cancelText="Fechar"
      />
    </div>
  );
}
