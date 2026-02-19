import React, { useEffect, useState } from 'react';

export default function ProdutosView() {

  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);

  // pega categorias do banco
  async function getCategorias() {
    try {
      const dados = await window.api.categorias.getCategorias();
      console.log("Produtos pegou os dados", dados);
      setCategorias(dados);
    } catch (err) {
      console.error(err.message);
    }
  }

  // pega produtos pelo id da categoria
  async function listarProdutosPorCategoria(Idcategoria) {
    try {
      const dados = await window.api.produtos.getProdutosCategoria(Idcategoria);
      console.log("Função getProdutos pegou", dados);
      setProdutos(dados);
    } catch (err) {
      console.error(err.message);
    }
  }

  function onClickCategoria(Idcategoria) {
    listarProdutosPorCategoria(Idcategoria);
  }
  

  // carrega categorias quando a tela abrir
  useEffect(() => {
    getCategorias();
  }, []);


  return (
    <>
      <br />
      <h1>Produtos View</h1>

      <h2>Categorias</h2>
      {categorias.map((cat) => (
        <button 
          key={cat.id} 
          onClick={() => onClickCategoria(cat.id)}
        >
          {cat.nome}
        </button>
      ))}

      <h2>Produtos</h2>
      <ul>
        {produtos.map((prod) => (
          <li key={prod.id}>
            {prod.nome}
          </li>
        ))}
      </ul>
    </>
  );
}
