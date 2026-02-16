
import PedidoIcon from "../../../assets/menu/pedidos.png";
import ProdutosIcon from "../../../assets/menu/produtos.png";
import CadastroIcon from "../../../assets/menu/cadastro.png";

import { useNavigate } from "react-router-dom";
import "./styles/menu.css";



 const UserDetails = ({ usuario }) => {
   return (
     <div className="perfil">
       <div className="icone"></div>
       <p>Olá, {usuario.nome}.</p>
       <p>
         <strong>{usuario.tipo}</strong>
       </p>
     </div>
   );
 };



function Menu({ usuario}){
  const navigate = useNavigate();



 // retorna null se o usuario não for setado, talvez seria bom retorna algum erro ou algo do tipo  
  if(!usuario){
    return null; 
  }

const userType = usuario.tipo?.toLowerCase(); 
// se for adm retorna o menu tipo adm
  if(userType === "administrador"){

    return (
      <>
        <aside className="sidebar">
          <UserDetails usuario ={usuario}/>

          <nav>
            <ul>
              <li className="menu">
                <img src={CadastroIcon} alt="icone cadastro" />
                <a onClick={() => navigate("/cadastrousuario")}>
                  Cadastro Usuarios
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </>
    );

  }  

// se NÃO for adm retorna o restante
if (userType !== "administrador"){


  return (
    <>
      <aside className="sidebar">
        <UserDetails usuario={usuario} />

        <nav>
          <ul>
            <li className="menu">
              <img src={PedidoIcon} alt="icone pedidos" />
              <a onClick={() => navigate("/mesas")}>Mesas e Pedidos</a>
            </li>

            <li className="menu">
              <img src={ProdutosIcon} alt="icone produtos" />
              <a onClick={() => navigate("/produtos")}>Produtos</a>
            </li>

            {userType === "gerente" ? (
              <li className="menu">
                <img src={CadastroIcon} alt="icone cadastros" />
                <a onClick={() => navigate("/cadastros")}>Cadastros</a>
              </li>
            ) : null}

            <li className="menu">
              <img src={ProdutosIcon} alt="icone produtos" />
              <a onClick={() => navigate("/historico")}>Historico</a>
            </li>
          </ul>
        </nav>
      </aside>

    </>
  );
    }

}



export default Menu;
