import React, { useState } from "react";
import "../styles/categorias.css";

function ModalCadastroCategoria({ isOpen, onClose, onSave, disabled = false }) {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");

  if (!isOpen) return null;

  const salvar = (e) => {
    e.preventDefault();
    if (disabled) return;

    if (!nome.trim()) {
      alert("Informe o nome da categoria.");
      return;
    }

    const img =
      imagem.trim() ||
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=60";

    onSave({ nome: nome.trim(), imagem: img });
    setNome("");
    setImagem("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Cadastrar Categoria</h2>

        <form onSubmit={salvar} style={{ display: "grid", gap: 10 }}>
          <label>Nome</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Entradas"
            disabled={disabled}
          />

          <label>URL da imagem (opcional)</label>
          <input
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="https://..."
            disabled={disabled}
          />

          <div className="buttons-modal">
            <button type="button" className="bntPadrao" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="submit"
              className={`bntPadraoGreen ${disabled ? "disable" : ""}`}
              disabled={disabled}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCadastroCategoria;
