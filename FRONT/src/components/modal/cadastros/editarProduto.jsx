import { useState, useEffect } from "react";
import "./styles/cadastroUsuario.css";
import CloseIcon from "../../../assets/modal/close.png";
import CustomModal from "../../../components/modal/error/customModal";

function EditProdutoModal({ isOpen, onClose }) {
  const [openFeedback, setOpenFeedback] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMsg, setTipoMsg] = useState("");
  const [titulo, setTitulo] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedProduto, setSelectedProduto] = useState("");

  const [formulario, setFormulario] = useState({
    nome: "",
    preco: "",
    descricao: "",
    categoria: "",
  });

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
    }
  }, [isOpen]);

  // atualiza lista de produtos quando muda a categoria
  useEffect(() => {
    if (selectedCategoria) {
      getProdutos(selectedCategoria);
      setSelectedProduto("");
      setFormulario({
        nome: "",
        preco: "",
        descricao: "",
        categoria: selectedCategoria,
      });
    } else {
      setProdutos([]);
    }
  }, [selectedCategoria]);

  // preenche formulário quando seleciona o produto
  useEffect(() => {
    if (selectedProduto) {
      const produto = produtos.find((p) => p.id === Number(selectedProduto));
      if (produto) {
        setFormulario({
          nome: produto.nome,
          preco: produto.preco,
          descricao: produto.descricao,
          categoria: produto.id_categoria,
        });
      }
    }
  }, [selectedProduto]);

  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const enviar = async (event) => {
    event.preventDefault();

    if (!formulario.preco || Number(formulario.preco) <= 0) {
      setTitulo("Erro");
      setMensagem("Preço inválido");
      setTipoMsg("error");
      setOpenFeedback(true);
      return;
    }

    if (!selectedProduto) {
      setTitulo("Erro");
      setMensagem("Selecione um produto para editar");
      setTipoMsg("error");
      setOpenFeedback(true);
      return;
    }

    try {
      const resposta = await window.api.produto.editarProduto(
        selectedProduto,
        formulario.nome,
        Number(formulario.preco),
        formulario.descricao,
      );

      if (!resposta?.success) {
        setTitulo("Erro");
        setMensagem(resposta?.error || "Erro ao editar produto");
        setTipoMsg("error");
        setOpenFeedback(true);
        return;
      }

      setTitulo("Sucesso");
      setMensagem("Produto atualizado com sucesso!");
      setTipoMsg("success");
      setOpenFeedback(true);

      // Recarrega a lista de produtos da categoria atual
      if (selectedCategoria) {
        await getProdutos(selectedCategoria);
      }

      // opcional: resetar seleção e formulário
      setSelectedProduto("");
      setFormulario({
        nome: "",
        preco: "",
        descricao: "",
        categoria: selectedCategoria,
      });
    } catch (e) {
      setTitulo("Erro");
      setMensagem("Erro inesperado ao editar produto");
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
              // resetar formulário e seleções
              setSelectedCategoria("");
              setSelectedProduto("");
              setFormulario({
                nome: "",
                preco: "",
                descricao: "",
                categoria: "",
              });
              onClose();
            }}
          />
          <h1 className="modal-title">Editar Produto</h1>

          <form className="modal-form" onSubmit={enviar}>
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

            <label className="modal-label" htmlFor="nome">
              Nome:
            </label>
            <input
              required
              className="modal-input"
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome do produto"
              value={formulario.nome}
              onChange={evento}
            />

            <label className="modal-label" htmlFor="preco">
              Preço:
            </label>
            <input
              required
              className="modal-input"
              type="number"
              name="preco"
              id="preco"
              placeholder="Preço"
              value={formulario.preco}
              onChange={evento}
            />

            <label className="modal-label" htmlFor="descricao">
              Descrição:
            </label>
            <input
              required
              className="modal-input"
              type="text"
              name="descricao"
              id="descricao"
              placeholder="Descrição"
              value={formulario.descricao}
              onChange={evento}
            />

            <button className="modal-button" type="submit">
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>

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

export default EditProdutoModal;
