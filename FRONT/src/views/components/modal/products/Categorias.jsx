import React, { useState } from "react";
import ModalCadastroCategoria from "../modal/ModalCadastroCategoria";
import "./styles/categorias.css"; 

function Categorias() {
  const [categorias, setCategorias] = useState([
    { id: 1, nome: "Bebidas", status: "Ativa" },
    { id: 2, nome: "Comidas", status: "Ativa" },
  ]);

  const [openModal, setOpenModal] = useState(false);

  // Função para adicionar categoria
  const adicionarCategoria = (novaCategoria) => {
    setCategorias([...categorias, { id: categorias.length + 1, ...novaCategoria }]);
  };

  return (
    <div className="tela">
      <div className="containerConteudo">
        <h1>Categorias de Produtos</h1>

        <button
          className="bntPadraoGreen"
          onClick={() => setOpenModal(true)}
        >
          Cadastrar Categoria
        </button>

        <ul className="categorias-list">
          {categorias.map((cat) => (
            <li key={cat.id}>
              {cat.nome} - <strong>{cat.status}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      <ModalCadastroCategoria
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        adicionarCategoria={adicionarCategoria}
      />
    </div>
  );
}

export default Categorias;
