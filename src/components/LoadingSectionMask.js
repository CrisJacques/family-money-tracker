import React from "react";

import "../styles/spinnerSection.css";

/**
 * Constrói uma máscara de carregamento para informar ao usuário que algum processamento está em andamento
 * @returns Máscara de carregamento com um spinner animado que fica por cima de seções de páginas enquanto algum processamento estiver em andamento no backend
 */
const LoadingSectionMask = () => (
  <div className="spinner-container">
    <div className="loading-spinner"></div>
  </div>
);

export default LoadingSectionMask;
