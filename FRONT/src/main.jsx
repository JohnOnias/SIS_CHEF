import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";

import Routers from "./routers/routers.jsx";
import { RouterProvider } from "react-router-dom";

import { warnIfNotElectron } from "./services/apiCheck";
warnIfNotElectron();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Routers} />
  </StrictMode>
);
