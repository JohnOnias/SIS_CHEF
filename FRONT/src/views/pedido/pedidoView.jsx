import React, { useState } from "react";
import './stylePedido.css'; 

function PedidoView() {
    document.getElementById("titulo").innerHTML = "Abrir Pedido";
  const [mesa, setMesa] = useState("");
  const [garcom, setGarcom] = useState("");

  // Exemplo de lista de garçons
  const garcons = window.api.getGarcom(); 

  const handleConfirmar = (e) => {
    e.preventDefault(); // evita o reload da página
    console.log("Mesa:", mesa, "Garçom:", garcom);
    // Aqui você pode enviar os dados para o backend ou mudar a tela
  };

  const handleCancelar = () => {
    setMesa("");
    setGarcom("");
  };

  return (
    <div id="container">
      <div id="pedidoAberto">
        <form id="formID" onSubmit={handleConfirmar}>
          <label htmlFor="mesa" id="labelMesa">
            Mesa:
          </label>
          <input
            type="number"
            name="mesa"
            id="mesa"
            required
            min="1"
            value={mesa}
            onChange={(e) => setMesa(e.target.value)}
          />

          <label htmlFor="garcom">Garçom:</label>
          <select
            name="garcom"
            id="ListaGarcom"
            value={garcom}
            onChange={(e) => setGarcom(e.target.value)}
          >
            <option value="">Selecione</option>
            {garcons.map((g, i) => (
              <option key={i} value={g}>
                {g}
              </option>
            ))}
          </select>

          <br />
          <br />
          <button className="bntPadraoGreen" type="submit" id="confirmar">
            Confirmar
          </button>
        </form>

        <button className="bntPadrao" onClick={handleCancelar} id="cancelar">
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default PedidoView;
