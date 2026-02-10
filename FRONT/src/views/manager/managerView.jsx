import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/manager.css";
import Menu from "../components/layouts/Menu";
import Table from "../components/layouts/Tables";
import Categorias from "../catalog/categories/Categorias.jsx";
import { getCurrentUser } from "../../services/authService";
import { isElectron } from "../../services/api";

function ManagerView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const titulo = document.getElementById("titulo");
    if (titulo) titulo.innerHTML = "Gerente!";

    (async () => {
      if (!isElectron) return;
      const u = await getCurrentUser();
      if (!u) {
        navigate("/", { replace: true });
        return;
      }
      setUsuario(u);
    })();
  }, [navigate]);

  const tela = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");

    if (tab === "Categorias") return "Categorias";
    if (tab === "Cadastros") return "Cadastros";
    return "Mesas";
  }, [location.search]);

  const setTela = useCallback(
    (novaTela) => {
      const params = new URLSearchParams(location.search);

      if (novaTela === "Categorias") params.set("tab", "Categorias");
      else if (novaTela === "Cadastros") params.set("tab", "Cadastros");
      else params.set("tab", "Mesas");

      navigate(`/manager?${params.toString()}`);
    },
    [location.search, navigate],
  );

  // permissões pelo tipo do usuário
  const tipoLower = String(usuario?.tipo || "").toLowerCase();
  const canManage = tipoLower.includes("gerente") || tipoLower.includes("adm") || tipoLower.includes("administrador");

  return (
    
    <div className="container">

      <Menu
        nomeFuncionario={usuario?.nome || ""}
        TipoFuncionario={usuario?.tipo || ""}
        setTela={setTela}
        showMesas
        showProdutos
        showCadastros
      />

      <main className="conteudo">
        {tela === "Mesas" && <Table canManageMesas={canManage} />}

        {tela === "Categorias" && (
          <Categorias canManageCatalog={canManage} basePath="/manager" />
        )}
      </main>
    </div>
  );
}

export default ManagerView;
