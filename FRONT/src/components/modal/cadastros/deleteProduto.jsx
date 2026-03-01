import { useState, useEffect } from "react";
import "./styles/cadastroUsuario.css";
import CloseIcon from "../../../assets/modal/close.png";
import CustomModal from "../../../components/modal/error/customModal";

function DeleteProdutoModal({ isOpen, onClose }) {
  const [openFeedback, setOpenFeedback] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMsg, setTipoMsg] = useState("");
  const [titulo, setTitulo] = useState("");

  const [openAviso, setOpenAviso] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedProduto, setSelectedProduto] = useState("");

  // limpa seleções do modal
  const limparFormulario = () => {
    setSelectedCategoria("");
    setSelectedProduto("");
    setProdutos([]);
  };

  // busca todas as categorias
  async function getCategorias() {
    try {
      const resposta = await window.api.categoria.getCategorias();
      if (resposta?.success) {
        setCategorias(resposta.data);
      } else {
        setTitulo("Erro");
        setMensagem("Erro ao buscar categorias");
        setTipoMsg("error");
        setOpenFeedback(true);
      }
    } catch (error) {
      setTitulo("Erro");
      setMensagem("Erro ao carregar categorias");
      setTipoMsg("error");
      setOpenFeedback(true);
    }
  }

  // busca produtos de uma categoria específica
  async function getProdutos(categoriaId) {
    try {
      const resposta =
        await window.api.produto.getProdutosPorCategoria(categoriaId);
      setProdutos(Array.isArray(resposta) ? resposta : resposta?.data || []);
    } catch (error) {
      setProdutos([]);
      console.warn("Erro ao buscar produtos da categoria", error);
    }
  }

  // carrega categorias ao abrir modal
  useEffect(() => {
    if (isOpen) {
      getCategorias();
    } else {
      limparFormulario();
    }
  }, [isOpen]);

  // atualiza lista de produtos quando muda a categoria
  useEffect(() => {
    if (selectedCategoria) {
      getProdutos(selectedCategoria);
      setSelectedProduto("");
    } else {
      setProdutos([]);
    }
  }, [selectedCategoria]);

  // mostra aviso ao selecionar um produto
  useEffect(() => {
    if (selectedProduto) {
      setOpenAviso(true);
    }
  }, [selectedProduto]);

  const deletarProduto = async () => {
    if (!selectedProduto) {
      setTitulo("Erro");
      setMensagem("Selecione um produto para excluir");
      setTipoMsg("error");
      setOpenFeedback(true);
      return;
    }

    try {
      const resposta = await window.api.produto.deletarProduto(selectedProduto);

      if (!resposta?.success) {
        setTitulo("Erro");
        setMensagem(resposta?.error || "Erro ao excluir produto");
        setTipoMsg("error");
        setOpenFeedback(true);
        return;
      }

      setTitulo("Sucesso");
      setMensagem("Produto excluído com sucesso!");
      setTipoMsg("success");
      setOpenFeedback(true);

      // Recarrega produtos da categoria após exclusão
      if (selectedCategoria) {
        await getProdutos(selectedCategoria);
      }

      // limpa seleção após exclusão
      setSelectedProduto("");
    } catch (error) {
      setTitulo("Erro");
      setMensagem("Erro inesperado ao excluir produto");
      setTipoMsg("error");
      setOpenFeedback(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <img
            src={CloseIcon}
            className="modal-close"
            alt="Fechar"
            onClick={() => {
              limparFormulario();
              onClose();
            }}
          />
          <h1 className="modal-title">Excluir Produto</h1>

          <div className="modal-form">
            <label className="modal-label" htmlFor="categoriaSelect">
              Categoria:
            </label>
            <select
              required
              className="modal-input"
              id="categoriaSelect"
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
            >
              <option value="">Selecione</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>

            <label className="modal-label" htmlFor="produtoSelect">
              Produto:
            </label>
            <select
              required
              className="modal-input"
              id="produtoSelect"
              value={selectedProduto}
              onChange={(e) => setSelectedProduto(e.target.value)}
            >
              <option value="">Selecione</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>

            <button
              className="modal-button btn-danger"
              type="button"
              onClick={deletarProduto}
            >
              Excluir Produto
            </button>
          </div>
        </div>
      </div>

      {/* Aviso de exclusão permanente */}
      <CustomModal
        isOpen={openAviso}
        title="Atenção!"
        message="Ao apagar este produto, ele será permanentemente removido."
        type="warning"
        onClose={() => setOpenAviso(false)}
        duration={7000}
        cancelText="Fechar"
      />

      {/* Feedback */}
      <CustomModal
        isOpen={openFeedback}
        title={titulo}
        message={mensagem}
        onClose={() => setOpenFeedback(false)}
        duration={5000}
        type={tipoMsg}
        cancelText="Fechar"
      />
    </div>
  );
}

export default DeleteProdutoModal;
