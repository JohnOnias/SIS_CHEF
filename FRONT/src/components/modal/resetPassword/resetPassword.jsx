import { useState } from "react";
import "./styles/resetPassword.css";
import CloseIcon from "../../../assets/modal/close.png";
import ModalVerifyToken from "./verifyToken.jsx";

function ModalResetSenha({ isOpen, onClose }) {
  const [openModal, setOpenModal] = useState(false);

  const [formulario, setFormulario] = useState({
    email: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const enviarEmail = async (event) => {
    event.preventDefault();

    setMensagem("");
    setTipoMensagem("");

    if (!formulario.email) {
      setMensagem("Digite um email válido.");
      setTipoMensagem("error");
      return;
    }

    try {
      setLoading(true);

      const ok = await window.api.email.gerarEEnviarToken(formulario.email);

      if (!ok) {
        setMensagem("Erro ao acessar sua conta. Tente novamente mais tarde.");
        setTipoMensagem("error");
        setLoading(false);
        return;
      }

      setMensagem("Email enviado com sucesso! Verifique sua caixa de entrada.");
      setTipoMensagem("success");

      setTimeout(() => {
        setOpenModal(true);
        setMensagem("");
      }, 1200);
    } catch (e) {
      console.error(e);
      setMensagem(e?.message || "Erro ao enviar token.");
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

          <h1 className="h1reset">Recuperar Acesso</h1>

          <label className="labelreset" htmlFor="emailResetTest">
            Digite o Email cadastrado!
          </label>

          <form onSubmit={enviarEmail}>
            <input
              className="inputreset"
              required
              type="text"
              name="email"
              id="emailResetTest"
              placeholder="Email"
              value={formulario.email}
              onChange={evento}
            />

            {mensagem && (
              <div className={`mensagem ${tipoMensagem}`}>{mensagem}</div>
            )}

            <button
              className="bntreset"
              id="enviar"
              type="submit"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
      </div>

      <ModalVerifyToken
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        email={formulario.email}
      />
    </div>
  );
}

export default ModalResetSenha;
