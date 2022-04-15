import React from "react";
import LoginHeaderContainer from "../styles/LoginHeaderContainer";
import AppTitleContainer from "../styles/AppTitleContainer";

export const LoginHeader = () => (
  <LoginHeaderContainer>
    <img
      className="responsive-img"
      src={require("../images/iconeFamilyMoneyTracker.png")}
      alt="Ícone do Family Money Tracker"
    />
    <AppTitleContainer>Family Money Tracker</AppTitleContainer>
  </LoginHeaderContainer>
);

