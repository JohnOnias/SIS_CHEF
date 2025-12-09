import React, { useState } from "react";
import "./style.css";
import PedidoIcon from "../../assets/menu/pedidos.png";
import ProdutosIcon from "../../assets/menu/produtos.png";
import CadastroIcon from "../../assets/menu/cadastro.png";

function GerenteView() {
  document.getElementById("titulo").innerHTML = "Gerente!";
  const [tela, setTela] = useState("Mesas"); // controla a tela atual
  // Objeto com todas as telas disponíveis
  const telasAPI = {
    pedido: () => window.api.getMsg(),
    categoria: () => window.api.abrirCadastroCategoria(),
    produto: () => window.api.abrirCadastroProduto(),
    mesa: () => window.api.abrirCadastroMesa(),
  };

  // Função genérica para abrir telas via API Electron
  const abrirTelaAPI = async (tipo) => {
    //console.log(`Abrindo tela: ${tipo}`);
    try {
      if (telasAPI[tipo]) {
        await telasAPI[tipo]();
      }
    } catch (err) {
      console.error(`Erro ao abrir tela ${tipo}:`, err);
      console.log("Não foi possível abrir a tela desejada.");
      // Aqui você pode mostrar um toast/notificação de erro
    }
  };

  return (
    <div className="container">
      {/* Menu lateral */}
      <aside className="sidebar">
        <div className="perfil">
          <div className="icone"></div>
          <p>
            Gerente
            <br />
            <strong id="nomeFuncionario"></strong>
          </p>
        </div>
        <nav>
          <ul>
            <li className="menu">
              <img src={PedidoIcon} alt="icone pedidos" />
              <a onClick={() => setTela("Mesas")}>Mesas</a>
            </li>
            <li className="menu">
              <img src={ProdutosIcon} alt="icone produtos" />
              <a onClick={() => setTela("Categorias")}>Produtos e Categorias</a>
            </li>
            <li className="menu">
              <img src={CadastroIcon} alt="icone cadastros" />
              <a onClick={() => setTela("Cadastros")}>Cadastro</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="conteudo">
        {/* TELA MESAS */}
        {tela === "Mesas" && (
          <div className="tela">
            <div id="topMesas">
              <div id="primeiro-item">
                <h1>Mesas</h1>
                <p className="subtitulo">
                  Clique nas mesas para visualizar os pedidos
                </p>
              </div>
              <div id="segundo-item">
                <button
                  className="bntPadraoGreen"
                  onClick={() => abrirTelaAPI("pedido")}
                >
                  Abrir Pedido
                </button>
              </div>
              <br />
              <hr />
              <br />
            </div>
            <div className="mesas-container" id="mesas-container"></div>
          </div>
        )}

        {/* TELA CATEGORIAS */}
        {tela === "Categorias" && (
          <div className="tela">
            <h1>Categorias</h1>
            <p className="subtitulo">
              Veja as categorias disponíveis para acessar produtos e Adicionar
              aos pedidos
            </p>
            <div className="produtos-container" id="categorias-container"></div>
          </div>
        )}

        {/* TELA CADASTROS */}
        {tela === "Cadastros" && (
          <div className="tela">
            <h1>Cadastro</h1>
            <div className="containerConteudo">
              <p>Crie uma nova Categoria de Produtos</p>
              <div className="divbnt">
                <button
                  className="bntPadrao"
                  onClick={() => abrirTelaAPI("categoria")}
                >
                  Criar Nova Categoria
                </button>
                <a href="#">Editar Categorias</a>
              </div>
              <hr />
            </div>

            <div className="containerConteudo">
              <p>Crie um novo Produto</p>
              <div className="divbnt">
                <button
                  className="bntPadrao"
                  onClick={() => abrirTelaAPI("produto")}
                >
                  Criar Produtos
                </button>
                <a href="#">Editar Produtos</a>
              </div>
              <hr />
            </div>

            <div className="containerConteudo">
              <p>Adcione uma nova mesa para gerenciar pedidos</p>
              <div className="divbnt">
                <button
                  className="bntPadrao"
                  onClick={() => abrirTelaAPI("mesa")}
                >
                  Adicionar Mesa
                </button>
                <a href="#">Editar Mesas</a>
              </div>
              <hr />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default GerenteView;
