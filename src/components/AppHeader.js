import React from "react";
import styled from 'styled-components';
import AppTitleContainer from "../styles/AppTitleContainer";

export const AppHeader = () => (
  <AppHeaderContainer>
    <img
      className="responsive-img"
      src={require("../images/iconeFamilyMoneyTracker.png")}
      alt="Ícone do Family Money Tracker"
    />
    <AppTitleContainer>Family Money Tracker</AppTitleContainer>
  </AppHeaderContainer>
);

const AppHeaderContainer = styled.div`
text-align: center;
`
