import React, { useState, useEffect } from "react";
import "./styles/manager.css";
import Menu from "../components/layouts/Menu";  

// importando componentes de telas específicas
import Registration from "../components/layouts/Registrations";
import Table from "../components/layouts/Tables";



function ManagerView() {
  const [tela, setTela] = useState("Mesas");

  // Define o título apenas quando o componente monta
  useEffect(() => {
    const titulo = document.getElementById("titulo");
    if (titulo) {
      titulo.innerHTML = "Gerente!";
    }
  }, []);
 const getFuncionario = {
    nome: "João",
    tipo: "Gerente"
 };

  return (
    <>
      <Menu
        nomeFuncionario={getFuncionario.nome}
        tipoFuncionario={getFuncionario.tipo}
        setTela={setTela}
      />

      <div className="container">
        <main className="conteudo">
          {/* TELA CATEGORIAS */}
          {tela === "Categorias" && (
            <div className="tela">
              <h1>Categorias</h1>
              <div
                className="produtos-container"
                id="categorias-container"
              ></div>
            </div>
          )}
          {tela === "Mesas" && (
            <div className="tela">
              <Table />
            </div>
          )}

          {tela === "Cadastros" && (
            <div className="tela">
              <Registration />
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default ManagerView;
