import React, { useState } from "react";
import "../styles/resetPassword.css";
import CloseIcon from "../../../../assets/modal/close.png";
import { api, isElectron } from "../../../../services/api";
import { useForm } from "react-hook-form";

function ModalVerifyToken({ isOpen, onClose, email }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { token: "", novaSenha: "", confirmarSenha: "" },
    mode: "onSubmit",
  });

  const novaSenha = watch("novaSenha");

  const onSubmit = async ({ token, novaSenha }) => {
    if (!isElectron) {
      alert("Reset de senha só funciona no Electron (window.api).");
      return;
    }

    setLoading(true);
    try {
      // opcional: validar token antes (o back tem validarToken)
      const valido = await api.login.validarToken(String(token).trim());
      if (!valido) throw new Error("Token inválido.");

      const ok = await api.login.resetarSenha(String(token).trim(), String(novaSenha));
      if (!ok) throw new Error("Falha ao resetar senha.");

      alert("Senha alterada com sucesso.");
      onClose?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao validar token/resetar senha");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="backgroundResetSenha">
        <div id="formResetSenha">
          <div id="formCentre">
            <img src={CloseIcon} id="closeIcon" alt="Fechar" onClick={onClose} />
            <h1>Validar Token</h1>

            {email ? (
              <p style={{ margin: "0 0 10px 0", color: "#667085" }}>
                Email: <b>{email}</b>
              </p>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)}>
              <label id="labelEmail" htmlFor="tokenReset">
                Token recebido
              </label>
              <input
                type="text"
                id="tokenReset"
                placeholder="Token"
                {...register("token", { required: "Informe o token" })}
              />
              {errors.token && (
                <small style={{ display: "block", marginTop: 6, color: "#b42318" }}>
                  {errors.token.message}
                </small>
              )}

              <label id="labelEmail" htmlFor="novaSenhaReset">
                Nova senha
              </label>
              <input
                type="password"
                id="novaSenhaReset"
                placeholder="Nova senha"
                {...register("novaSenha", {
                  required: "Informe a nova senha",
                  minLength: { value: 4, message: "Mínimo 4 caracteres" },
                })}
              />
              {errors.novaSenha && (
                <small style={{ display: "block", marginTop: 6, color: "#b42318" }}>
                  {errors.novaSenha.message}
                </small>
              )}

              <label id="labelEmail" htmlFor="confirmarSenhaReset">
                Confirmar senha
              </label>
              <input
                type="password"
                id="confirmarSenhaReset"
                placeholder="Confirmar senha"
                {...register("confirmarSenha", {
                  required: "Confirme a senha",
                  validate: (v) => v === novaSenha || "As senhas não conferem",
                })}
              />
              {errors.confirmarSenha && (
                <small style={{ display: "block", marginTop: 6, color: "#b42318" }}>
                  {errors.confirmarSenha.message}
                </small>
              )}

              <button id="enviar" type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Alterar senha"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalVerifyToken;
