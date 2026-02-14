import bcrypt from "bcryptjs";
import { Funcionario } from "../../database/models/index.js";
import { Op } from "sequelize";

const saltRounds = 16;

export async function cadastrarFuncionario(
  nome,
  cpf,
  email,
  tipoFuncionario,
  senha,
) {
  // Inicia uma transação para garantir consistência
  const transaction = await Funcionario.sequelize.transaction();

  try {
    // Validação: Verifica se já existe um gerente (se for cadastro de gerente)
    if (tipoFuncionario === "gerente") {
      const gerenteExistente = await Funcionario.findOne({
        where: { tipo: "gerente" },
        transaction,
      });

      if (gerenteExistente) {
        await transaction.rollback();
        return { success: false, error: "Já existe um gerente cadastrado." };
      }
    }

    // Validação: Verifica se CPF já está cadastrado
    if (cpf) {
      const cpfExistente = await Funcionario.findOne({
        where: { cpf },
        transaction,
      });

      if (cpfExistente) {
        await transaction.rollback();
        return { success: false, error: "CPF já cadastrado." };
      }
    }

    // Validação: Verifica se email já está cadastrado
    if (email) {
      const emailExistente = await Funcionario.findOne({
        where: { email },
        transaction,
      });

      if (emailExistente) {
        await transaction.rollback();
        return { success: false, error: "E-mail já cadastrado." };
      }
    }

    // Cria o hash da senha
    const hash = await bcrypt.hash(senha, saltRounds);

    // Cria o funcionário
    const funcionario = await Funcionario.create(
      {
        nome,
        cpf,
        email,
        tipo: tipoFuncionario,
        senha: hash,
      },
      { transaction },
    );

    // Confirma a transação
    await transaction.commit();

    return {
      success: true,
      data: {
        id: funcionario.id,
        nome: funcionario.nome,
        email: funcionario.email,
        tipo: funcionario.tipo,
        senha: true, // Indica que a senha foi armazenada com sucesso, mas não retorna o hash
      },
    };
  } catch (error) {
    // Reverte a transação em caso de erro
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.error("Erro ao cadastrar funcionário:", error);

    // Tratamento de erros específicos do Sequelize
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return { success: false, error: errors.join(", ") };
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return {
        success: false,
        error: "Dados duplicados. Verifique CPF ou email.",
      };
    }

    return { success: false, error: error.message };
  }
}

export async function getFuncionario(tipoFuncionario) {
  if (!tipoFuncionario) {
    return { success: false, error: "Tipo de funcionário é obrigatório." };
  }
  try {
    const funcionarios = await Funcionario.findAll({
      where: { tipo: tipoFuncionario },
      attributes: ["id", "nome", "email", "tipo"],
    });
    return funcionarios;
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    return { success: false, error: error.message };
  }
}
