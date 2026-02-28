import { useState, useEffect } from "react";
import "./style/mesas.css";

import AddMesaModal from "../../components/modal/mesas/addmesa";
import RemoverMesaModal from "../../components/modal/mesas/removermesa";
import PedidoModal from "../../components/modal/orders/addPedido";
import EditarPedidoModal from "../../components/modal/orders/editPedido";

export default function Mesas() {
  const [mesas, setMesas] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalRemover, setOpenModalRemover] = useState(false);
const [openAdd, setOpenAdd] = useState(false);
const [openEdit, setOpenEdit] = useState(false);
const [mesaSelecionada, setMesaSelecionada] = useState(null);

  async function carregarMesas() {
    try {
      const data = await window.api.mesas.listarMesas();
      setMesas(data);
    } catch (error) {
      console.error("Erro ao carregar mesas:", error);
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

      <AddMesaModal
        isOpen={openModalAdd}
        onClose={() => setOpenModalAdd(false)}
        onMesaCriada={carregarMesas}
      />

      <RemoverMesaModal
        isOpen={openModalRemover}
        onClose={() => setOpenModalRemover(false)}
        onMesaRemovida={carregarMesas}
      />

      <PedidoModal
        isOpen={openAdd}
        onClose={() => setOpenAdd(false)}
        mesa={mesaSelecionada}
      />
      <EditarPedidoModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        mesa={mesaSelecionada}
        onAdicionarItens={() => {
          setOpenEdit(false);
          setOpenAdd(true);
        }}
      />
      
    
    </div>
  );
}
