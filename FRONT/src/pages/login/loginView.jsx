import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// importa imagens e estilos
import RectangleImg from "../../assets/others/rectangle.png";
import GroupImg from "../../assets/others/group.png";
import "./style/login.css";

// importa os modais
import ModalResetSenha from "../../components/modal/resetPassword/resetPassword";

function LoginView() {
  // importa o navigate para redirecionamento pós-login
  const navigate = useNavigate();

  // seta o título da página ao montar o componente
  useEffect(() => {
    const tituloElement = document.getElementById("titulo");
    if (tituloElement) tituloElement.innerHTML = "Login!";
  }, []);

  // estado para controle do modal
  const [openModal, setOpenModal] = useState(false);

  // estado para armazenar os dados do formulário de login
  const [formulario, setFormulario] = useState({
    email: "",
    senha: "",
  });

  // função para atualizar o estado do formulário conforme o usuário digita
  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  // função para lidar com o login quando o usuário clicar no botão
  const login = async () => {
    try {
      const user = await window.api.login.login(
        formulario.email,
        formulario.senha,
      );
      if (!user) {
        alert("Email ou senha invalidos, tente novamente");
      }

      // ################ ERRO NO REDIRECIONAMENTO CONCERTAR DEPOIS ###################
      // concertar esse redirecionamento

      if (user) {
        localStorage.setItem("usuario", JSON.stringify(user));
        navigate("/home");
      }
    } catch (err) {
      console.log("erro ao fazer login:", err);
    }
  };

  // JSX para renderizar a tela de login, incluindo o modal de reset de senha
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
              <button className="bntlogin" onClick={login} />
              <br />

              <a
                className="bnt-reset"
                onClick={() => setOpenModal(true)}
              >
                Esqueci a senha
              </a>
            </div>
          </div>
        </div>
      </div>

      <ModalResetSenha isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default LoginView;
