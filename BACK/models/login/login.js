import { Funcionario } from "../../database/models/index.js";
import bcrypt from "bcryptjs";


export async function login(email, senha) {
  
  console.log("teste chegou no login model back", email, senha);

  try {
    // 1. Busca o usuário único pelo email
    const usuario = await Funcionario.findOne({
      where: { email },
      // É crucial trazer o campo "tipo" do banco de dados agora
      attributes: ["id", "nome", "email", "senha", "tipo"],
    });

    // 2. Se não achou ninguém, retorna null
    if (!usuario) {
      return null;
    }

    // 3. Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return null;
    }

    // 4. Prepara o objeto de retorno
    // O .get({ plain: true }) limpa os metadados do Sequelize
    const usuarioLimpo = usuario.get({ plain: true });

    return {
      id: usuarioLimpo.id,
      nome: usuarioLimpo.nome,
      email: usuarioLimpo.email,
      // Aqui ele pega o tipo (ex: 'adm', 'funcionario') direto do banco
      tipo: usuarioLimpo.tipo || "funcionario",
    };
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
  
}
