import { useState, useEffect } from "react";
import CloseIcon from "../../../assets/modal/close.png";
import "./styles/editarUsuario.css";

function EditarUsuarioModal({ isOpen, onClose, funcionario }) {

  console.log("objeto recebido da listar anterior", funcionario);

  const [formulario, setFormulario] = useState({
    id: "",
    nome: "",
    cpf: "",
    email: "",
    tipo: "",
    senha: "",
  });


  useEffect(() => {

    if (funcionario && isOpen) {

      setFormulario({
        id: funcionario.id || "",
        nome: funcionario.nome || "",
        cpf: funcionario.cpf || "",
        email: funcionario.email || "",
        tipo: funcionario.tipo || "",
        senha: ""
      });
    }
  }, [funcionario, isOpen]);



  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };


  const enviar = async (event) => {
    event.preventDefault();

    try {
      const resposta = await window.api.funcionario.editarFuncionario(
        formulario.id,
        formulario.nome,
        formulario.cpf,
        formulario.email,
        formulario.tipo,
        formulario.senha,
      );

      if (!resposta?.success) {
        alert(`Erro ao editar: ${resposta?.error || "Erro ao editar"}`);
        return;
      }

      alert("Usuário atualizado com sucesso!");

      onClose();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao editar");
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

          <h1 className="modal-title">Editar Usuário</h1>

          <form className="modal-form" onSubmit={enviar}>
            <label className="modal-label">Nome:</label>
            <input
              required
              className="modal-input"
              type="text"
              name="nome"
              value={formulario.nome}
              onChange={evento}
            />

            <label className="modal-label">CPF:</label>
            <input
              required
              maxLength={11}
              className="modal-input"
              type="text"
              name="cpf"
              value={formulario.cpf}
              onChange={evento}
            />

            <label className="modal-label">Email:</label>
            <input
              required
              className="modal-input"
              type="email"
              name="email"
              value={formulario.email}
              onChange={evento}
            />

            <label className="modal-label">Tipo:</label>
            <select
              required
              className="modal-input"
              name="tipo"
              value={formulario.tipo}
              onChange={evento}
            >
              <option value="">Selecione</option>
              <option value="garçom">Garçom</option>
              <option value="gerente">Gerente</option>
            </select>

            <label className="modal-label">Nova Senha:</label>
            <input
              className="modal-input"
              type="password"
              name="senha"
              value={formulario.senha}
              onChange={evento}
            />

            <button className="modal-button" type="submit">
              Atualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarUsuarioModal;
