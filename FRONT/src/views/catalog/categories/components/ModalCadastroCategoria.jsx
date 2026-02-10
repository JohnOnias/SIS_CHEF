import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../styles/categorias.css";

function ModalCadastroCategoria({
  isOpen,
  onClose,
  onSave,
  disabled = false,
  initialNome = "",
  isEdit = false,
  anchorRect = null, // ✅ novo: posição do popat
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { nome: "" },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!isOpen) return;
    reset({ nome: initialNome || "" });
  }, [isOpen, initialNome, reset]);

  if (!isOpen) return null;

  const calcStyle = () => {
    if (!anchorRect) return { right: 18, top: 130 };

    const width = 360;
    const margin = 8;

    const maxLeft = window.innerWidth - width - margin;
    const left = Math.min(Math.max(anchorRect.left, margin), maxLeft);
    const top = anchorRect.bottom + 8;

    return { left, top };
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10001,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          width: 360,
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
          padding: 14,
          ...calcStyle(),
        }}
      >
        <div className="modal-header">
          <h2 style={{ margin: 0 }}>{isEdit ? "Editar Categoria" : "Cadastrar Categoria"}</h2>
          <button type="button" onClick={onClose} className="modal-close">
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSave)}
          style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}
        >
          <label style={{ fontWeight: 700 }}>Nome da categoria</label>

          <input
            type="text"
            placeholder="Ex: Bebidas"
            {...register("nome", {
              required: "Informe o nome",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            disabled={disabled}
          />

          {errors.nome && (
            <small style={{ color: "#b42318", fontWeight: 600 }}>{errors.nome.message}</small>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 10 }}>
            <button type="button" className="bntPadrao" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="bntPadraoGreen" disabled={disabled}>
              {isEdit ? "Salvar" : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCadastroCategoria;
