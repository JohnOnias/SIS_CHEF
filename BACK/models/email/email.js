const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { Funcionario } = require("../../database/models");

// Transporter configurado uma única vez
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =============================
// GERAR E ENVIAR TOKEN
// =============================
async function gerarToken(email) {
  const user = await Funcionario.findOne({ where: { email } });

  if (!user) {
    // Não revela se o email existe
    return {
      sucesso: true,
      mensagem: "Se o email existir, o token foi enviado.",
    };
  }

  const token = crypto.randomBytes(4).toString("hex"); // 8 caracteres
  const expiracao = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

  user.resetToken = token;
  user.resetTokenExpires = expiracao;
  await user.save();

  await transporter.sendMail({
    from: `"Sistema" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Recuperação de Senha",
    html: `
      <h2>Recuperação de senha</h2>
      <p>Seu token:</p>
      <strong>${token}</strong>
      <p>Ele expira em 1 hora.</p>
    `,
  });

  return { sucesso: true, mensagem: "Token enviado com sucesso." };
}

// =============================
// VALIDAR TOKEN
// =============================
async function validarToken(token) {
  const user = await Funcionario.findOne({
    where: {
      resetToken: token,
      resetTokenExpires: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!user) {
    return { valido: false, mensagem: "Token inválido ou expirado." };
  }

  return { valido: true };
}

// =============================
// RESETAR SENHA
// =============================
const resetarSenha = async (token, novaSenha) => {
  const user = await Funcionario.findOne({
    where: {
      resetToken: token,
      resetTokenExpires: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!user) {
    return { sucesso: false, mensagem: "Token inválido ou expirado." };
  }

  const hash = await bcrypt.hash(novaSenha, 10);
  user.senha = hash;
  user.resetToken = null;
  user.resetTokenExpires = null;

  await user.save();

  return { sucesso: true, mensagem: "Senha redefinida com sucesso." };
};

module.exports = {
  gerarToken,
  validarToken,
  resetarSenha,
};
