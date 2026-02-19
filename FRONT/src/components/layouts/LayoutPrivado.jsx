import { Outlet } from "react-router-dom";
import Navbar from "./NavBar.jsx";
import "./styles/layout.css";

function LayoutPrivado() {
  return (
    <div className="layout">
      <Navbar />
      <div className="conteudo">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutPrivado;
