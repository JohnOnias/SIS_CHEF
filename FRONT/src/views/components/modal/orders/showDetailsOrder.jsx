import React from 'react'
import "./style/showDetailsOrder.css";


export default function showDetailsOrder() {
        
        const detalhesPedido = {
          id: 123,
          mesa: 5,
          status: "Aberto",
        }; 

  return (
        <>
            <div id="modalDetalhesPedido" className="modal" style="display:none;">
                <div class="modal-content">
                    <span class="close" onclick="fecharModal()">&times;</span>
                    <h2>Detalhes do Pedido #<span id="pedidoIdModal"> {detalhesPedido.id}</span></h2>
                    <p><strong>Mesa:</strong> <span id="mesaModal">{detalhesPedido.mesa}</span></p>
                    <p><strong>Status:</strong> <span id="statusModal">{detalhesPedido.status}</span></p>

                    <h3>Itens do Pedido:</h3>
                    <table class="tabela-itens">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Preço Unit.</th>
                                <th>Subtotal</th>
                                <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody id="listaItensPedido">
                        
                        </tbody>

                    </table>
                    
                    <div class="total-pedido">
                        <h3>Total: R$ <span id="totalPedidoModal">0.00</span></h3>
                    </div>

                    <div class="acoes-modal">
                        <button className="bntPadraoGreen" id="btnFecharPedidoModal">Fechar Pedido</button>
                        <button class="bntPadrao" onclick="fecharModal()">Cancelar</button>
                    </div>
                </div>
            </div>
        </>



  )
}
