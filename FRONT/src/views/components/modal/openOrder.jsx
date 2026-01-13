import React from "react";
import './styles/orders.css'; 
import { useState } from "react";




function OpenOrderModal(isOpen, onClose, n_Mesa) {

  document.getElementById("titulo").innerHTML = "Abrir Pedido";

  // Estado do formulário
    const modelo = {
      mesa: "",
      garcom: "",
    };

  const [formulario, setFormulario] = useState(modelo);

  //evento do formulario
    const evento = (event) => {
      let name = event.target.name;
      let value = event.target.value;
      setFormulario({...formulario, [name]: value});
    }

    // lista de garçons
    const garcons = window.api.getGarcom(); 


if (!isOpen) return null;

if (n_Mesa){

  return (
  <div id="container">
      <div id="pedidoAberto">
        <form id="formID" onChange={evento}>
          <label htmlFor="mesa" id="labelMesa">
            Mesa {n_Mesa}
          </label>
          <br />

          <label htmlFor="garcom">Garçom:</label>
          <select
            name="garcom"
            id="ListaGarcom"
            required
            onChange={(e) => setFormulario({...formulario, garcom: e.target.value})}
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

        <button className="bntPadrao" onClick={onClose} id="cancelar">
          Cancelar
        </button>
      </div>
    </div>
  );

}
return (
  <div id="container">
    <div id="pedidoAberto">
      <form id="formID" onChange={evento}>
        <label htmlFor="mesa" id="labelMesa">
          Mesa:
        </label>

        <input
          type="number"
          name="mesa"
          id="mesa"
          required
          min="1"
          onChange={evento}
        />

        <label htmlFor="garcom">Garçom:</label>
        <select
          name="garcom"
          id="ListaGarcom"
          required
          onChange={(e) =>
            setFormulario({ ...formulario, garcom: e.target.value })
          }
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

      <button className="bntPadrao" onClick={onClose} id="cancelar">
        Cancelar
      </button>
    </div>
  </div>
);

    
}

export default OpenOrderModal;
