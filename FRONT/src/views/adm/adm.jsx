import React, { useMemo, useState } from "react";
import "./styles/adm.css";

import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  ensureUsersSeed,
} from "../../services/usersStorage";

import AdmSidebar from "./components/AdmSidebar";
import RoleTable from "./components/RoleTable";
import UserModal from "./components/UserModal";

import { isValidEmail, isValidCPF, onlyDigits, formatCPF } from "./utils/cpfEmail";

function AdmView() {
  const titulo = document.getElementById("titulo");
  if (titulo) titulo.innerHTML = "Administrador!";

  const [tela, setTela] = useState("Cadastros");

  // modal
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit
  const [editId, setEditId] = useState(null);

  // form
  const [role, setRole] = useState("waiter"); // waiter | manager
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  // erros (pra mostrar feedback)
  const [errors, setErrors] = useState({});

  const [refresh, setRefresh] = useState(0);

  const users = useMemo(() => {
    ensureUsersSeed();
    return getUsers();
  }, [refresh]);

  const gerentes = users.filter((u) => u.role === "manager");
  const garcons = users.filter((u) => u.role === "waiter");

  const limparForm = () => {
    setRole("waiter");
    setNome("");
    setCpf("");
    setEmail("");
    setSenha("");
    setConfirmSenha("");
    setErrors({});
  };

  const abrirCadastro = () => {
    setMode("create");
    setEditId(null);
    limparForm();
    setOpen(true);
  };

  const abrirEdicao = (u) => {
    setMode("edit");
    setEditId(u.id);
    setRole(u.role);
    setNome(u.nome || "");
    setCpf(u.cpf ? formatCPF(u.cpf) : "");
    setEmail(u.email || "");
    setSenha(u.senha || "");
    setConfirmSenha(u.senha || "");
    setErrors({});
    setOpen(true);
  };

  const validar = () => {
    const e = {};
    const nomeV = nome.trim();
    const emailV = email.trim();
    const cpfV = cpf.trim();

    if (!nomeV) e.nome = "Informe o nome.";

    // email: obrigatório
    if (!emailV) e.email = "Informe o e-mail.";
    else if (!isValidEmail(emailV)) e.email = "E-mail inválido.";

    // cpf: obrigatório e com dígito verificador
    if (!cpfV) e.cpf = "Informe o CPF.";
    else if (!isValidCPF(cpfV)) e.cpf = "CPF inválido.";

    // senha
    if (!senha) e.senha = "Informe a senha.";
    else if (String(senha).length < 4) e.senha = "Senha deve ter ao menos 4 caracteres.";

    if (senha !== confirmSenha) e.confirmSenha = "Senha e confirmação não conferem.";

    // (opcional) evitar email duplicado
    const emailLower = emailV.toLowerCase();
    const emailDuplicado = users.some((u) => {
      if (mode === "edit" && u.id === editId) return false;
      return String(u.email || "").toLowerCase() === emailLower;
    });
    if (emailDuplicado) e.email = "Já existe um usuário com este e-mail.";

    // (opcional) evitar cpf duplicado
    const cpfDigits = onlyDigits(cpfV);
    const cpfDuplicado = users.some((u) => {
      if (mode === "edit" && u.id === editId) return false;
      return onlyDigits(u.cpf || "") === cpfDigits;
    });
    if (cpfDuplicado) e.cpf = "Já existe um usuário com este CPF.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const salvar = () => {
    if (!validar()) return;

    const payload = {
      role,
      nome: nome.trim(),
      cpf: formatCPF(cpf), // salva com máscara
      email: email.trim().toLowerCase(),
      senha,
    };

    if (mode === "create") {
      addUser(payload);
      setOpen(false);
      setRefresh((r) => r + 1);
      return;
    }

    updateUser(editId, payload);
    setOpen(false);
    setRefresh((r) => r + 1);
  };

  const excluir = (id) => {
    const ok = window.confirm("Deseja excluir este funcionário?");
    if (!ok) return;
    deleteUser(id);
    setRefresh((r) => r + 1);
  };

  return (
    <div className="container">
      {/* Menu lateral */}
      <AdmSidebar setTela={setTela} />

      {/* Conteúdo */}
      <main className="conteudo">
        {tela === "Cadastros" && (
          <div className="adm-page tela">
            <div className="adm-header">
              <div className="adm-title">
                <h1>Início</h1>
                <p>Gerencie funcionários (Gerente e Garçons)</p>
              </div>

              {/* ✅ APENAS 1 BOTÃO */}
              <button className="bntPadraoGreen" onClick={abrirCadastro}>
                Cadastrar
              </button>
            </div>

            <RoleTable
              title="Gerente"
              users={gerentes}
              emptyText="Nenhum gerente cadastrado."
              onEdit={abrirEdicao}
              onDelete={excluir}
            />

            <RoleTable
              title="Garçons"
              users={garcons}
              emptyText="Nenhum garçom cadastrado."
              onEdit={abrirEdicao}
              onDelete={excluir}
              style={{ marginTop: 14 }}
            />

            <UserModal
              open={open}
              onClose={() => setOpen(false)}
              mode={mode}
              role={role}
              setRole={setRole}
              nome={nome}
              setNome={setNome}
              cpf={cpf}
              setCpf={setCpf}
              email={email}
              setEmail={setEmail}
              senha={senha}
              setSenha={setSenha}
              confirmSenha={confirmSenha}
              setConfirmSenha={setConfirmSenha}
              errors={errors}
              onSave={salvar}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default AdmView;
