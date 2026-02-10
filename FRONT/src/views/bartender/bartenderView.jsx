import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../manager/styles/manager.css";
import Menu from "../components/layouts/Menu";
import Table from "../components/layouts/Tables";
import Categorias from "../catalog/categories/Categorias";
import { getCurrentUser } from "../../services/authService";
import { isElectron } from "../../services/api";

function BartenderView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const titulo = document.getElementById("titulo");
    if (titulo) titulo.innerHTML = "Garçom!";

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
    return "Mesas";
  }, [location.search]);

  const setTela = useCallback(
    (novaTela) => {
      const params = new URLSearchParams(location.search);

      if (novaTela === "Categorias") params.set("tab", "Categorias");
      else params.set("tab", "Mesas");

      navigate(`/bartender?${params.toString()}`);
    },
    [location.search, navigate]
  );

  // garçom não gerencia
  const canManage = false;

  return (
    <div className="container">
      <Menu
        nomeFuncionario={usuario?.nome || ""}
        TipoFuncionario={usuario?.tipo || ""}
        setTela={setTela}
        showMesas
        showProdutos
        showCadastros={false}
      />

      <main className="conteudo">
        {tela === "Mesas" && <Table canManageMesas={canManage} />}

        {tela === "Categorias" && (
          <Categorias canManageCatalog={canManage} basePath="/bartender" />
        )}
      </main>
    </div>
  );
}

export default BartenderView;
