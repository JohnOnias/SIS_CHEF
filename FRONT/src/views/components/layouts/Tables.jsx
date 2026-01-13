import React from 'react'
import { useState }  from 'react';
import AbrirPedidoModal from '../modal/openOrder';

function Table() {

const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="tela">
        <div id="topMesas">
          <div id="primeiro-item">
            <h1>Mesas</h1>
            <p className="subtitulo">
              Clique nas mesas para visualizar os pedidos
            </p>
          </div>
          <div id="segundo-item">
            <button
              className="bntPadraoGreen"
              onClick={() => setOpenModal(true)}
            >
              Abrir Pedido
            </button>
          </div>
          <br />
          <hr />
          <br />
        </div>
        <div className="mesas-container" id="mesas-container"></div>
      </div>
      <AbrirPedidoModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );

        }

        
export default Table;