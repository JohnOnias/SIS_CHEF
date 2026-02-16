import React, { useState } from "react";
import "../styles/resetPassword.css";
import CloseIcon from "../../../../assets/modal/close.png";


function ModalVerifyToken({ isOpen, onClose, email }) {
 



  if (!isOpen) return null;

  return (
    <>
      <div className="backgroundResetSenha">
        <div id="formResetSenha">
          <div id="formCentre">


            <img src={CloseIcon} id="closeIcon" alt="Fechar" onClick={onClose} />
            <h1>Validar Token</h1>

            <form >
              <label id="labelEmail" htmlFor="tokenReset">
                Token recebido
              </label>

              <input
                type="text"
                id="tokenReset"
                placeholder="Token"
               
              />
            
              <label id="labelEmail" htmlFor="novaSenhaReset">
                Nova senha
              </label>

              <input
                type="password"
                id="novaSenhaReset"
                placeholder="Nova senha"
        />
              
              <label id="labelEmail" htmlFor="confirmarSenhaReset">
                Confirmar senha
              </label>
              <input
                type="password"
                id="confirmarSenhaReset"
                placeholder="Confirmar senha"
              />

              <button id="enviar" type="submit">
               
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalVerifyToken;
