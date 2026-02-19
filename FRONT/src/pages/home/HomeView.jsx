import React from 'react'

export default function Home() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    let nome = usuario?.nome || "";
    let resultado = nome.charAt(0).toUpperCase() + nome.slice(1);

    console.log("o Home pegou os dados:", usuario);

  return (

   
        
        <h3>Bem-Vindo(a) {resultado}, Clique em alguma area que gostaria de acessar!</h3>
   
   
  )
}
