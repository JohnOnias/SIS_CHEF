import PedidoIcon from "../../assets/menu/pedidos.png";
import ProdutosIcon from "../../assets/menu/produtos.png";
import CadastroIcon from "../../assets/menu/cadastro.png";

import { Link, useNavigate } from "react-router-dom";
import "./styles/navbar.css";

const UserDetails = ({ usuario }) => {
   let nome = usuario?.nome || "";

   let resultado = nome.charAt(0).toUpperCase() + nome.slice(1);
  return (
    <div className="perfil">
      <div className="icone"></div>
      <p>Olá, {resultado}.</p>
      <p>
        <strong>{usuario?.tipo}</strong>
      </p>
    </div>
  );
};



function NavBar() {
  const navigate = useNavigate();

   const handleLogout = () => {
     localStorage.removeItem("usuario");
     navigate("/");
   };
  
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

      <button onClick={handleLogout} className="logoutbnt">Logout</button>
    </aside>
  );
}

export default NavBar;
