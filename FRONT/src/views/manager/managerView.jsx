import React, { useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/manager.css";
import Menu from "../components/layouts/Menu";
import Table from "../components/layouts/Tables";
import Categorias from "../components/modal/products/Categorias";

function ManagerView() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user_role", "manager");
    const titulo = document.getElementById("titulo");
    if (titulo) titulo.innerHTML = "Gerente!";
  }, []);

 
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
    [location.search, navigate]
  );

  const getFuncionario = {
    nome: "João",
    tipo: "Gerente",
  };

  return (
    <div className="container">
      <Menu
        nomeFuncionario={getFuncionario.nome}
        TipoFuncionario={getFuncionario.tipo}
        setTela={setTela}
        showMesas
        showProdutos
        showCadastros
      />

      <main className="conteudo">
        {tela === "Mesas" && <Table canManageMesas={true} />}

        {tela === "Categorias" && (
          <Categorias canManageCatalog={true} basePath="/manager" />
        )}
      </main>
    </div>
  );
}

export default ManagerView;
