import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";

// views
import LoginView from "./views/login/loginView";
import GerenteView from "./views/gerente/gerenteView";
import AdmView from "./views/adm/admView";

// IMPORTANDO HASH ROUTER
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "/gerente",
    element: <GerenteView />,
  },
  {
    path: "/adm",
    element: <AdmView />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
