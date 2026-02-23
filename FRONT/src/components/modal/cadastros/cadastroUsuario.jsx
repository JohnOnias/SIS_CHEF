import { useState } from "react";
import CloseIcon from "../../../assets/modal/close.png";
import "./styles/cadastroUsuario.css";

function CadastroUsuarioModal({ isOpen, onClose }) {
  const [formulario, setFormulario] = useState({
    nome: "",
    cpf: "",
    email: "",
    tipo: "",
    senha: "",
  });

  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };
const enviar = async (event) => {
  event.preventDefault();

  try {
    const resposta = await window.api.funcionario.cadastrarFuncionario(
      formulario.nome,
      formulario.cpf,
      formulario.email,
      formulario.tipo,
      formulario.senha
    );

    if (!resposta?.success) {
      alert(`Erro ao cadastrar: ${resposta?.error || "Erro ao cadastrar"}`);
      return;
    }
    
    console.log("objeto retornado do cadastro", resposta);
    alert("Usuário cadastrado com sucesso!");

    setFormulario({
      nome: "",
      cpf: "",
      email: "",
      tipo: "",
      senha: ""
    });

    onClose();
  } catch (e) {
    console.error(e);
    alert(e?.message || "Erro ao cadastrar");
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

          <h1 className="modal-title">Cadastro de Usuário</h1>

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

            <label className="modal-label" htmlFor="cpf">
              CPF:
            </label>
            <input
              required
              maxLength={11}
              className="modal-input"
              type="text"
              name="cpf"
              id="cpf"
              placeholder="Digite o CPF"
              value={formulario.cpf}
              onChange={evento}
            />

            <label className="modal-label" htmlFor="email">
              Email:
            </label>
            <input
              required
              className="modal-input"
              type="email"
              name="email"
              id="email"
              placeholder="Digite o email"
              value={formulario.email}
              onChange={evento}
            />

            <label className="modal-label" htmlFor="tipo">
              Tipo:
            </label>
            <select
              required
              className="modal-input"
              name="tipo"
              id="tipo"
              value={formulario.tipo}
              onChange={evento}
            >
              <option value="">Selecione</option>
              <option value="garçom">Garçom</option>
              <option value="gerente">Gerente</option>
            </select>

            <label className="modal-label" htmlFor="senha">
              Senha:
            </label>
            <input
              required
              className="modal-input"
              type="password"
              name="senha"
              id="senha"
              placeholder="Digite a senha"
              value={formulario.senha}
              onChange={evento}
            />

            <button className="modal-button" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuarioModal;
