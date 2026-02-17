import React, { useState } from "react";
import "../styles/resetPassword.css";
import CloseIcon from "../../../assets/modal/close.png";




function ModalVerifyToken({ isOpen, onClose, email }) {

 const [formulario, setFormulario] = useState({
    email:email || "",
    token:"",
    senha1: "",
    senha2: "",
  });


  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };


function updateSenha(event, formulario){
  event.preventDefault();

  if(!formulario.email || !formulario.senha1 || !formulario.senha2){
    alert("Preencha todos os dados!");
  }
  if(formulario.senha1 != formulario.senha2){
    alert("As senhas devem ser iguais");
  }


}


  if (!isOpen) return null;

  return (
    <>
      <div className="backgroundResetSenha">
        <div id="formResetSenha">
          <div id="formCentre">
            <img
              src={CloseIcon}
              id="closeIcon"
              alt="Fechar"
              onClick={onClose}
            />
            <h1>Validar Token</h1>

            <form onSubmit={updateSenha(formulario)}>
              <label id="labelEmail" htmlFor="tokenReset">
                Token recebido
              </label>

              <input
                type="text"
                id="tokenReset"
                placeholder="Token"
                value={formulario.token}
                onChange={evento}
              />

              <label id="labelEmail" htmlFor="novaSenhaReset">
                Nova senha
              </label>

              <input
                type="password"
                id="novaSenhaReset"
                placeholder="Nova senha"
                value={formulario.senha1}
                onChange={evento}
              />

              <label id="labelEmail" htmlFor="confirmarSenhaReset">
                Confirmar senha
              </label>
              <input
                type="password"
                id="confirmarSenhaReset"
                placeholder="Confirmar senha"
                value={formulario.senha2}
                onChange={evento}
              />

              <button id="enviar" type="submit"></button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalVerifyToken;
