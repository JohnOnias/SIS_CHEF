import { useState } from "react";
import "../styles/resetPassword.css";
import CloseIcon from "../../../../assets/modal/close.png";
import ModalVerifyToken from "./verifyToken";

function ModalResetSenha({ isOpen, onClose }) {
  const [openModal, setOpenModal] = useState(false);

  const [formulario, setFormulario] = useState({
    email: "",
  });

  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const enviarEmail = async (event) => {
    event.preventDefault();


    
    try {
      // ainda não fiz essa api
      const ok = await window.api.login.sendResetEmail(formulario.email);

      if (!ok) {
        alert("Erro ao acessar sua conta, tente novamente mais tarde");
        return;
      }

      setOpenModal(true);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao enviar token");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="backgroundResetSenha">
      <div id="formResetSenha">
        <div id="formCentre">
          <img src={CloseIcon} id="closeIcon" alt="Fechar" onClick={onClose} />

          <h1>Recuperar Acesso</h1>

          <label htmlFor="emailResetTest">Digite o Email cadastrado!</label>

          <form onSubmit={enviarEmail}>
            <input
              type="text"
              name="email"
              id="emailResetTest"
              placeholder="Email"
              value={formulario.email}
              onChange={evento}
            />

            <button id="enviar" type="submit">
              Enviar
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
