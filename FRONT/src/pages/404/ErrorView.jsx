import React from "react";
import imgError from "../../assets/others/404.png"
import "./style/erro404.css"


export default function ErrorView() {



  return (
      <div className="div">
      <img className="erro404" src={imgError} alt="erro 404 imagem" />
      </div>
  );
}
