import React, { useMemo, useState } from "react";
import "./styles/adm.css";

import CadastroIcon from "../../assets/menu/cadastro.png";

import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  ensureUsersSeed,
} from "../../services/usersStorage";

// --------- validações ----------
function isValidEmail(email) {
  const e = String(email || "").trim().toLowerCase();
  // simples e eficaz para front (não tenta cobrir todos os casos do RFC)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(e);
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function isValidCPF(cpf) {
  const c = onlyDigits(cpf);

  if (c.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(c)) return false; // 000.. 111.. etc

  // cálculo dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(c[i]) * (10 - i);
  let d1 = (sum * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== Number(c[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(c[i]) * (11 - i);
  let d2 = (sum * 10) % 11;
  if (d2 === 10) d2 = 0;
  if (d2 !== Number(c[10])) return false;

  return true;
}

function formatCPF(value) {
  const c = onlyDigits(value).slice(0, 11);
  if (c.length <= 3) return c;
  if (c.length <= 6) return `${c.slice(0, 3)}.${c.slice(3)}`;
  if (c.length <= 9) return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6)}`;
  return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9)}`;
}
// -------------------------------

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

  // ícones (iguais ao que eu já tinha)
  const PencilIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l9.06-9.06.92.92L5.92 20.08zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
    </svg>
  );

  const TrashIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z" />
    </svg>
  );

  return (
    <div className="container">
      {/* Menu lateral */}
      <aside className="sidebar">
        <div className="perfil">
          <div className="icone"></div>

          <p style={{ fontSize: 18, marginTop: 6 }}>
            <strong>Administrador</strong>
            <br />
            Francisco
          </p>
        </div>

        <nav>
          <ul>
            <li className="menu">
              <img src={CadastroIcon} alt="icone cadastros" />
              <a onClick={() => setTela("Cadastros")}>Cadastros</a>
            </li>
          </ul>
        </nav>
      </aside>

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

            {/* GERENTE */}
            <div className="role-section">
              <div className="role-title">Gerente</div>
              <table className="role-table">
                <tbody>
                  {gerentes.map((u) => (
                    <tr key={u.id}>
                      <td>{u.nome}</td>
                      <td>
                        <div className="actions">
                          <button
                            className="icon-btn icon-edit"
                            title="Editar"
                            onClick={() => abrirEdicao(u)}
                          >
                            <PencilIcon />
                          </button>
                          <button
                            className="icon-btn icon-del"
                            title="Excluir"
                            onClick={() => excluir(u.id)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {gerentes.length === 0 && (
                    <tr>
                      <td style={{ color: "#667085" }}>Nenhum gerente cadastrado.</td>
                      <td />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* GARÇONS */}
            <div className="role-section" style={{ marginTop: 14 }}>
              <div className="role-title">Garçons</div>
              <table className="role-table">
                <tbody>
                  {garcons.map((u) => (
                    <tr key={u.id}>
                      <td>{u.nome}</td>
                      <td>
                        <div className="actions">
                          <button
                            className="icon-btn icon-edit"
                            title="Editar"
                            onClick={() => abrirEdicao(u)}
                          >
                            <PencilIcon />
                          </button>
                          <button
                            className="icon-btn icon-del"
                            title="Excluir"
                            onClick={() => excluir(u.id)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {garcons.length === 0 && (
                    <tr>
                      <td style={{ color: "#667085" }}>Nenhum garçom cadastrado.</td>
                      <td />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* MODAL */}
            {open && (
              <div className="adm-modal-overlay" onClick={() => setOpen(false)}>
                <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
                  <h2>Cadastro</h2>

                  <div className="adm-form">
                    <select
                      className="adm-input"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="manager">Gerente</option>
                      <option value="waiter">Garçom</option>
                    </select>

                    <div style={{ display: "grid", gap: 6 }}>
                      <input
                        className="adm-input"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                      {errors.nome && (
                        <small style={{ color: "#e03131", fontWeight: 700 }}>
                          {errors.nome}
                        </small>
                      )}
                    </div>

                    <div style={{ display: "grid", gap: 6 }}>
                      <input
                        className="adm-input"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(formatCPF(e.target.value))}
                      />
                      {errors.cpf && (
                        <small style={{ color: "#e03131", fontWeight: 700 }}>
                          {errors.cpf}
                        </small>
                      )}
                    </div>

                    <div style={{ display: "grid", gap: 6 }}>
                      <input
                        className="adm-input"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <small style={{ color: "#e03131", fontWeight: 700 }}>
                          {errors.email}
                        </small>
                      )}
                    </div>

                    <div style={{ display: "grid", gap: 6 }}>
                      <input
                        className="adm-input"
                        placeholder="Senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                      />
                      {errors.senha && (
                        <small style={{ color: "#e03131", fontWeight: 700 }}>
                          {errors.senha}
                        </small>
                      )}
                    </div>

                    <div style={{ display: "grid", gap: 6 }}>
                      <input
                        className="adm-input"
                        placeholder="Confirmação da Senha"
                        type="password"
                        value={confirmSenha}
                        onChange={(e) => setConfirmSenha(e.target.value)}
                      />
                      {errors.confirmSenha && (
                        <small style={{ color: "#e03131", fontWeight: 700 }}>
                          {errors.confirmSenha}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="adm-actions">
                    <button className="adm-submit" onClick={salvar}>
                      {mode === "create" ? "Cadastrar" : "Salvar"}
                    </button>
                  </div>

                  <button className="adm-cancel" onClick={() => setOpen(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdmView;
