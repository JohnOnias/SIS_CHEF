import { Funcionario, Administrador } from "../../database/models/index.js";

// Verifica se um email já está cadastrado no Funcionario
export async function verificarEmailCadastrado(email) {
  try {
    const funcionario = await Funcionario.findOne({
      where: { email },
      attributes: ["nome"], // retorna apenas o nome
    });

    // Retorna null se não encontrar, ou o funcionário encontrado
    return funcionario ? funcionario : null;
  } catch (err) {
    console.error("Erro ao verificar e-mail:", err);
    throw err;
  }
}

// Verifica se um email existe no Administrador ou Funcionario (para reset de senha)
export async function verificarEmailReset(email) {
  try {
    const administrador = await Administrador.findOne({
      where: { email },
      attributes: ["email"],
    });

    if (administrador) {
      return [{ tipo: "Administrador", email: administrador.email }];
    }

    const funcionario = await Funcionario.findOne({
      where: { email },
      attributes: ["email"],
    });

    if (funcionario) {
      return [{ tipo: "Funcionario", email: funcionario.email }];
    }

    // Email não encontrado
    return [];
  } catch (err) {
    console.error("Erro ao consultar email:", err);
    throw err;
  }
}
