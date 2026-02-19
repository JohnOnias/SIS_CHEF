import { createHashRouter, Navigate } from "react-router-dom";
// views
import LoginView from "../pages/login/loginView.jsx";
import CadastroUsuariosView from "../pages/cadastros/CadastroUsuariosView.jsx";
import LayoutPrivado from "../components/layouts/LayoutPrivado.jsx";
import ErrorView from "../pages/404/ErrorView.jsx";
import RotaProtegida from "./RotaProtegida.jsx";
import HomeView from "../pages/home/HomeView.jsx";
import HistoricoView from "../pages/historico/HistoricoView.jsx";
import CadastrosView from "../pages/cadastros/CadastrosView.jsx"; 
import ProdutosView from "../pages/produtos/ProdutosView.jsx"
import MesasView from "../pages/mesas/MesasView.jsx";


const router = createHashRouter([
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "/404",
    element: <ErrorView/>

  },
  {
    element: (
      <RotaProtegida>
        <LayoutPrivado />
      </RotaProtegida>
    ),
    children: [
      {
        path: "cadastro-usuarios",
        element: <CadastroUsuariosView />,
      },
      {
        path: "home",
        element: <HomeView/>,
      },
      { path:"historico",
        element: <HistoricoView/>
      },
      {
        path:"cadastros",
        element:<CadastrosView/>
      },
      {
        path:"produtos",
        element: <ProdutosView/>
      },
      {
        path:"mesas",
        element: <MesasView/>
      }

    ],
  },
  {
    path: "*",
    element: <Navigate to= {<ErrorView/>} />,
  },
]);

export default router;
