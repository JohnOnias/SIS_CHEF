import { Funcionario } from "../../database/models/index.js";

// Verifica se já existe um CPF cadastrado
export async function verificarCpf(cpf) {
  try {
    const funcionario = await Funcionario.findOne({
      where: { cpf },
      attributes: ["nome"], // retorna apenas o nome
    });

    // Se encontrar, retorna o objeto, senão retorna null
    return funcionario ? funcionario : null;
  } catch (err) {
    console.error("Erro ao verificar CPF:", err);
    throw err;
  }
}
