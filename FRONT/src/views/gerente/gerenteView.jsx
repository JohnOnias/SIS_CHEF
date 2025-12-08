import React, { useState } from "react";
import './style.css'; 
import PedidoIcon from "../../assets/menu/pedidos.png";
import ProdutosIcon from "../../assets/menu/produtos.png";
import CadastroIcon from "../../assets/menu/cadastro.png";

function GerenteView() {
  document.getElementById("titulo").innerHTML = "Gerente!";
  const [tela, setTela] = useState('Mesas'); // controla a tela atual

  // funções que chamam a API (window.api)
  const abrirTelaPedido = async () => {
    try { await window.api.abrirTelaPedido(); } 
    catch(err) { console.error(err); }
  };
  const abrirCadastroCategoria = async () => {
    try { await window.api.abrirCadastroCategoria(); } 
    catch(err) { console.error(err); }
  };
  const abrirCadastroProduto = async () => {
    try { await window.api.abrirCadastroProduto(); } 
    catch(err) { console.error(err); }
  };
  const abrirCadastroMesa = async () => {
    console.log("entrei na abrirCadastroMesa!");
    try { await window.api.abrirCadastroMesa(); } 
    catch(err) { console.error(err); }
  };

  return (
    <div className="container">

      {/* Menu lateral */}
      <aside className="sidebar">
        <div className="perfil">
          <div className="icone"></div>
          <p>
            Gerente<br />
            <strong id="nomeFuncionario"></strong>
          </p>
        </div>
        <nav>
          <ul>
            <li className="menu">
              <img src={PedidoIcon} alt="icone pedidos" />
              <a onClick={() => setTela('Mesas')}>Mesas</a>
            </li>
            <li className="menu">
              <img src={ProdutosIcon} alt="icone produtos" />
              <a onClick={() => setTela('Categorias')}>Produtos e Categorias</a>
            </li>
            <li className="menu">
              <img src={CadastroIcon} alt="icone cadastros" />
              <a onClick={() => setTela('Cadastros')}>Cadastro</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="conteudo">

        {/* TELA MESAS */}
        {tela === 'Mesas' && (
          <div className="tela">
            <div id="topMesas">
              <div id="primeiro-item">
                <h1>Mesas</h1>
                <p className="subtitulo">Clique nas mesas para visualizar os pedidos</p>
              </div>
              <div id="segundo-item">
                <button className="bntPadraoGreen" onClick={abrirTelaPedido}>Abrir Pedido</button>
              </div>
              <br />
              <hr />
              <br />
            </div>
            <div className="mesas-container" id="mesas-container"></div>
          </div>
        )}

        {/* TELA CATEGORIAS */}
        {tela === 'Categorias' && (
          <div className="tela">
            <h1>Categorias</h1>
            <p className="subtitulo">Veja as categorias disponíveis para acessar produtos e Adicionar aos pedidos</p>
            <div className="produtos-container" id="categorias-container">

             
            </div>
          </div>
        )}

        {/* TELA CADASTROS */}
        {tela === 'Cadastros' && (
          <div className="tela">
            <h1>Cadastro</h1>
            <div className="containerConteudo">
              <p>Crie uma nova Categoria de Produtos</p>
              <div className="divbnt">
                <button className="bntPadrao" onClick={abrirCadastroCategoria}>Criar Nova Categoria</button>
                <a href="#">Editar Categorias</a>
              </div>
              <hr />
            </div>

            <div className="containerConteudo">
              <p>Crie um novo Produto</p>
              <div className="divbnt">
                <button className="bntPadrao" onClick={abrirCadastroProduto}>Criar Produtos</button>
                <a href="#">Editar Produtos</a>
              </div>
              <hr />
            </div>

            <div className="containerConteudo">
              <p>Adcione uma nova mesa para gerenciar pedidos</p>
              <div className="divbnt">
                <button className="bntPadrao" onClick={abrirCadastroMesa}>Adicionar Mesa</button>
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
