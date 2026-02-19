import React, { useEffect, useState } from "react";
import './style/historico.css'


export default function HistoricoView() {
    const [pedidos, setPedidos] = useState([]);
  
    useEffect(() => {
      async function carregarPedidos() {
        const dados = await window.api.pedido.getListaPedidos();
        setPedidos(dados);
      }
  
      carregarPedidos();
    }, []);
    console.log("o historico de pedidos pegou", pedidos); 
 

 return (
   <div className="container-cadastros">
     <div className="top">
       <h2>Historico de Pedidos</h2>
     </div>

     <table>
       <thead>
         <tr>
           <th>Id</th>
           <th>Mesa</th>
           <th>Data</th>
           <th>Status</th>
           <th>Responsavel</th>
           <th>Valor Total</th>
         </tr>
       </thead>

       <tbody>
         {pedidos.length > 0 ? (
           pedidos.map((pedido) => (
             <tr key={pedido.id}>
               <td>{pedido.id}</td>
               <td>{pedido.mesa_numero}</td>
               <td>{pedido.data_criacao.toLocaleDateString()}</td>
               <td>{pedido.status}</td>
               <td>{pedido.Funcionario?.nome}</td>
               <td>{pedido.valor_total}</td>
             </tr>
           ))
         ) : (
           <tr>
             <td colSpan="6" style={{ textAlign: "center" }}>
               Lista de pedidos vazia
             </td>
           </tr>
         )}
       </tbody>
     </table>
   </div>
 );
}
