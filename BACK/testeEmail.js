import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function testeEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Teste" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // envia pra você mesmo
      subject: "Teste SMTP Gmail",
      text: "Se chegou aqui, SMTP OK!",
    });
    console.log("Email enviado:", info);
  } catch (err) {
    console.error("Erro SMTP:", err);
  }
}

testeEmail();
