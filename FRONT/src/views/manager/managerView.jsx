import React, { useState, useEffect } from "react";
import "./styles/manager.css";
import Menu from "../components/layouts/Menu";
import Registration from "../components/layouts/Registrations";
import Table from "../components/layouts/Tables";

function ManagerView() {
  const [tela, setTela] = useState("Mesas");

  useEffect(() => {
    const titulo = document.getElementById("titulo");
    if (titulo) titulo.innerHTML = "Gerente!";
  }, []);



  // pega o usuario atual 
  const currentUser = window.api.user.getCurrentUser();


  return (
    <div className="container">
      <Menu
        nomeFuncionario={currentUser.nome}
        TipoFuncionario={currentUser.tipo}
        setTela={setTela}
      />

      <main className="conteudo">
        {tela === "Categorias" && (
          <div className="tela">
            <h1>Categorias</h1>
            <div className="produtos-container"></div>
          </div>
        )}

        {tela === "Mesas" && <Table />}

        {tela === "Cadastros" && (
          <div className="tela">
            <Registration />
          </div>
        )}

        {tela === "Categorias" && <Categorias />}

      </main>
    </div>
  );
}

export default ManagerView;
