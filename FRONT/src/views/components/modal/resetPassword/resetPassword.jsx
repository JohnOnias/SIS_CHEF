import React, { useState } from "react";
import "../styles/resetPassword.css";
import CloseIcon from "../../../../assets/modal/close.png";
import ModalVerifyToken from "./verifyToken";
import { api, isElectron } from "../../../../services/api";
import { useForm } from "react-hook-form";

function ModalResetSenha({ isOpen, onClose }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const enviarEmail = async ({ email }) => {
    if (!isElectron) {
      alert("Reset de senha só funciona no Electron (window.api).");
      return;
    }

    setLoading(true);
    try {
      const ok = await api.login.gerarEEnviarToken(String(email).trim());
      if (!ok) throw new Error("Falha ao enviar o token.");
      setOpenModal(true);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao enviar token");
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
            <h1>Recuperar Acesso</h1>

            <label id="labelEmail" htmlFor="emailResetTest">
              Digite o Email cadastrado!
            </label>

            <form onSubmit={handleSubmit(enviarEmail)}>
              <input
                type="text"
                id="emailResetTest"
                placeholder="Email"
                {...register("email", { required: "Informe o email" })}
              />
              {errors.email && (
                <small style={{ display: "block", marginTop: 6, color: "#b42318" }}>
                  {errors.email.message}
                </small>
              )}

              <button id="enviar" type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar código"}
              </button>
            </form>
          </div>
        </div>

        <ModalVerifyToken
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          // mantém o email disponível, caso você queira exibir/usar no modal 2
          email={getValues("email")}
        />
      </div>
    </>
  );
}

export default ModalResetSenha;
