import React from "react";

import ActualMonthAndYear from "../components/ActualMonthAndYear";

import SectionTitleContainer from "../styles/SectionTitleContainer";

/**
 * Constrói o cabeçalho de cada uma das seções da tela inicial
 * @param {String} title - Texto do título da seção
 * @returns Componente que contém o título da seção e o mês e ano atual
 */
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
