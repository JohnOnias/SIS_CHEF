import React from 'react'
import { useState} from 'react'

export default function Registration() {

  const [modal, setModal] = useState(null);

  const evento = () => {
    setModal(true);
  }

  return(

    <>
            <div className="tela">
              <h1>Cadastro</h1>
              <div className="containerConteudo">
                <p>Crie uma nova Categoria de Produtos</p>
                <div className="divbnt">
                  <button
                    className="bntPadrao"
                    onClick={() => evento("categoria")}
                  >
                    Criar Nova Categoria
                  </button>
                  <a href="#">Editar Categorias</a>
                </div>
                <hr />
              </div>
              <ModalCadastroCategoria isOpen={modal} onClose={() => setModal(null)} />

              <div className="containerConteudo">
                <p>Crie um novo Produto</p>
                <div className="divbnt">
                  <button
                    className="bntPadrao"
                    onClick={() => evento("produto")}
                  >
                    Criar Produtos
                  </button>
                  <a href="#">Editar Produtos</a>
                </div>
                <hr />
              </div>
              <ModalCadastroProduto isOpen={modal} onClose={() => setModal(null)} />

              <div className="containerConteudo">
                <p>Adcione uma nova mesa para gerenciar pedidos</p>
                <div className="divbnt">
                  <button
                    className="bntPadrao"
                    onClick={() => evento("mesa")}
                  >
                    Adicionar Mesa
                  </button>
                  <a href="#">Editar Mesas</a>
                </div>
                <hr />
              </div>
              <ModalCadastroMesa isOpen={modal} onClose={() => setModal(null)} />
            </div>
            

</>

  )
}
