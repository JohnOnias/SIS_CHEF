import React from 'react'


export default function CadastroUsuariosView() {
  
  function cadastrarFuncionario(){
    // settar o open modal aqui importando o useState

  }


 
  return (
    <div className="container-cadastros">
      <div className="top">
        <h2>Cadastro Funcionario</h2>
      </div>
      <hr />

      <div className="divbnt">
        <label htmlFor="">Cadastre um novo Funcionarios</label>
        <button
          onClick={() => cadastrarFuncionario()}
        >Novo(a) Funcionario(a)</button>
      </div>

      <hr />
    </div>
  );
}
