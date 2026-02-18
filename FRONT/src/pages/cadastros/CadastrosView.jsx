import React from "react";
import "./style/cadastros.css";

// importar o useSatate
export default function CadastrosView() {

  function cadastrarMesa() {
    //settar o open modal aqui

    alert("abriu o cadastro de mesa!");
  }
  function cadastrarProduto() {
    //settar o open modal aqui
    alert("abriu o cadastro de produtos!");
  }
  function cadastrarCategoria() {
    //settar o open modal aqui
    alert("abriu o cadastro de categorias!");
  }

  return (
    <>
      <div className="container-cadastros">
        <div className="top">
          <h2>Cadastros</h2>
        </div>

        <div className="divbnt">
          <label htmlFor="">Crie uma nova Categoria de Produtos</label>
          <button onClick={() => cadastrarCategoria()}>Nova Categotoria</button>
          <button className="linkbnt">Editar Categoria</button>
        </div>

        <hr />

        <div className="divbnt">
          <label htmlFor="">Crie um novo Produto</label>
          <button onClick={() => cadastrarProduto()}>Novo Produto</button>
          <button className="linkbnt">Editar Produto</button>
        </div>

        <hr />

        <div className="divbnt">
          <label htmlFor="">Adcione uma nova mesa para gerenciar Pedidos</label>
          <button onClick={() => cadastrarMesa()}>Nova Mesa</button>
          <button className="linkbnt">Editar Mesas</button>
        </div>

        <hr />
      </div>
    </>
  );
}
