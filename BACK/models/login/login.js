import { Funcionario } from "../../database/models/index.js";
import bcrypt from "bcryptjs";


export async function login(objetoLogin) {
  const { email, senha } = objetoLogin;

  console.log("teste chegou no login model back", email, senha);

  try {
    const emailLower = email.toLowerCase();

    const usuario = await Funcionario.findOne({
      where: { email: emailLower },
      attributes: ["id", "nome", "email", "senha", "tipo"],
    });

    if (!usuario) {
      return null;
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return null;
    }

    const usuarioLimpo = usuario.get({ plain: true });

    return {
      id: usuarioLimpo.id,
      nome: usuarioLimpo.nome,
      email: usuarioLimpo.email,
      tipo: usuarioLimpo.tipo,
    };
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}

