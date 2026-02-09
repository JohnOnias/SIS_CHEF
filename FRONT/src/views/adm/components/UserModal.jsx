import React from "react";
import { formatCPF } from "../utils/cpfEmail";

function UserModal({
  open,
  onClose,
  mode,
  role,
  setRole,
  nome,
  setNome,
  cpf,
  setCpf,
  email,
  setEmail,
  senha,
  setSenha,
  confirmSenha,
  setConfirmSenha,
  errors,
  onSave,
}) {
  if (!open) return null;

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Cadastro</h2>

        <div className="adm-form">
          <select
            className="adm-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="manager">Gerente</option>
            <option value="waiter">Garçom</option>
          </select>

          <div style={{ display: "grid", gap: 6 }}>
            <input
              className="adm-input"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {errors.nome && (
              <small style={{ color: "#e03131", fontWeight: 700 }}>
                {errors.nome}
              </small>
            )}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <input
              className="adm-input"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
            />
            {errors.cpf && (
              <small style={{ color: "#e03131", fontWeight: 700 }}>
                {errors.cpf}
              </small>
            )}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <input
              className="adm-input"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <small style={{ color: "#e03131", fontWeight: 700 }}>
                {errors.email}
              </small>
            )}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <input
              className="adm-input"
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {errors.senha && (
              <small style={{ color: "#e03131", fontWeight: 700 }}>
                {errors.senha}
              </small>
            )}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <input
              className="adm-input"
              placeholder="Confirmação da Senha"
              type="password"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
            />
            {errors.confirmSenha && (
              <small style={{ color: "#e03131", fontWeight: 700 }}>
                {errors.confirmSenha}
              </small>
            )}
          </div>
        </div>

        <div className="adm-actions">
          <button className="adm-submit" onClick={onSave}>
            {mode === "create" ? "Cadastrar" : "Salvar"}
          </button>
        </div>

        <button className="adm-cancel" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default UserModal;
