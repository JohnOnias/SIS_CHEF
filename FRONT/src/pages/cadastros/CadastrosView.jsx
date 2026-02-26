import React from "react";
import { useState, useEffect } from "react";
import "./style/cadastros.css";
import ProdutoModal from "../../components/modal/cadastros/cadastrarProduto";

// importar o useSatate
export default function CadastrosView() {
const [openProdutos, setOpenProdutos] = useState(false);
const [openCategorias, setOpenCategorias] = useState(false); 



 
  function cadastrarProduto() {
    setOpenProdutos(true);
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

      <ProdutoModal  
        isOpen={openProdutos}
        onClose={()=> setOpenProdutos(false)}
      
      />
      
    </>
  );
}
