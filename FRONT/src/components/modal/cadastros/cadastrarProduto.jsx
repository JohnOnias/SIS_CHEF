import { useState, useEffect } from "react";
import "./styles/cadastroUsuario.css";
import CloseIcon from "../../../assets/modal/close.png";
import CustomModal from "../../../components/modal/error/customModal";

function ProdutoModal({ isOpen, onClose }) {
  const [openFeedback, setOpenFeedback] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMsg, setTipoMsg] = useState("");
  const [titulo, setTitulo] = useState("");

  const [categorias, setCategorias] = useState([]);

  const [formulario, setFormulario] = useState({
    nome: "",
    preco: "",
    descricao: "",
    categoria: "",
  });

  // função para limpar formulário
  const limparFormulario = () => {
    setFormulario({ nome: "", preco: "", descricao: "", categoria: "" });
  };

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

  useEffect(() => {
    if (isOpen) {
      getCategorias();
    }
  }, [isOpen]);

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

    try {
      const resposta = await window.api.produto.cadastrarProduto(
        formulario.nome,
        Number(formulario.preco),
        formulario.categoria,
        formulario.descricao,
      );

      if (!resposta?.success) {
        setTitulo("Erro");
        setMensagem(resposta?.error || "Erro ao cadastrar produto");
        setTipoMsg("error");
        setOpenFeedback(true);
        return;
      }

      setTitulo("Sucesso");
      setMensagem("Produto cadastrado com sucesso!");
      setTipoMsg("success");
      setOpenFeedback(true);

      // limpa formulário após sucesso
      limparFormulario();
    } catch (e) {
      setTitulo("Erro");
      setMensagem("Erro inesperado ao cadastrar produto");
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
              limparFormulario(); // limpa formulário ao fechar
              onClose();
            }}
          />

          <h1 className="modal-title">Cadastro Produto</h1>

          <form className="modal-form" onSubmit={enviar}>
            <label className="modal-label" htmlFor="nome">
              Nome:
            </label>
            <input
              required
              className="modal-input"
              type="text"
              name="nome"
              id="nome"
              placeholder="Digite o nome"
              value={formulario.nome}
              onChange={evento}
            />

            <label className="modal-label" htmlFor="preco">
              Preço:
            </label>
            <input
              required
              maxLength={11}
              className="modal-input"
              type="number"
              name="preco"
              id="preco"
              placeholder="Digite o preço do produto"
              value={formulario.preco}
              onChange={evento}
            />

            <label className="modal-label" htmlFor="categoria">
              Categoria:
            </label>

            <select
              required
              className="modal-input"
              name="categoria"
              id="categoria"
              value={formulario.categoria}
              onChange={evento}
            >
              <option value="">Selecione</option>
              {Array.isArray(categorias) &&
                categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
            </select>

            <label className="modal-label" htmlFor="descricao">
              Descrição:
            </label>
            <input
              required
              className="modal-input"
              type="text"
              name="descricao"
              id="descricao"
              placeholder="Digite uma descrição"
              value={formulario.descricao}
              onChange={evento}
            />

            <button className="modal-button" type="submit">
              Cadastrar
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

export default ProdutoModal;
