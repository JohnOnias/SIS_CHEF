import crypto from "crypto";
import nodemailer from "nodemailer";
import { Administrador, Funcionario } from "../../database/models/index.js";

// --- Gerar token e expiração ---
export function gerarToken() {
  return crypto.randomBytes(32).toString("hex"); // 64 caracteres
}

export function calcularExpiracao(minutos = 15) {
  return Date.now() + minutos * 60 * 1000;
}

// --- Configuração do transporte de email ---
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ifce.electron.testes@gmail.com",
    pass: "gnfedrphwmaaewiv",
  },
});

// --- Salvar token no Administrador ou Funcionario ---
export async function salvarToken(email) {
  const token = gerarToken();
  const expiracao = calcularExpiracao(15);

  // Tenta atualizar no Administrador
  let usuario = await Administrador.findOne({ where: { email } });

  if (usuario) {
    await usuario.update({ reset_token: token, reset_expires: expiracao });
    return { tipo: "Administrador", token, expiracao };
  }

  // Se não encontrou, tenta Funcionario
  usuario = await Funcionario.findOne({ where: { email } });
  if (usuario) {
    await usuario.update({ reset_token: token, reset_expires: expiracao });
    return { tipo: "Funcionario", token, expiracao };
  }

  // Nenhum usuário encontrado
  return null;
}

// --- Enviar token por email ---
export async function enviarTokenEmail(email, token) {
  const mailOptions = {
    from: '"App Recuperação de Senha" <ifce.electron.testes@gmail.com>',
    to: email,
    subject: "Recuperação de Senha",
    html: `
      <p>Você solicitou a redefinição de senha.</p>
      <p>Use este token para redefinir sua senha:</p>
      <h3>${token}</h3>
      <p>O token expira em 15 minutos.</p>
    `,
  };
  return transporter.sendMail(mailOptions);
}

// --- Validar token ---
export async function validarToken(token) {
  // Busca no Administrador
  let usuario = await Administrador.findOne({
    where: { reset_token: token },
    attributes: ["id", "reset_expires"],
  });

  if (usuario) {
    if (usuario.reset_expires < Date.now()) return null;
    return { tipo: "Administrador", id: usuario.id };
  }

  // Busca no Funcionario
  usuario = await Funcionario.findOne({
    where: { reset_token: token },
    attributes: ["id", "reset_expires"],
  });

  if (usuario) {
    if (usuario.reset_expires < Date.now()) return null;
    return { tipo: "Funcionario", id: usuario.id };
  }

  return null; // token não encontrado
}
