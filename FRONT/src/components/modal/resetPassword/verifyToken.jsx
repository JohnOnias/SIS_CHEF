import React, { useState} from "react";
import "../styles/verifytoken.css";
import CloseIcon from "../../../assets/modal/close.png";

function ModalVerifyToken({ isOpen, onClose, email }) {

const [formulario, setFormulario] = useState({
  email: email || "",
  token: "",
  senha1: "",
  senha2: "",
});



  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const updateSenha = async (event) => {
    event.preventDefault();

    if (
      !formulario.email ||
      !formulario.token ||
      !formulario.senha1 ||
      !formulario.senha2
    ) {
      alert("Preencha todos os dados!");
      return;
    }

    if (formulario.senha1 !== formulario.senha2) {
      alert("As senhas devem ser iguais");
      return;
    }

    try {
      // ainda n fiz essa api
      const ok = await window.api.login.updatePassword(
        formulario.email,
        formulario.token,
        formulario.senha1,
      );

      if (!ok) {
        alert("Token inválido ou expirado.");
        return;
      }

      alert("Senha atualizada com sucesso!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar senha.");
    }
  };




  if (!isOpen) return null;

  return (
    <div className="backgroundResetSenha">
      <div id="formResetSenha">
        <div id="formCentre">
          <img src={CloseIcon} id="closeIcon" alt="Fechar" onClick={onClose} />

          <h1 className="h1reset">Validar Token</h1>

          <form onSubmit={updateSenha}>
            <label className="labelreset" htmlFor="tokenReset">
              Token recebido
            </label>

            <input
              className="inputreset"
              type="text"
              name="token"
              id="tokenReset"
              placeholder="Token"
              value={formulario.token}
              onChange={evento}
            />

            <label className="labelreset" htmlFor="novaSenhaReset">
              Nova senha
            </label>

            <input
              className="inputreset"
              type="password"
              name="senha1"
              id="novaSenhaReset"
              placeholder="Nova senha"
              value={formulario.senha1}
              onChange={evento}
            />

            <label className="labelreset" htmlFor="confirmarSenhaReset">
              Confirmar senha
            </label>

            <input
              className="inputreset"
              type="password"
              name="senha2"
              id="confirmarSenhaReset"
              placeholder="Confirmar senha"
              value={formulario.senha2}
              onChange={evento}
            />

            <button className="bntreset" type="submit">
              Atualizar Senha
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalVerifyToken;
