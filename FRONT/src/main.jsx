import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Routers from "./routers/routers.jsx";
import { RouterProvider } from "react-router-dom";




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Routers} />
  </StrictMode>
);
