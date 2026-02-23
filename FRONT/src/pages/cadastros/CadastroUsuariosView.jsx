import React, { useEffect, useState } from "react";
import './style/cadastroUsuarios.css';
import  CadastroUsuarioModal  from "../../components/modal/cadastros/cadastroUsuario.jsx";
import EditarUsuarioModal from "../../components/modal/cadastros/editarUsuario.jsx";
import DeleteUsuarioModal from "../../components/modal/cadastros/deleteUsuario.jsx";





export default function CadastroUsuariosView() {


  const [openModal, setOpenModal] = useState(false);

  const [openModalEdit, setOpenEdit] = useState(false);
  const[ openModalDelete, setOpenDelete] = useState(false);


    const [formulario, setFormulario] = useState({
      nome: "",
      cpf: "",
      email: "",
      tipo: ""
    });

    const [usuarios, setUsuarios] = useState([]);
      useEffect(() => {
        async function carregarFuncionarios() {
          const dados = await window.api.funcionario.listarFuncionarios();
          setUsuarios(dados);
        }

        carregarFuncionarios();
      }, []);

      console.log("o cadastro funcionarios pegou: ", usuarios); 


      function cadastrarFuncionario() {
          setOpenModal(true);

      }
      function editarFuncionario(user){
        console.log("id recebido na função editar:", user.dataValues.id); 

        setFormulario({
          id: user.dataValues.id,
          nome: user.dataValues.nome,
          cpf: user.dataValues.cpf,
          email: user.dataValues.email,
          tipo: user.dataValues.tipo
        });
        console.log("id passado ao formulario", formulario.id);
        setOpenEdit(true);
      }


      function deletarFuncionario(user){
        
        setFormulario({
          id: user.dataValues.id,
          nome: user.dataValues.nome,
          cpf: user.dataValues.cpf,
          email: user.dataValues.email,
          tipo: user.dataValues.tipo,
        });
        
        setOpenDelete(true);

      }





  return (
    <div className="container-cadastros">
      <div className="top">
        <h2>Cadastro Funcionario</h2>
      </div>
      <hr />

      <div className="divbnt">
        <label>Cadastre um novo Funcionarios</label>
        <button onClick={cadastrarFuncionario}>Novo(a) Funcionario(a)</button>
      </div>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((user) => (
            <tr key={user.dataValues.id}>
              <td>{user.dataValues.id}</td>
              <td>{user.dataValues.nome}</td>
              <td>{user.dataValues.tipo}</td>
              <td>{user.dataValues.email}</td>
              <td>
                <p onClick={() => editarFuncionario(user)} className="editar-icon">✏️</p> <br />
                <p onClick={() => deletarFuncionario(user)} className="delete-icon">❌</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
