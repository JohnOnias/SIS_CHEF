import { useState, useEffect } from "react";
import "./style/mesas.css";

import AddMesaModal from "../../components/modal/mesas/addmesa";
import RemoverMesaModal from "../../components/modal/mesas/removermesa";



export default function Mesas() {




  const [mesas, setMesas] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
 const [openModalRemover, setOpenModalRemover] = useState(false);



useEffect(() => {
   
  }, []);


 


  //  Remover Mesa
 


  return (
    <div className="layout">

 

      {/* CONTEÚDO */}
      <main className="content">
        <div className="header">
          <div>
            <h1>Mesas</h1>
            <p>Clique na mesa para abrir pedido</p>
          </div>

          <div className="buttons">
            <button className="remove" onClick={() => setOpenModalRemover(true)}>
              Remover Mesa
            </button>

            <button className="add" onClick={() => setOpenModalAdd(true)}>
              Adicionar Mesa
            </button>
          </div>
        </div>

       
      </main>

      <AddMesaModal   isOpen={openModalAdd} onClose={() => setOpenModalAdd(false)}/>
      <RemoverMesaModal   isOpen={openModalRemover} onClose={() => setOpenModalRemover(false)} />
     


    </div>
  );
}