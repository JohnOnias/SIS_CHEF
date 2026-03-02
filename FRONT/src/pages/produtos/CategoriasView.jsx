import { useState, useEffect } from "react";
import "./styles/categoriasView.css";
import { useNavigate } from "react-router-dom";
// categoria
import CategoriaModal from "../../components/modal/cadastros/cadastroCategoria";
// custom modal
import CustomModal from "../../components/modal/error/customModal";

// produto
import ProdutoModal from "../../components/modal/cadastros/cadastrarProduto";
import EditProdutoModal from "../../components/modal/cadastros/editarProduto";
import DeleteProdutoModal from "../../components/modal/cadastros/deleteProduto";
import EditCategoriaModal from "../../components/modal/cadastros/editarCategoria";

function CategoriasView() {
  const navigate = useNavigate();
  // categoria
  const [categorias, setCategorias] = useState([]);
  const [openAddCategoria, setOpenAddCategoria] = useState(false);
  const [openEditCategoria, setOpenEditCategoria] = useState(false);
  // custom modal
  const [openFeedback, setOpenFeedback] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState("");
  const [tipoFeedback, setTipoFeedback] = useState("success");

  //usuario logado
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  // produtos
  const [openProdutoAdd, setOpenProdutoAdd] = useState(false);
  const [openProdutoEdit, setOpenProdutoEdit] = useState(false);
  const [openProdutoDelete, setOpenProdutoDelete] = useState(false);

  async function carregarCategorias() {
    try {
      const response = await window.api.categoria.getCategorias();
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
    <>
      <div className="layout">
        <div className="content">
          <div className="header">
            <div>
                <h1>Categorias</h1>
                <br />
                <p>Clique para ver os produtos</p>

            </div>

         {usuario.tipo === "gerente" ? 
          <div className="buttons">
            <button
              className="remove"
              onClick={() => setOpenEditCategoria(true)}
            >
              Editar Categoria
            </button>

            <button className="add" onClick={() => setOpenAddCategoria(true)}>
              Adicionar Categoria
            </button>

            <button
              className="remove"
              onClick={() => setOpenProdutoDelete(true)}
            >
              Remover Produto
            </button>

            <button className="remove" onClick={() => setOpenProdutoEdit(true)}>
              Editar Produto
            </button>

            <button className="add" onClick={() => setOpenProdutoAdd(true)}>
              Adicionar Produto
            </button>
          </div> :
          ""}
          </div>
          
          <div className="catview-category-container">
            {categorias.length === 0 ? (
              <p>
                <strong>Nenhuma Categoria Cadastrada</strong>
              </p>
            ) : (
              categorias.map((cat, index) => (
                <div
                  key={cat.id || index}
                  className="catview-category-box"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/produtos/${cat.id}/${cat.nome}`)}
                >
                  <h3>{cat.nome}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <EditCategoriaModal
        isOpen={openEditCategoria}
        onClose={() => {
          setOpenEditCategoria(false);
          carregarCategorias();
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
    </>
  );
}

export default CategoriasView;
