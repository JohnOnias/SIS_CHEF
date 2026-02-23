import React, { useState, useEffect } from "react";
import "./style/mesas.css";

export default function MesasView() {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    async function carregarMesas() {
      const dados = await window.api.mesas.listarMesas();
      setMesas(dados || []);
    }

    carregarMesas();
  }, []);

  return (
    <>
    <div className="containerMesas">
      {mesas.length > 0 ? (
        mesas.map((mesa) => (
          <div className="mesas" key={mesa.id}>
            <p className="numero-mesas">
              <strong>{mesa.numero}</strong>
            </p>

            <p
              className="mesas-status"
              style={{
                backgroundColor:
                  mesa.status === "disponivel"
                    ? "green"
                    : mesa.status === "ocupada"
                    ? "red"
                    : "gray",
                color: "white", // para o texto ficar visível
                padding: "5px 10px",
                borderRadius: "5px"
              }}
            >
              {mesa.status}
            </p>
          </div>
        ))
      ) : (
        <div>
          <h1>Nem Uma Mesa cadastrada!</h1>
        </div>
      )}
      </div>
    </>
  );
}