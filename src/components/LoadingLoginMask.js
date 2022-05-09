import React from "react";

import "../styles/spinnerLogin.css"; 

/* Componente que tem a responsabilidade de ser a máscara de carregamento da tela de login */
const LoadingLoginMask = ({height}) => (
  <div className="spinner-container" style={{"height": `${height}`}}>
    <div className="loading-spinner"></div>
  </div>
);

export default LoadingLoginMask;
