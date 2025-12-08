import { Funcionario } from "../../database/models/index.js";

// Buscar funcionários pelo tipo
export async function getFuncionario(tipoFuncionario) {
  try {
    const funcionarios = await Funcionario.findAll({
      where: { tipo: tipoFuncionario },
      attributes: ["id", "nome"], // só retorna id e nome
    });

    return funcionarios; // retorna array de funcionários
  } catch (err) {
    console.error(`Erro ao pesquisar ${tipoFuncionario}:`, err);
    throw err;
  }
}
