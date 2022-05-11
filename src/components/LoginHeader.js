import React from "react";
import LoginHeaderContainer from "../styles/LoginHeaderContainer";
import AppTitleContainer from "../styles/AppTitleContainer";

/**
 * Constrói o cabeçalho da tela de login da aplicação
 * @returns Componente que exibe o ícone da aplicação e o título estilizado
 */
const LoginHeader = () => (
  <LoginHeaderContainer>
    <img
      className="responsive-img"
      src={require("../images/iconeFamilyMoneyTracker.png")}
      alt="Ícone do Family Money Tracker"
    />
    <AppTitleContainer>Family Money Tracker</AppTitleContainer>
  </LoginHeaderContainer>
);

export default LoginHeader;
