import React from "react";

import "../styles/spinner.css";

/**
 * Constrói uma máscara de carregamento para informar ao usuário que algum processamento está em andamento
 * @returns Máscara de carregamento com um spinner animado que fica por cima de formulários enquanto algum processamento estiver em andamento no backend
 */
const LoadingMask = () => (
  <div className="spinner-container">
    <div className="loading-spinner"></div>
  </div>
);

export default LoadingMask;
