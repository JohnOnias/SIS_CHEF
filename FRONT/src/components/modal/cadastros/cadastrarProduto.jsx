import { useState, useEffect } from "react";
import "./styles/cadastroUsuario.css";
import CloseIcon from "../../../assets/modal/close.png";



function ProdutoModal({ isOpen, onClose }) {


const [categorias, setCategorias] = useState([]);

  const [formulario, setFormulario] = useState({
    nome: "",
    preco: "",
    descricao: "",
    categoria: "",
  });

async function getCategorias() {
  try {
    const resposta = await window.api.categoria.getCategorias();

    if (resposta?.success) {
      setCategorias(resposta.data);
      console.log(" lista de categorias",resposta.data)
    } else {
      console.log("Erro ao buscar categorias");
    }
  } catch (error) {
    console.log("erro ao pegar categorias", error);
  }
}
  
  useEffect(() => {
  getCategorias();
}, []);




  const evento = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };



const enviar = async (event) => {
  event.preventDefault();
  try {
    const resposta = await window.api.produto.cadastrarProduto(
        formulario.nome,
        Number(formulario.preco),
        formulario.categoria,
        formulario.descricao
      );
    

    if (!resposta?.success) {
      alert(`Erro ao cadastrar: ${resposta?.error || "Erro ao cadastrar"}`);
      return;
    }
    
    console.log("objeto retornado do cadastro", resposta);
    alert("Produto cadastrado com sucesso!");

 

    onClose();
  } catch (e) {
    console.error(e);
    alert(e?.message || "Erro ao cadastrar");
  }
};


  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <img
            src={CloseIcon}
            className="modal-close"
            alt="Fechar"
            onClick={onClose}
          />

          <h1 className="modal-title">Cadastro Produto</h1>

          <form className="modal-form" onSubmit={enviar}>
            <label className="modal-label" htmlFor="nome">
              Nome:
            </label>
            <input
              required
              className="modal-input"
              type="text"
              name="nome"
              id="nome"
              placeholder="Digite o nome"
              value={formulario.nome}
              onChange={evento}
            />

            <label className="modal-label" htmlFor="preco">
              Preço:
            </label>
            <input
              required
              maxLength={11}
              className="modal-input"
              type="number"
              name="preco"
              id="preco"
              placeholder="Digite o preço do produto"
              value={formulario.preco}
              onChange={evento}
            />

            <label className="modal-label" htmlFor="categoria">
              Categoria: 
            </label>

           <select
  required
  className="modal-input"
  name="categoria"
  id="categoria"
  value={formulario.categoria}
  onChange={evento}
>
  <option value="">Selecione</option>
  {Array.isArray(categorias) &&
    categorias.map((categoria) => (
      <option key={categoria.dataValues.id} value={categoria.dataValues.id}>
        {categoria.dataValues.nome}
      </option>
    ))}
</select>
            <label className="modal-label" htmlFor="descricao">
              Descrição:
            </label>
            <input
              required
              className="modal-input"
              type="text"
              name="descricao"
              id="descricao"
              placeholder="Digite uma descricao"
              value={formulario.descricao}
              onChange={evento}
            />

            <button className="modal-button" type="submit" >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ProdutoModal; 