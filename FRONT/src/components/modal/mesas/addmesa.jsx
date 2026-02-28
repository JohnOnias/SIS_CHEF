import "./style/addmesa.css";
import { useState } from "react"; 



function AddMesaModal({ isOpen, onClose, onMesaCriada }) {
  const [formulario, setFormulario] = useState({
    numero: "",
  });

  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };



  const addMesa = async () => {
    if (!formulario.numero.trim()) {
      alert("Digite o número da mesa");
      return;
    }

    try {
      const ok = await window.api.mesas.cadastrarMesas(formulario.numero);
      console.log("erro?:",ok);
      console.log(formulario.numero);

        if (ok.success) {
          
          setFormulario({ numero: "" });
            onMesaCriada();
              onClose();
        }
     
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar mesa");
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
          type="text"
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
    </div>
  );
}


export default AddMesaModal; 