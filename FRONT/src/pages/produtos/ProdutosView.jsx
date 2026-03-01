import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function ProdutosView() {

  const { categoriaId } = useParams();
  const [produtos, setProdutos] = useState([]);
   const navigate = useNavigate();

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
    <div>
      <h2>Produtos da Categoria {categoriaId}</h2>
      <div className="header-buttons">
        <button
          className="btn-danger"
          onClick={() => navigate("/categorias")}
        >
          Voltar
        </button>
      </div>
      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado</p>
      ) : (
        produtos.map((p) => (
          <div key={p.id}>
            <h4>{p.nome}</h4>
            <p>Preço: {p.preco}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProdutosView;
