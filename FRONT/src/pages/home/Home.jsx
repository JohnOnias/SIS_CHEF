import React from 'react'

export default function Home() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    console.log("o Home pegou os dados:", usuario);

  return (

    <div>
        
        <h3>Bem Vindo(a), {usuario.nome}, Clique em alguma area que gostaria de acessar!</h3>
   
   
    </div>
  )
}
