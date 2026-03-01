import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RectangleImg from "../../assets/others/rectangle.png";
import GroupImg from "../../assets/others/group.png";
import "./style/login.css";

import ModalResetSenha from "../../components/modal/resetPassword/resetPassword";
import CustomModal from "../../components/modal/error/customModal";

function LoginView() {
  const navigate = useNavigate();

  useEffect(() => {
    const tituloElement = document.getElementById("titulo");
    if (tituloElement) tituloElement.innerHTML = "Login!";
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const [openFeedback, setOpenFeedback] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState("");
  const [tipoFeedback, setTipoFeedback] = useState("error");

  const [loading, setLoading] = useState(false); // loading do botão

  const [formulario, setFormulario] = useState({
    email: "",
    senha: "",
  });

  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const login = async () => {
    setLoading(true);
    try {
      const user = await window.api.login.login(
        formulario.email,
        formulario.senha,
      );

      if (!user) {
        setMensagemFeedback("Email ou senha inválidos, tente novamente");
        setTipoFeedback("error");
        setOpenFeedback(true);
        return;
      }

      if (!user.ativo) {
        setMensagemFeedback("Usuário inativo, converse com seu supervisor!");
        setTipoFeedback("error");
        setOpenFeedback(true);
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(user));
      navigate("/home");
    } catch (err) {
      setMensagemFeedback("Erro ao realizar login. Tente novamente.");
      setTipoFeedback("error");
      setOpenFeedback(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="leftSide">
          <img
            src={RectangleImg}
            alt="imagem de pratos suculentos a esquerda"
          />
        </div>

        <div className="rightSide">
          <div className="centralizeRight">
            <div className="divimg">
              <img src={GroupImg} alt="perfil icone" />
            </div>

            <h1>Bem-vindo</h1>
            <p>Entre com suas credenciais</p>

            <div className="inputs">
              <input
                className="inputlogin"
                placeholder="Email"
                name="email"
                value={formulario.email}
                onChange={evento}
              />

              <input
                className="inputlogin"
                placeholder="Senha"
                name="senha"
                type="password"
                value={formulario.senha}
                onChange={evento}
              />
            </div>

            <div className="containerButton">
              <button className="bntlogin" onClick={login} disabled={loading}>
                {loading ? "Carregando..." : "Entrar"}
              </button>

              <br />

              <a className="bnt-reset" onClick={() => setOpenModal(true)}>
                Esqueci a senha
              </a>
            </div>
          </div>
        </div>
      </div>

      <ModalResetSenha isOpen={openModal} onClose={() => setOpenModal(false)} />

      <CustomModal
        isOpen={openFeedback}
        title="Erro"
        message={mensagemFeedback}
        onClose={() => setOpenFeedback(false)}
        duration={3000}
        type={tipoFeedback}
        cancelText="Fechar"
      />
    </>
  );
}

export default LoginView;
