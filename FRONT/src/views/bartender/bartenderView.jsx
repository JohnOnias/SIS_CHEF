import React, { useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../manager/styles/manager.css";
import Menu from "../components/layouts/Menu";
import Table from "../components/layouts/Tables";
import Categorias from "../catalog/categories/Categorias";

function BartenderView() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user_role", "waiter");
    const titulo = document.getElementById("titulo");
    if (titulo) titulo.innerHTML = "Garçom!";
  }, []);

  // ✅ Tela vem da URL (sem setState em effect)
  const tela = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");

    if (tab === "Categorias") return "Categorias";
    return "Mesas";
  }, [location.search]);

  // ✅ Menu “setTela” agora navega para ?tab=...
  const setTela = useCallback(
    (novaTela) => {
      const params = new URLSearchParams(location.search);

      if (novaTela === "Categorias") params.set("tab", "Categorias");
      else params.set("tab", "Mesas");

      navigate(`/bartender?${params.toString()}`);
    },
    [location.search, navigate]
  );

  const getFuncionario = {
    nome: "João",
    tipo: "Garçom",
  };

  return (
    <div className="container">
      <Menu
        nomeFuncionario={getFuncionario.nome}
        TipoFuncionario={getFuncionario.tipo}
        setTela={setTela}
        showMesas
        showProdutos
        showCadastros={false}
      />

      <main className="conteudo">
        {tela === "Mesas" && <Table canManageMesas={false} />}

        {tela === "Categorias" && (
          <Categorias canManageCatalog={false} basePath="/bartender" />
        )}
      </main>
    </div>
  );
}

export default BartenderView;
