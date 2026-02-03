import React, { useState } from "react";
import CloseIcon from "../../../assets/close.png";
import "./style/resetSenha.css";

function ModalCadastroCategoria({ isOpen, onClose, adicionarCategoria }) {
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !status) return;

    adicionarCategoria({ nome, status });
    setNome("");
    setStatus("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          src={CloseIcon}
          alt="Fechar"
          className="close-icon"
          onClick={onClose}
        />

        <h2>Cadastrar Categoria</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nomeCategoria">Nome da Categoria</label>
          <input
            type="text"
            id="nomeCategoria"
            placeholder="Categoria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label htmlFor="statusCategoria">Status:</label>
          <select
            id="statusCategoria"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="Ativa">Ativa</option>
            <option value="Inativa">Inativa</option>
          </select>

          <div className="buttons-modal">
            <button type="submit" className="bntPadraoGreen">
              Cadastrar
            </button>
            <button type="button" className="bntPadrao" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCadastroCategoria;
