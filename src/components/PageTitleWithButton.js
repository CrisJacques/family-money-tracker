import React from "react";

import PrimaryButtonTitleContainer from "../styles/PrimaryButtonTitleContainer";
import PageTitleContainerInline from "../styles/PageTitleContainerInline";

/**
 * Constrói um cabeçalho de página com um título e um botão
 * @param {String} title - Título da página
 * @param {String} buttonName - Nome do botão
 * @returns Componente que exibe um título e um botão ao lado
 */
const PageTitleWithButton = ({ title, buttonName }) => (
    <div style={{
      display: "flex",
      "justify-content": "space-between"
    }}>
      <PageTitleContainerInline>{title}</PageTitleContainerInline>
      <PrimaryButtonTitleContainer><b>{buttonName}</b></PrimaryButtonTitleContainer>
    </div>
);

export default PageTitleWithButton;
