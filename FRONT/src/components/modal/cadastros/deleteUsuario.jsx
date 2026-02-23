import CloseIcon from "../../../assets/modal/close.png";
import "./styles/deleteUsuario.css";

function DeleteUsuarioModal({ isOpen, onClose, funcionario }) {


  async function enviar(id) {
    
    const ok = await window.api.funcionario.deletarFuncionario(id);
    if (ok.success) {
      alert("Usuario deletado com sucesso!");
      onClose();
    } else {
      alert("Erro ao deletar Funcionario!");
    }
  }

  if (!isOpen || !funcionario) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Confirmar Exclusão</h2>
          <img
            src={CloseIcon}
            alt="Fechar"
            className="modal-close"
            onClick={onClose}
          />
        </div>

        <div className="modal-content">
          <p>
            Tem certeza que quer <strong>DELETAR</strong> o funcionário?
          </p>

          <table className="modal-table">
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

        <div className="modal-actions">
          <button
            className="btn-confirm"
            onClick={() => enviar(funcionario.id)}
          >
            Confirmar
          </button>

          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUsuarioModal;
