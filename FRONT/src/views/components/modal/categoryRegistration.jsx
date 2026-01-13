import React from 'react'
import "./style/resetSenha.css";
import CloseIcon from "../../../assets/close.png";


function ModalCadastroCategoria({ isOpen, onClose }) {


  if (!isOpen) return null;
     return (
       <>
         <modal class="container">
                  <img
                             src={CloseIcon}
                             id="closeIcon"
                             alt="Fechar"
                             onClick={onClose}
                           />
           <form id="formCadastroCategoria">
             <label for="nomeCategoria">Nome da Categoria</label>
             <input
               type="text"
               id="nomeCategoria"
               placeholder="Categoria"
               required
             />

             <label for="statusCategoria">Status:</label>
             <select id="statusCategoria" required>
               <option value="">Selecione</option>
               <option value="Ativa">Ativa</option>
               <option value="Inativa">Inativa</option>
             </select>

             <button id="enviarCategoria">Cadastrar</button>
                <br />
             <button id="enviarCategoria" onClick={onClose}>Cancelar</button>
           </form>
         </modal>
       </>
     );

}




export default ModalCadastroCategoria;