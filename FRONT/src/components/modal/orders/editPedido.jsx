import React, { useEffect, useState } from "react";
import "./styles/editarpedido.css";

function EditarPedidoModal({ isOpen, onClose, mesa, onAdicionarItens }) {
  const [itens, setItens] = useState([]);
  const [pedidoAtual, setPedidoAtual] = useState(null); // objeto do pedido ativo

  useEffect(() => {
    if (!isOpen || !mesa) return;

    async function carregarPedidos() {
      try {
        const pedidosNaMesa = await window.api.pedido.listarPedidos(mesa.numero);
        if (pedidosNaMesa && pedidosNaMesa.length > 0) {
          const pedidoAtivo = Array.isArray(pedidosNaMesa)
            ? pedidosNaMesa[0]
            : pedidosNaMesa;
          setPedidoAtual(pedidoAtivo);

          const respostaItens = await window.api.pedido.listarItensPedido(pedidoAtivo.id);
          setItens(Array.isArray(respostaItens) ? respostaItens : []);
        } else {
          setPedidoAtual(null);
          setItens([]);
        }
      } catch (error) {
        console.error("Erro ao carregar pedido:", error);
        setPedidoAtual(null);
        setItens([]);
      }
    }

    carregarPedidos();
  }, [isOpen, mesa]);

  if (!isOpen || !mesa || !pedidoAtual) return null;

  const atualizarItem = async (index, novaQuantidade) => {
    try {
      const novosItens = [...itens];
      const item = novosItens[index];
      item.quantidade = novaQuantidade;

      if (novaQuantidade <= 0) {
        await window.api.pedido.removerItemPedido(pedidoAtual.id, item.id);
        novosItens.splice(index, 1);
      } else {
        await window.api.pedido.atualizarItemPedido(pedidoAtual.id, item.id, novaQuantidade);
      }

      setItens(novosItens);
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  const aumentarQuantidade = (index) => atualizarItem(index, itens[index].quantidade + 1);
  const diminuirQuantidade = (index) => atualizarItem(index, itens[index].quantidade - 1);
  const removerItem = (index) => atualizarItem(index, 0);

  const calcularTotal = () => itens.reduce((total, item) => total + item.preco * item.quantidade, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-editar">
        {/* Botão X no canto superior direito */}
        <button
          className="btn-fechar"
          onClick={onClose}
        >
          X
        </button>

        <h2>Mesa {mesa.numero}</h2>

        <div className="lista-itens">
          {itens.length === 0 && <p>Nenhum item no pedido.</p>}

          {itens.map((item, index) => (
            <div key={item.id} className="item">
              <div className="info">
                <span>{item.nome}</span>
                <span>R$ {item.preco.toFixed(2)}</span>
              </div>

              <div className="controles">
                <button onClick={() => diminuirQuantidade(index)}>-</button>
                <span>{item.quantidade}</span>
                <button onClick={() => aumentarQuantidade(index)}>+</button>
                <button className="remover" onClick={() => removerItem(index)}>
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="total">
          <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
        </div>

        <div className="acoes">
          <button onClick={() => onAdicionarItens(mesa)}>Adicionar Itens</button>
          <button onClick={() => alert("Fechar pedido (modal ainda não criado)")}>
            Fechar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarPedidoModal;