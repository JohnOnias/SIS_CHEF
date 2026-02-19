import React, { useEffect, useState } from "react";
import './style/cadastroUsuarios.css';

export default function CadastroUsuariosView() {
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
    // aqui abre o modal depois
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
