import React, { useMemo, useState, useEffect } from "react";
import "./styles/adm.css";

import { getUsers, addUser, updateUser, deleteUser } from "../../services/usersStorage";

import AdmSidebar from "./components/AdmSidebar";
import RoleTable from "./components/RoleTable";
import UserModal from "./components/UserModal";

import { isValidEmail, isValidCPF, onlyDigits, formatCPF } from "./utils/cpfEmail";

function AdmView() {
  
  
    // aqui carrega os dados inicias do usuário, gerentes e garçons
       const fetchData = async () => {
        const currentUser =  await window.api.user.getCurrentUser();
        const gerentes =  await window.api.funcionario.getFuncionario("Gerente");
        const garcons =  await window.api.funcionario.getFuncionario("Garçom");
        return { currentUser, gerentes, garcons };
       }
       const [currentUser, setCurrentUser] = useState(null);
       const [gerentes, setGerentes] = useState([]);
       const [garcons, setGarcons] = useState([]);
       // aqui setta quando os dados forem carregados
       useEffect(() => {
         const load = async () => {
           const data = await fetchData();
           setCurrentUser(data.currentUser);
           setGerentes(data.gerentes);
           setGarcons(data.garcons);
           console.log("Dados carregados:", data);
         };

         load();
       }, []);
   




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

  // erros
  const [errors, setErrors] = useState({});
  const [refresh, setRefresh] = useState(0);

  const users = useMemo(() => getUsers(), [refresh]);

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

    // se veio do BACK, u.senha costuma ser boolean (true). Não mostra "true" no input.
    const senhaStr = typeof u.senha === "string" ? u.senha : "";
    setSenha(senhaStr);
    setConfirmSenha(senhaStr);

    setErrors({});
    setOpen(true);
  };

  const validar = () => {
    const e = {};
    const nomeV = nome.trim();
    const emailV = email.trim();
    const cpfV = cpf.trim();

    if (!nomeV) e.nome = "Informe o nome.";

    // email
    if (!emailV) e.email = "Informe o e-mail.";
    else if (!isValidEmail(emailV)) e.email = "E-mail inválido.";

    // cpf
    if (!cpfV) e.cpf = "Informe o CPF.";
    else if (!isValidCPF(cpfV)) e.cpf = "CPF inválido.";

    // senha
    if (!senha) e.senha = "Informe a senha.";
    else if (String(senha).length < 4)
      e.senha = "Senha deve ter ao menos 4 caracteres.";

    if (senha !== confirmSenha)
      e.confirmSenha = "Senha e confirmação não conferem.";

    // evitar email duplicado (na base local)
    const emailLower = emailV.toLowerCase();
    const emailDuplicado = users.some((u) => {
      if (mode === "edit" && u.id === editId) return false;
      return String(u.email || "").toLowerCase() === emailLower;
    });
    if (emailDuplicado) e.email = "Já existe um usuário com este e-mail.";

    // evitar cpf duplicado (na base local)
    const cpfDigits = onlyDigits(cpfV);
    const cpfDuplicado = users.some((u) => {
      if (mode === "edit" && u.id === editId) return false;
      return onlyDigits(u.cpf || "") === cpfDigits;
    });
    if (cpfDuplicado) e.cpf = "Já existe um usuário com este CPF.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const salvar = async () => {
    if (!validar()) return;

    const payload = {
      role,
      nome: nome.trim(),
      cpf: formatCPF(cpf),
      email: email.trim().toLowerCase(),
      senha,
    };

    try {
      if (mode === "create") {
        // ✅ cadastra no BACK (async)
        await addUser(payload);

        setOpen(false);
        setRefresh((r) => r + 1);
        return;
      }

      // ⚠️ edição ainda é local (não existe API de editar funcionário no preload)
      updateUser(editId, payload);

      setOpen(false);
      setRefresh((r) => r + 1);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erro ao salvar funcionário");
    }
  };

  const excluir = (id) => {
    const ok = window.confirm("Deseja excluir este funcionário?");
    if (!ok) return;

    // ⚠️ exclusão local (não existe API no preload)
    deleteUser(id);
    setRefresh((r) => r + 1);
  };

  return (
    <div className="container">
      <AdmSidebar setTela={setTela} />

      <main className="conteudo">
        {tela === "Cadastros" && (
          <div className="adm-page tela">
            <div className="adm-header">
              <div className="adm-title">
                <h1>Início</h1>
                <p>Gerencie funcionários (Gerente e Garçons)</p>
              </div>

              <button className="bntPadraoGreen" onClick={abrirCadastro} type="button">
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
