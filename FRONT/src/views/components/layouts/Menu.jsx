import React from "react";
import PedidoIcon from "../../../assets/menu/pedidos.png";
import ProdutosIcon from "../../../assets/menu/produtos.png";
import CadastroIcon from "../../../assets/menu/cadastro.png";
import "./styles/menu.css";

function Menu({ nomeFuncionario, TipoFuncionario, setTela }) {


  if (!nomeFuncionario || !TipoFuncionario) {
    
    return (
      <p> erro ao renderizar </p>
      );
    } 

  if(TipoFuncionario === "gerente"){
        return (
          <aside className="sidebar">
            <div className="perfil">
              <div className="icone"></div>

              <p>Olá, {nomeFuncionario}.</p>
              <p>
                <strong>{TipoFuncionario}.</strong>
              </p>
            </div>

            <nav>
              <ul>
                <li className="menu">
                  <img src={PedidoIcon} alt="icone pedidos" />
                  <a onClick={() => setTela("Mesas")}>Mesas e Pedidos</a>
                </li>

                <li className="menu">
                  <img src={ProdutosIcon} alt="icone produtos" />
                  <a onClick={() => setTela("Categorias")}>Produtos</a>
                </li>

                <li className="menu">
                  <img src={CadastroIcon} alt="icone cadastros" />
                  <a onClick={() => setTela("Cadastros")}>Cadastro</a>
                </li>
              </ul>
            </nav>
          </aside>
        );
    }


            else if(TipoFuncionario === "garcom"){
              return (
                <>
                <aside className="sidebar">
                  <div className="perfil">
                    <div className="icone"></div> 

                    <p>Olá, {nomeFuncionario}.</p>
                    <p>
                      <strong>{TipoFuncionario}.</strong>
                    </p>
                  </div>
                  
                        <nav>
                          <ul>
                            <li className="menu">
                              <img src={PedidoIcon} alt="icone pedidos" />
                              <a onClick={() => setTela("Mesas")}>Mesas e Pedidos</a>
                            </li>

                            <li className="menu">
                              <img src={ProdutosIcon} alt="icone produtos" />
                              <a onClick={() => setTela("Categorias")}>Produtos</a>
                            </li>
                          </ul>
                        </nav>
                </aside>
                </>
                  );
              }


}

export default Menu;
