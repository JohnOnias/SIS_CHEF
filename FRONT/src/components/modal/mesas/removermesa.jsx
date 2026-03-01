import "./style/addmesa.css";
import { useState } from "react"; 
import CustomModal from "../../../components/modal/error/customModal";



 function RemoverMesaModal({ isOpen, onClose, onMesaRemovida }) {
  const [openErro, setOpenErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
   const [formulario, setFormulario] = useState({
     numero: "",
   });

   const evento = (event) => {
     const { name, value } = event.target;
     setFormulario((prev) => ({ ...prev, [name]: value }));
   };

async function removerMesa() {
  try {
    const ok = await window.api.mesas.remover(formulario.numero);

    if (!ok.success) {
      setMensagemErro(ok.error || "Erro ao remover mesa");
      setOpenErro(true);
      return;
    }

    setFormulario({ numero: "" });
    onMesaRemovida();
    onClose();
  } catch (err) {
    setMensagemErro("Erro inesperado ao remover mesa", err);
    setOpenErro(true);
  }
}

   if (!isOpen) {
     return null;
   }

   return (
     <div className="overlay">
       <div className="modal">
         <h2>Excluir Mesa</h2>

         <p>Número da mesa</p>

         <input
           type="number"
           name="numero"
           placeholder="Digite o número"
           value={formulario.numero}
           onChange={evento}
         />

         <button className="criar" onClick={() => removerMesa()}>
           Remover Mesa
         </button>

         <button className="cancelar" onClick={() => onClose()}>
           Cancelar
         </button>
       </div>


       <CustomModal
         isOpen={openErro}
         title="Erro"
         message={mensagemErro}
         onClose={() => setOpenErro(false)}
         duration={5000}
         type="error"
         cancelText="Fechar"
       />

     </div>
   );
 }


export default RemoverMesaModal; 