
import CadastroIcon from "../../../assets/menu/cadastro.png";

function AdmSidebar({ setTela, User }) {
  const tipo = User?.tipo ? User.tipo : "Tipo não informado";
  const nome = User?.nome ? User.nome : "Nome não informado";

  return (
    <aside className="sidebar">
      <div className="perfil">
        <div className="icone"></div>

        <p style={{ fontSize: 18, marginTop: 6 }}>
          <strong>{tipo}</strong>
          <br />
          {nome}
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
