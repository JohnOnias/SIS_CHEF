import { Administrador, Funcionario } from "../../database/models/index.js"; 
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

export async function login(email, senha) {
  try {
    // Busca primeiro no Administrador
    const administrador = await Administrador.findOne({
      where: { email },
      attributes: ["id", "nome", "email", "senha"],
    });

    let usuario = administrador;

    // Se não encontrou no Administrador, busca no Funcionario
    if (!usuario) {
      usuario = await Funcionario.findOne({
        where: { email },
        attributes: ["id", "nome", "email", "senha", "tipo"],
      });

      if (usuario) {
        usuario.tipo = usuario.tipo || "funcionario"; // Define tipo padrão se não existir
      }
    } else {
      usuario.tipo = "adm"; // Define tipo para administrador
    }

    if (!usuario) {
      return null; // Usuário não encontrado
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return null; // Senha incorreta
    }

    // Retorna objeto com dados do usuário (sem a senha)
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
    };
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}
