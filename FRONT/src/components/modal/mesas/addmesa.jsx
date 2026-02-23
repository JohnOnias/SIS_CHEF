import "./style/addmesa.css";
import { useState } from "react"; 



function AddMesaModal({isOpen, onClose}) {

  const [formulario, setFormulario] = useState({
      numero: "",
    });



  const evento = (event) => {
      const { name, value } = event.target;
      setFormulario((prev) => ({ ...prev, [name]: value }));
    };


    const addMesa = async () => {
      try {
            const ok = await window.api.mesas.cadastrarMesas(formulario.numero);

            alert("Mesa Cadastrada com sucesso!");
            console.log("mesa capturda: ", ok); 
      } catch (error) {
        
          alert("erro ao cadastrar mesa"); 

      }
    }

  
    if(!isOpen){
        return null; 
    }

    return (


    <div className="overlay">
      <div className="modal">

                <h2>Adicionar Mesa</h2>

          <p>Número da mesa</p>

          <input
            type="text"
            placeholder="Digite o número"
            value={formulario.numero}
            onChange={evento}
          />

          <button className="criar" onClick={addMesa}>
            Criar Mesa
          </button>
          
          <button className="cancelar" onClick={()=> onClose()}>
            Cancelar
          </button>

      </div>
    </div>
  );
}


export default AddMesaModal; 