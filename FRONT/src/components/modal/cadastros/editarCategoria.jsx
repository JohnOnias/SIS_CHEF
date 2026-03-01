import { useState, useEffect } from "react";
import "./styles/cadastroUsuario.css";
import CloseIcon from "../../../assets/modal/close.png";
import CustomModal from "../../../components/modal/error/customModal";

function EditCategoriaModal({ isOpen, onClose }) {
  const [openFeedback, setOpenFeedback] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMsg, setTipoMsg] = useState("");
  const [titulo, setTitulo] = useState("");

  const [openAviso, setOpenAviso] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [formulario, setFormulario] = useState({
    nome: "",
    status: "disponivel", // padrão
  });

  const limparFormulario = () =>
    setFormulario({ nome: "", status: "disponivel" });

  // Busca todas as categorias
  async function getCategorias() {
    try {
      const resposta = await window.api.categoria.getCategorias();
      if (resposta?.success) {
        setCategorias(resposta.data);
      } else {
        setTitulo("Erro");
        setMensagem("Erro ao buscar categorias");
        setTipoMsg("error");
        setOpenFeedback(true);
      }
    } catch (error) {
      setTitulo("Erro");
      setMensagem("Erro ao carregar categorias");
      setTipoMsg("error");
      setOpenFeedback(true);
    }
  }

  // Carrega categorias ao abrir modal
  useEffect(() => {
    if (isOpen) {
      getCategorias();
    } else {
      limparFormulario();
      setSelectedCategoria("");
    }
  }, [isOpen]);

  // Preenche formulário quando seleciona uma categoria
  useEffect(() => {
    if (selectedCategoria) {
      const cat = categorias.find((c) => c.id === Number(selectedCategoria));
      if (cat) {
        setFormulario({
          nome: cat.nome,
          status: cat.status || "disponivel",
        });
      }
    } else {
      limparFormulario();
    }
  }, [selectedCategoria, categorias]);

  const evento = (event) => {
    const { name, value } = event.target;

    // Se estiver alterando o status e for diferente do original, mostra aviso
    if (name === "status" && value !== formulario.status) {
      setOpenAviso(true);
    }

    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const salvar = async () => {
    if (!selectedCategoria) {
      setTitulo("Erro");
      setMensagem("Selecione uma categoria para editar");
      setTipoMsg("error");
      setOpenFeedback(true);
      return;
    }

    if (!formulario.nome.trim()) {
      setTitulo("Erro");
      setMensagem("O nome da categoria não pode estar vazio");
      setTipoMsg("error");
      setOpenFeedback(true);
      return;
    }

    try {
      const resposta = await window.api.categoria.editarCategoria(
        selectedCategoria,
        formulario.nome,
        formulario.status,
      );

      if (!resposta?.success) {
        setTitulo("Erro");
        setMensagem(resposta?.error || "Erro ao atualizar categoria");
        setTipoMsg("error");
        setOpenFeedback(true);
        return;
      }

      setTitulo("Sucesso");
      setMensagem("Categoria atualizada com sucesso!");
      setTipoMsg("success");
      setOpenFeedback(true);

      await getCategorias();
      setSelectedCategoria("");
      limparFormulario();
    } catch (error) {
      setTitulo("Erro");
      setMensagem("Erro inesperado ao atualizar categoria");
      setTipoMsg("error");
      setOpenFeedback(true);
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
            onClick={() => {
              limparFormulario();
              setSelectedCategoria("");
              onClose();
            }}
          />

          <h1 className="modal-title">Editar Categoria</h1>

          <div className="modal-form">
            <label className="modal-label" htmlFor="categoriaSelect">
              Categoria:
            </label>
            <select
              required
              className="modal-input"
              id="categoriaSelect"
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
            >
              <option value="">Selecione</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>

            <label className="modal-label" htmlFor="nome">
              Nome:
            </label>
            <input
              required
              className="modal-input"
              type="text"
              name="nome"
              id="nome"
              value={formulario.nome}
              onChange={evento}
            />

            <label className="modal-label" htmlFor="status">
              Status:
            </label>
            <select
              required
              className="modal-input"
              name="status"
              id="status"
              value={formulario.status}
              onChange={evento}
            >
              <option value="disponivel">Disponível</option>
              <option value="indisponivel">Indisponível</option>
            </select>

            <button
              className="modal-button btn-success"
              type="button"
              onClick={salvar}
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>

      {/* Aviso de alteração de status */}
      <CustomModal
        isOpen={openAviso}
        title="Atenção!"
        message="Alterar o status dessa categoria afetará todos os produtos vinculados."
        type="warning"
        onClose={() => setOpenAviso(false)}
        duration={10000}
        cancelText="Fechar"
      />

      {/* Feedback */}
      <CustomModal
        isOpen={openFeedback}
        title={titulo}
        message={mensagem}
        onClose={() => setOpenFeedback(false)}
        duration={5000}
        type={tipoMsg}
        cancelText="Fechar"
      />
    </div>
  );
}

export default EditCategoriaModal;
