import React from 'react';
import './styles/orders.css';


function OrderModal(isOpen, onClose) {

if(!isOpen) return null; 

  return (
    

    <modal>
            <div id="container">
                <div id="main-content">
                    {/*<!-- Seção de seleção de produtos -->*/}
                    <div id="produtos-section">
                    <h2>Selecione os Produtos</h2>
                    
                    {/* Filtro por categoria */}
                    <div id="categorias-container">
                        <label for="categoria-select">Categoria:</label>
                        <select id="categoria-select">
                        <option value="">Todas as categorias</option>
                        </select>
                    </div>

                    {/* Lista de produtos */}
                    <div id="produtos-lista"></div>
                    </div>

                    {/* Seção do carrinho/pedido */}
                    <div id="pedido-section">
                    <h2>Produtos no Pedido</h2>
                    <div id="carrinho-items"></div>
                    <div id="resumo-pedido">
                        <p><strong>Total:</strong> R$ <span id="total-preco">0.00</span></p>
                    </div>
                    </div>
                </div>

                {/*Botões de ação*/}
                <div id="buttons-container">
                    <button className="bntPadrao" id="voltar" onClick={onClose}>Voltar</button>
                    <button className="bntPadraoGreen" id="finalizar">Finalizar Pedido</button>
                </div>
            </div>

    </modal>
  )
}
export default OrderModal;