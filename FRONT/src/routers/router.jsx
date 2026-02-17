import { createHashRouter, Navigate } from "react-router-dom";
// views
import LoginView from "../pages/login/loginView.jsx";
import CadastroUsuariosView from "../pages/cadastroUsuarios/CadastroUsuariosView.jsx";
import LayoutPrivado from "../components/layouts/LayoutPrivado.jsx";
import ErrorView from "../pages/404/ErrorView.jsx";
import RotaProtegida from "./RotaProtegida.jsx";
import Home from "../pages/home/Home.jsx";
import Historico from "../pages/historico/Historico.jsx";


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
        element: <Home/>,
      },
      { path:"historico",
        element: <Historico/>
      }

    ],
  },
  {
    path: "*",
    element: <Navigate to= {<ErrorView/>} />,
  },
]);

export default router;
