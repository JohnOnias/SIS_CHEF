import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RectangleImg from "../../assets/others/rectangle.png";
import GroupImg from "../../assets/others/group.png";
import "./styles/login.css";

import ModalResetSenha from "../components/modal/resetPassword/resetPassword";
import { login as loginService } from "../../services/authService";
import { isElectron } from "../../services/api";

function LoginView() {
  const navigate = useNavigate();

  useEffect(() => {
    const tituloElement = document.getElementById("titulo");
    if (tituloElement) tituloElement.innerHTML = "Login!";
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formulario, setFormulario] = useState({
    email: "",
    senha: "",
  });

  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const routeByTipo = (tipo) => {
    const t = String(tipo || "").toLowerCase();
    if (t.includes("adm") || t.includes("administrador")) return "/adm";
    if (t.includes("gerente")) return "/manager";
    if (t.includes("gar") || t.includes("garç") || t.includes("bart") || t.includes("barman"))
      return "/bartender";
    return "/manager";
  };

  const login = async () => {
    try {
      setLoading(true);
      const usuario = await loginService(formulario.email, formulario.senha);
      navigate(routeByTipo(usuario.tipo));
    } catch (error) {
      console.error(error);
      alert(error?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="leftSide">
          <img src={RectangleImg} alt="imagem de pratos suculentos a esquerda" />
        </div>

        <div className="rightSide">
          <div className="centralizeRight">
            <div className="divimg">
              <img src={GroupImg} alt="perfil icone" />
            </div>

            {!isElectron && (
              <div style={{ padding: 10, background: "#fff3cd", borderRadius: 8, marginBottom: 12 }}>
                Você está no Chrome (sem Electron). O login via window.api não funciona aqui.
              </div>
            )}

            <h1>Bem-vindo</h1>
            <p>Entre com suas credenciais</p>

            <div className="inputs">
              <input
                placeholder="Email"
                name="email"
                value={formulario.email}
                onChange={evento}
              />

              <input
                placeholder="Senha"
                name="senha"
                type="password"
                value={formulario.senha}
                onChange={evento}
              />
            </div>

            <div className="containerButton">
              <button
                className="buttonLogin"
                onClick={login}
                disabled={loading || !isElectron}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <button className="buttonRegister" onClick={() => setOpenModal(true)}>
                Esqueci a senha
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalResetSenha isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default LoginView;
