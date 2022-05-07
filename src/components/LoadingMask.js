import React from "react";

import "../styles/spinner.css"; 

/* Componente que tem a responsabilidade de ser a máscara de carregamento para informar ao usuário que algum processamento está em andamento */
const LoadingMask = () => (
  <div className="spinner-container">
    <div className="loading-spinner"></div>
  </div>
);

export default LoadingMask;
