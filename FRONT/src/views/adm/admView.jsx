import React, { useState } from "react";
import "./style.css";
import CadastroIcon from "../../assets/menu/cadastro.png";
import HomeIcon from "../../assets/menu/HomeIcon.png";

function AdmView() {
  const [tela, setTela] = useState("Inicial");
 document.getElementById("titulo").innerHTML = "Administrador!"

  const showScreens = (screen) => {
    setTela(screen);
  };

  return (
    <div className="container">
      {/* Menu lateral */}
      <aside className="sidebar">
        <div className="perfil">
          <div className="icone"></div>
          <p>
            ADM
            <br />
            <strong id="nomeFuncionario"></strong>
          </p>
        </div>

        <nav>
          <ul>
            <li className="menu">
              <img src={HomeIcon} alt="icone home" />
              <a
                id="btnInicial"
                className="btnLink"
                onClick={() => showScreens("Inicial")}
              >
                Tela Inicial
              </a>
            </li>

            <li className="menu">
              <img src={CadastroIcon} alt="icone cadastro" />
              <a
                id="btnCadastros"
                className="btnLink"
                onClick={() => showScreens("Cadastros")}
              >
                Cadastro
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="conteudo">
        {/* ---------- TELA INICIAL ---------- */}
        {tela === "Inicial" && (
          <div className="tela">
            <h1>Tela Inicial</h1>
            <p>Conteúdo inicial vai aqui...</p>
          </div>
        )}

        {/* ---------- TELA DE CADASTROS ---------- */}
        {tela === "Cadastros" && (
          <div id="telaCadastros" className="tela">
            <div className="containerConteudo">
              <h1>Cadastro de Funcionário</h1>
              <p>Adicione novos funcionários</p>

              <div className="divbnt">
                <button id="btnCadastrar" className="bntPadrao">
                  Cadastrar
                </button>
                <a href="#">Editar Funcionarios</a>
              </div>

              <hr />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdmView; 