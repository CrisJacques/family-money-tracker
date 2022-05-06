import React from "react";

import ActualMonthAndYear from "../components/ActualMonthAndYear";

import SectionTitleContainer from "../styles/SectionTitleContainer";

/* Componente que tem a responsabilidade de construir o título de cada seção da tela inicial. */
const SectionTitleInitialScreen = ({ title }) => (
  <SectionTitleContainer>
    <div
      style={{
        display: "flex",
        "justify-content": "space-between",
        "padding-right": "0.4em",
      }}
    >
      <span>{title}</span>
      <ActualMonthAndYear />
    </div>
  </SectionTitleContainer>
);

export default SectionTitleInitialScreen;
