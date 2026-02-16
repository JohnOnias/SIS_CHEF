import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/manager.css";
import Menu from "../components/layouts/Menu.jsx";



// pega o usuario
const getCurrentUser = async () => {
  const user = await window.api.user.getCurrentUser();
  return user;
};



function EmployeerView() {

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

// serve pra carregar os dados
useEffect(() => {
  const fetchUser = async () => {
    const user = await getCurrentUser();

    if (!user) {
      navigate("/");
      return;
    }

    setUsuario(user);
  };
  
  fetchUser();
}, [navigate]);



  
// seta pra lowercase o tipo
  const user = String(usuario?.tipo || "").toLowerCase();
  
  return (
  
    <div className="container">

      <Menu usuario={user}/>

   
    </div>
  );
}

export default EmployeerView;
