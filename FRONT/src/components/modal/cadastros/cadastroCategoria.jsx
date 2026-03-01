import { useState } from "react";
import "./styles/cadastroUsuario.css";
import CloseIcon from "../../../assets/modal/close.png";
import CustomModal from "../../../components/modal/error/customModal";

function CategoriaModal({ isOpen, onClose }) {
  const [formulario, setFormulario] = useState({
    nome: "",
    status: "",
  });

  const [openFeedback, setOpenFeedback] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState("");
  const [tipoFeedback, setTipoFeedback] = useState("success");

  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const enviar = async (event) => {
    event.preventDefault();

    try {
      const resposta = await window.api.categoria.cadastrarCategoria(
        formulario.nome,
        formulario.status,
      );

      if (!resposta?.success) {
        setMensagemFeedback(resposta?.error || "Erro ao cadastrar categoria");
        setTipoFeedback("error");
        setOpenFeedback(true);
        return;
      }

      setMensagemFeedback("Categoria cadastrada com sucesso!");
      setTipoFeedback("success");
      setOpenFeedback(true);

      setFormulario({
        nome: "",
        status: "",
      });

  
    } catch (e) {
      setMensagemFeedback(e?.message || "Erro inesperado ao cadastrar");
      setTipoFeedback("error");
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
            onClick={onClose}
          />

          <h1 className="modal-title">Cadastro Categoria</h1>

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

            <label className="modal-label" htmlFor="status">
              Status:
            </label>

            <select
              required
              className="modal-input"
              name="status"
              id="status"
              value={formulario.status}
              onChange={evento}
            >
              <option value="">Selecione</option>
              <option value="ativo">Ativa</option>
              <option value="desativa">Desativa</option>
            </select>

            <button className="modal-button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>

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

export default CategoriaModal;
