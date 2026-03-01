import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/categoriasView.css";


function ProdutosView() {

  const { categoriaId, categoria } = useParams();
  const [produtos, setProdutos] = useState([]);
   const navigate = useNavigate();
   function navegar(){
    navigate("/categorias")
   }

  useEffect(() => {
  
    async function carregarProdutos() {
      // Pega os produtos da categoria usando a API
      const data = await window.api.produto.getProdutosPorCategoria(categoriaId);

      console.log("categoria pega:", categoriaId, "produtos pegos:", data);

      setProdutos(Array.isArray(data) ? data : data?.data || []);

    }

    carregarProdutos();
  }, [categoriaId]);

  return (
    <div className="layout">
      <div className="content">
        <div className="header">
          <h2>Produtos da Categoria: {categoria}</h2>

          <div className="header-buttons">



            <button className="bnt-voltar"
              onClick={() => navegar()}>
              Voltar
            </button>



          </div>
        </div>
        <br />
        {produtos.length === 0 ? (
          <p>Nenhum produto encontrado</p>
        ) : (
          produtos.map((p) => (
            <div key={p.id} className="catview-category-box">
              <h4>{p.nome}</h4>
              <p>Preço: R$ {p.preco}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );

}

export default ProdutosView;
