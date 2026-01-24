import React from 'react'
import "../styles/resetPassword.css";
import CloseIcon from "../../../../assets/modal/close.png";
import { useState } from 'react';
import ModalVerifyToken from './verifyToken';

function ModalResetSenha({ isOpen, onClose }) {
// set modal reset senha
const [openModal, setOpenModal] = useState(false);


  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  function enviarEmail(email) {
      // Lógica para enviar o email de recuperação
      console.log("Enviando email de recuperação para:", email);
      //emailVerificado = await window.apiEmail.enviarEmail(email);
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
               <h1>Recuperar Acesso</h1>
               <label id="labelEmail" for="email">
                 Digite o Email cadastrado!
               </label>
               <input
                 type="text"
                 id="emailResetTest"
                 name="email"
                 placeholder="Email"
                 value={email}
                 onChange={handleChange}
               ></input>
               <button id="enviar" onClick={() => enviarEmail(email)}>Enviar código</button>
             </div>
           </div>

          <ModalVerifyToken
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          />

         </div>
       </>
     );

 }

export default ModalResetSenha;