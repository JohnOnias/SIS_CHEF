import React from 'react'
import "./styles/resetPassword.css";
import CloseIcon from "../../../assets/modal/close.png";

function ModalResetSenha({ isOpen, onClose }) {
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
               <h1>Recuperar Acesso</h1>
               <label id="labelEmail" for="email">
                 Digite o Email cadastrado!
               </label>
               <input
                 type="text"
                 id="emailResetTest"
                 name="email"
                 placeholder="Email"
               ></input>
               <button id="enviar">Enviar código</button>
             </div>
           </div>
         </div>
       </>
     );

}




export default ModalResetSenha;