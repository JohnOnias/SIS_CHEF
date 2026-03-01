import { useState, useEffect } from "react";
import "./styles/categoriasView.css";
import { useNavigate } from "react-router-dom";
//categoria
import CategoriaModal from "../../components/modal/cadastros/cadastroCategoria";
//custom modal
import CustomModal from "../../components/modal/error/customModal";

//produto
import ProdutoModal from "../../components/modal/cadastros/cadastrarProduto";
import EditProdutoModal from "../../components/modal/cadastros/editarProduto";
import DeleteProdutoModal from "../../components/modal/cadastros/deleteProduto";
import EditCategoriaModal from "../../components/modal/cadastros/editarCategoria";

function CategoriasView() {
  const navigate = useNavigate();
  //categoria
  const [categorias, setCategorias] = useState([]);
  const [openAddCategoria, setOpenAddCategoria] = useState(false);
  const [openEditCategoria, setOpenEditCategoria] = useState(false);
  // custom modal
  const [openFeedback, setOpenFeedback] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState("");
  const [tipoFeedback, setTipoFeedback] = useState("success");


  // produtos
  const [openProdutoAdd, setOpenProdutoAdd] = useState(false);
  const [openProdutoEdit, setOpenProdutoEdit] = useState(false);
  const [openProdutoDelete, setOpenProdutoDelete] = useState(false);


  async function carregarCategorias() {
    try {
      const response = await window.api.categoria.getCategorias();
      // agora acessa o array dentro de response.data
      if (response && Array.isArray(response.data)) {
        setCategorias(response.data);
      } else {
        setCategorias([]);
        console.warn("Categorias recebidas não são um array:", response);
      }
    } catch (error) {
      setMensagemFeedback("Erro ao carregar Categorias");
      setTipoFeedback("error");
      setOpenFeedback(true);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div className="content-">
      <div className="content-header">
        <div>
          <h2>Categorias</h2>
          <span className="subtitle">Clique para ver os produtos</span>
        </div>

        <div className="header-buttons">
          <button
            className="btn-danger"
            onClick={() => setOpenEditCategoria(true)}
          >
            Editar Categoria
          </button>

          <button
            className="btn-success"
            onClick={() => setOpenAddCategoria(true)}
          >
            Adicionar Categoria
          </button>
          <button
            className="btn-danger"
            onClick={() => setOpenProdutoDelete(true)}
          >
            Remover Produto
          </button>
          <button
            className="btn-danger"
            onClick={() => setOpenProdutoEdit(true)}
          >
            Editar Produto
          </button>
          <button
            className="btn-success"
            onClick={() => setOpenProdutoAdd(true)}
          >
            Adicionar Produto
          </button>
        </div>

        <div className="category-container">
          {categorias.length === 0 ? (
            <p>
              <strong>Nenhuma Categoria Cadastrada</strong>
            </p>
          ) : (
            categorias.map((cat, index) => (
              <div
                key={cat.id || index}
                className="category-box"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/produtos/${cat.id}`)}
              >
                <h3>{cat.nome}</h3>
              </div>
            ))
          )}
        </div>
      </div>

      <EditCategoriaModal
        isOpen={openEditCategoria}
        onClose={() => {
          setOpenEditCategoria(false); // fecha o modal
          carregarCategorias(); // recarrega a lista
        }}
        onCategoria={carregarCategorias}
      />

      <CategoriaModal
        isOpen={openAddCategoria}
        onClose={() => {
          setOpenAddCategoria(false); 
          carregarCategorias(); 
        }}
        onCategoria={carregarCategorias}
      />

      <ProdutoModal
        isOpen={openProdutoAdd}
        onClose={() => setOpenProdutoAdd(false)}
      />
      <EditProdutoModal
        isOpen={openProdutoEdit}
        onClose={() => setOpenProdutoEdit(false)}
      />
      <DeleteProdutoModal
        isOpen={openProdutoDelete}
        onClose={() => setOpenProdutoDelete(false)}
      />

      <CustomModal
        isOpen={openFeedback}
        title={tipoFeedback === "success" ? "Sucesso" : "Erro"}
        message={mensagemFeedback}
        onClose={() => setOpenFeedback(false)}
        duration={3000}
        type={tipoFeedback}
        cancelText="Fechar"
      />
    </div>
  );
}

export default CategoriasView;
