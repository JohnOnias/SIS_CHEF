import { useState } from "react";
import CloseIcon from "../../../assets/modal/close.png";
import "./styles/deleteUsuario.css";
import CustomModal from "../../../components/modal/error/customModal";

function DeleteUsuarioModal({ isOpen, onClose, funcionario }) {
  const [openFeedback, setOpenFeedback] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState("");
  const [tipoFeedback, setTipoFeedback] = useState("success");

  async function enviar(id) {
    try {
      const resposta = await window.api.funcionario.deletarFuncionario(id);

      if (!resposta?.success) {
        setMensagemFeedback(resposta?.error || "Erro ao deletar funcionário");
        setTipoFeedback("error");
        setOpenFeedback(true);
        return;
      }

      setMensagemFeedback("Usuário deletado com sucesso!");
      setTipoFeedback("success");
      setOpenFeedback(true);

      setTimeout(() => {
        setOpenFeedback(false);
        onClose();
      }, 2000);
    } catch (error) {
      setMensagemFeedback("Erro inesperado ao deletar funcionário");
      setTipoFeedback("error");
      setOpenFeedback(true);
    }
  }

  if (!isOpen || !funcionario) {
    return null;
  }

  return (
    <>
      <div className="delete-usuario-overlay">
        <div className="delete-usuario-container">
          <div className="delete-usuario-header">
            <h2>Confirmar Exclusão</h2>
            <img
              src={CloseIcon}
              alt="Fechar"
              className="delete-usuario-close"
              onClick={onClose}
            />
          </div>

          <div className="delete-usuario-content">
            <p>
              Tem certeza que quer <strong>DELETAR</strong> o funcionário?
            </p>

            <table className="delete-usuario-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Cargo</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{funcionario.id}</td>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.tipo}</td>
                  <td>{funcionario.email}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="delete-usuario-actions">
            <button
              className="delete-usuario-btn-confirm"
              onClick={() => enviar(funcionario.id)}
            >
              Confirmar
            </button>

            <button className="delete-usuario-btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
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
    </>
  );
}

export default DeleteUsuarioModal;
