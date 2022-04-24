import React from "react";
import LoginHeaderContainer from "../styles/LoginHeaderContainer";
import AppTitleContainer from "../styles/AppTitleContainer";

/* Componente que tem a responsabilidade de ser o header da tela de login da aplicação */
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
