import PedidoIcon from "../../assets/menu/pedidos.png";
import ProdutosIcon from "../../assets/menu/produtos.png";
import CadastroIcon from "../../assets/menu/cadastro.png";

import { Link } from "react-router-dom";
import "./styles/navbar.css";

const UserDetails = ({ usuario }) => {
  return (
    <div className="perfil">
      <div className="icone"></div>
      <p>Olá, {usuario?.nome}.</p>
      <p>
        <strong>{usuario?.tipo}</strong>
      </p>
    </div>
  );
};

function NavBar() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) return null;

  return (
    <aside className="sidebar">
      <UserDetails usuario={usuario} />

      <nav>
        <ul>
          {usuario.tipo === "administrador" && (
            <>
              <li className="menu">
                <img src={CadastroIcon} alt="icone cadastro" />
                <Link to="/cadastro-usuarios">Cadastro Usuarios</Link>
              </li>

              <li className="menu">
                <img src={ProdutosIcon} alt="icone historico" />
                <Link to="/historico">Histórico</Link>
              </li>
            </>
          )}

          {usuario.tipo !== "administrador" && (
            <>
              <li className="menu">
                <img src={PedidoIcon} alt="icone pedidos" />
                <Link to="/mesas">Mesas e Pedidos</Link>
              </li>

              <li className="menu">
                <img src={ProdutosIcon} alt="icone produtos" />
                <Link to="/produtos">Produtos</Link>
              </li>

              {usuario.tipo === "gerente" && (
                <li className="menu">
                  <img src={CadastroIcon} alt="icone cadastros" />
                  <Link to="/cadastros">Cadastros</Link>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default NavBar;
