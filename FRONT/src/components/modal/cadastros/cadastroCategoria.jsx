import { useState, useEffect } from "react";
import "./styles/cadastroUsuario.css";
import CloseIcon from "../../../assets/modal/close.png";









function CategoriaModal({ isOpen, onClose }) {


  const [formulario, setFormulario] = useState({
    nome: "",
    status: "",
  });

    
  

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
      alert(`Erro ao cadastrar: ${resposta?.error || "Erro ao cadastrar"}`);
      return;
    }
    
    console.log("objeto retornado do cadastro", resposta);
    alert("Categoria cadastrada com sucesso!");

    setFormulario({
      nome: "",
      status: "",
    
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
    
            <button className="modal-button" type="submit" >
              Cadastrar
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}
export default CategoriaModal; 