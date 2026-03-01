import React, { useEffect, useState } from "react";
import "./style/historico.css";

export default function HistoricoView() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function carregarPedidos() {
      const dados = await window.api.pedido.getListaPedidos();
      setPedidos(dados);
    }

    carregarPedidos();
  }, []);
pedidos.forEach((pedido) => {
  console.log(
    `Pedido ${pedido.id} - Tipo de pagamento: ${pedido.pagamento?.tipo_pagamento || "Sem pagamento"}`,
  );
});
  return (
    <div className="historico-view-container">
      <div className="historico-view-top">
        <h2>Histórico de Pedidos</h2>
      </div>

      <div className="historico-view-table-wrapper">
        <table className="historico-view-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Mesa</th>
              <th>Data</th>
              <th>Status</th>
              <th>Responsável</th>
              <th>Valor Total</th>
              <th>Metodo</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.length > 0 ? (
              pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.mesa_numero}</td>
                  <td>{new Date(pedido.data_criacao).toLocaleDateString()}</td>
                  <td>{pedido.status}</td>
                  <td>{pedido.Funcionario?.nome}</td>
                  <td>R$ {pedido.valor_total}</td>
                  <td>{pedido.pagamento?.tipo_pagamento || "Sem pagamento"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="historico-view-empty">
                  Lista de pedidos vazia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
