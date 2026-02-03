import React, { useEffect, useState } from "react";
import RectangleImg from '../../assets/others/rectangle.png';
import GroupImg from '../../assets/others/group.png';

//importa o css
import './styles/login.css';

//import modal reset senha
import ModalResetSenha from "../components/modal/resetPassword/resetPassword";


function LoginView() {
  // altera o titulo da pagina
  useEffect(() => {
    const tituloElement = document.getElementById("titulo");
    if (tituloElement) {
      tituloElement.innerHTML = "Login!";
    }
  }, []);

// set modal reset senha
const [openModal, setOpenModal] = useState(false);
// evento modal



  // função de login
  const login = (formulario) => {
    console.log("Fazendo login com os dados:", formulario);
    try {

      window.api.login.login(formulario.email, formulario.senha);
     


     if(window.api.login.login){
        
          console.log("Login bem-sucedido!");
          //redirecionar para a proxima pagina coloque a rederecionamento aqui 

          /////////
     }
     else{
       alert("Erro ao fazer login, verifique suas credenciais.");
     }


    } catch (error) {
      console.error("Erro ao chamar a API de login:", error);
    }
  };

  // mmodelo formulario/dados
  const modelo = {
    email: "",
    senha: "",
  };

  const [formulario, setFormulario] = useState(modelo);

  // evento
  const evento = (event) => {
    let nome = event.target.name;
    let valor = event.target.value;

    setFormulario({ ...formulario, [nome]: valor });
  };


  //retorno da função do componete
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

            <input
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              required
              onChange={evento}
            />
            <input
              placeholder="Senha"
              type="password"
              name="senha"
              id="senha"
              required
              minLength={6}
              maxLength={12}
              onChange={evento}
            />
            <button id="entrar" type="submit" onClick={() => login(formulario)}>
              Entrar
            </button>
            <a href="#" id="esqueci" onClick={() => setOpenModal(true)}>
              Esqueci minha senha!
            </a>
          </div>
        </div>
      </div>

      <ModalResetSenha isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default LoginView;
