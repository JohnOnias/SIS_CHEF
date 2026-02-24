import "./style/addmesa.css";
import { useState } from "react"; 

 function RemoverMesaModal({isOpen, onClose}) {



  const [formulario, setFormulario] = useState({
      numero: ""
    });
  
  
      const evento = (event) => {
      const { name, value } = event.target;
      setFormulario((prev) => ({ ...prev, [name]: value }));
    };
  
  
  
  
    async function removerMesa() {
  
      try {
            const ok = await window.api.mesas.remover(formulario.numero);
  
            alert("Mesa removida  com sucesso!");
            console.log("mesa capturda: ", ok); 
      } catch (err) {
        
          alert("erro ao remover a mesa", err); 
  
      }
    }
  
    
      if(!isOpen){
          return null; 
      }
  

    return (
      <div className="overlay">
        <div className="modal">
          <h2>Excluir Mesa</h2>

          <p>Número da mesa</p>

          <input
            type="text"
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
      </div>
    );
}


export default RemoverMesaModal; 