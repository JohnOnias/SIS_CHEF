import "./style/addmesa.css";
import { useState } from "react"; 
import CustomModal from "../../../components/modal/error/customModal";



function AddMesaModal({ isOpen, onClose, onMesaCriada }) {
   const [openErro, setOpenErro] = useState(false);
   const [mensagemErro, setMensagemErro] = useState("");
  const [formulario, setFormulario] = useState({
    numero: "",
  });

  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };



  const addMesa = async () => {
    if (!formulario.numero.trim()) {
      
      return;
    }

    try {
      const ok = await window.api.mesas.cadastrarMesas(formulario.numero);
  
        if (ok.success) {
          
          setFormulario({ numero: "" });
            onMesaCriada();
              onClose();
        }
        else{
          
           setMensagemErro("Erro ao remover mesa");
           setOpenErro(true);
           return;

        }
        
     
    } catch (err) {

        console.log(err, "teste");
    }
  };



  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Adicionar Mesa</h2>

        <p>Número da mesa</p>

        <input
          type="number"
          name="numero"
          placeholder="Digite o número"
          value={formulario.numero}
          onChange={evento}
        />

        <button className="criar" onClick={addMesa}>
          Criar Mesa
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


export default AddMesaModal; 