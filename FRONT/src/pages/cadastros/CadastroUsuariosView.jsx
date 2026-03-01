import React, { useEffect, useState } from "react";
import "./style/cadastroUsuarios.css";
import CadastroUsuarioModal from "../../components/modal/cadastros/cadastroUsuario.jsx";
import EditarUsuarioModal from "../../components/modal/cadastros/editarUsuario.jsx";
import DeleteUsuarioModal from "../../components/modal/cadastros/deleteUsuario.jsx";

export default function CadastroUsuariosView() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenEdit] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState({
    id: "",
    nome: "",
    cpf: "",
    email: "",
    tipo: "",
  });

  useEffect(() => {
    async function carregarFuncionarios() {
      try {
        const dados = await window.api.funcionario.listarFuncionarios();
        setUsuarios(Array.isArray(dados) ? dados : []);
      } catch (err) {
        console.error("Erro ao carregar funcionários:", err);
        setUsuarios([]);
      }
    }

    carregarFuncionarios();
  }, []);

  function cadastrarFuncionario() {
    setOpenModal(true);
  }

  function editarFuncionario(user) {
    setFormulario({
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      tipo: user.tipo,
    });
    setOpenEdit(true);
  }

  function deletarFuncionario(user) {
    setFormulario({
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      tipo: user.tipo,
    });
    setOpenDelete(true);
  }

  return (
    <div className="cadastro-usuarios-container">
      <div className="cadastro-usuarios-top">
        <h2>Cadastro Funcionário</h2>
      </div>

      <div className="cadastro-usuarios-actions">
        <label>Cadastre um novo Funcionário</label>
        <button onClick={cadastrarFuncionario}>Novo(a) Funcionário(a)</button>
      </div>

      <div className="cadastro-usuarios-table-wrapper">
        <table className="cadastro-usuarios-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.tipo}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    onClick={() => editarFuncionario(user)}
                    className="cadastro-usuarios-edit"
                  >
                    ✏️
                  </span>
                  <span
                    onClick={() => deletarFuncionario(user)}
                    className="cadastro-usuarios-delete"
                  >
                    ❌
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditarUsuarioModal
        isOpen={openModalEdit}
        onClose={() => setOpenEdit(false)}
        funcionario={formulario}
      />

      <CadastroUsuarioModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

      <DeleteUsuarioModal
        isOpen={openModalDelete}
        onClose={() => setOpenDelete(false)}
        funcionario={formulario}
      />
    </div>
  );
}
