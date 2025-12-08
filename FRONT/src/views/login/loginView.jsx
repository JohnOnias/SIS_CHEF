import React from "react";
import RectangleImg from '../../assets/rectangle.png';
import GroupImg from '../../assets/group.png';
import './style.css';

function LoginView() {
  document.getElementById("titulo").innerHTML = "Login!";

  return (
    <div className="container">

      <div className="leftSide">
        <img src={RectangleImg} alt="imagem de pratos suculentos a esquerda" />
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
            />
            <input
              placeholder="Senha"
              type="password"
              name="senha"
              id="senha"
              required
              minLength={4}
              maxLength={20}
            />
            <button id="entrar" type="submit">Entrar</button>
          <a href="#" id="esqueci">Esqueci minha senha!</a>
          
        </div>
      </div>

  

    </div>
  );
}

export default LoginView;
