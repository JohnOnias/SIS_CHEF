import React from "react";
import CadastroIcon from "../../../assets/menu/cadastro.png";

function AdmSidebar({ setTela }) {
  return (
    <aside className="sidebar">
      <div className="perfil">
        <div className="icone"></div>

        <p style={{ fontSize: 18, marginTop: 6 }}>
          <strong>Administrador</strong>
          <br />
          Francisco
        </p>
      </div>

      <nav>
        <ul>
          <li className="menu">
            <img src={CadastroIcon} alt="icone cadastros" />
            <a onClick={() => setTela("Cadastros")}>Cadastros</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdmSidebar;
