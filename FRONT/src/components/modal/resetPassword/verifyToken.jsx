import React, { useState, useEffect } from "react";
import "./styles/verifytoken.css";
import CloseIcon from "../../../assets/modal/close.png";

function ModalVerifyToken({ isOpen, onClose, email }) {
  const [formulario, setFormulario] = useState({
    token: "",
    senha1: "",
    senha2: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  // Atualiza o formulário caso o modal seja aberto com novo email
  useEffect(() => {
    setMensagem("");
    setTipoMensagem("");
    setFormulario({ token: "", senha1: "", senha2: "" });
  }, [email, isOpen]);

  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const updateSenha = async (event) => {
    event.preventDefault();

    setMensagem("");
    setTipoMensagem("");

    const { token, senha1, senha2 } = formulario;

    if (!token || !senha1 || !senha2) {
      setMensagem("Preencha todos os dados.");
      setTipoMensagem("error");
      return;
    }

    if (senha1 !== senha2) {
      setMensagem("As senhas devem ser iguais.");
      setTipoMensagem("error");
      return;
    }

    try {
      setLoading(true);

      // Chama IPC resetar-senha
      const result = await window.api.email.resetarSenha(token, senha1);

      if (!result.sucesso) {
        setMensagem(result.mensagem || "Token inválido ou expirado.");
        setTipoMensagem("error");
        setLoading(false);
        return;
      }

      setMensagem(result.mensagem || "Senha atualizada com sucesso!");
      setTipoMensagem("success");

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao atualizar senha.");
      setTipoMensagem("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="backgroundResetSenha">
      <div id="formResetSenha">
        <div id="formCentre">
          <img src={CloseIcon} id="closeIcon" alt="Fechar" onClick={onClose} />

          <h1 className="h1reset">Redefinir Senha</h1>

          {email && (
            <div className="emailInfo">
              Email: <strong>{email}</strong>
            </div>
          )}

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

            {mensagem && (
              <div className={`mensagem ${tipoMensagem}`}>{mensagem}</div>
            )}

            <button className="bntreset" type="submit" disabled={loading}>
              {loading ? "Atualizando..." : "Atualizar Senha"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalVerifyToken;
