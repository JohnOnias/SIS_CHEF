import { Funcionario } from "../../database/models/index.js";

// Buscar funcionários pelo tipo
export async function getFuncionario(tipoFuncionario) {
  try {
    const funcionarios = await Funcionario.findAll({
      where: { tipo: tipoFuncionario },
      attributes: ["id", "nome", "email"], // só retorna id,  nome e email para evitar expor dados sensíveis como senha
    });

    return funcionarios; // retorna array de funcionários
  } catch (err) {
    console.error(`Erro ao pesquisar ${tipoFuncionario}:`, err);
    throw err;
  }
}

export async function listarFuncionarios (){
  try{
     const funcionarios = await Funcionario.findAll({
      attributes: ["id", "nome", "tipo", "email"]
     })
     return funcionarios; 
  }
  catch(err){
    console.log("erro: ", err);
    throw err; 
  }
}
