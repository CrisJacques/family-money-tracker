import React from "react";

import "../styles/spinnerLogin.css";

/**
 * Constrói a máscara de carregamento da tela de login
 * @param {String} height -  Altura que a máscara de carregamento deve ter (exemplo: 100vh)
 * @returns Máscara de carregamento que é exibida quando usuário solicita o login
 */
const LoadingLoginMask = ({ height }) => (
  <div className="spinner-container" style={{ height: `${height}` }}>
    <div className="loading-spinner"></div>
  </div>
);

export default LoadingLoginMask;
