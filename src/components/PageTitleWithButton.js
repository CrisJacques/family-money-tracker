import React from "react";
import { Link } from "react-router-dom";

import PrimaryButtonTitleContainer from "../styles/PrimaryButtonTitleContainer";
import PageTitleContainerInline from "../styles/PageTitleContainerInline";

/**
 * Constrói um cabeçalho de página com um título e um botão
 * @param {String} title - Título da página
 * @param {String} buttonName - Nome do botão
 * @param {String} addressPage - Página para onde o usuário deve ser redirecionado
 * @returns Componente que exibe um título e um botão ao lado
 */
const PageTitleWithButton = ({ title, buttonName, addressPage }) => (
  <div
    style={{
      display: "flex",
      "justify-content": "space-between",
    }}
  >
    <PageTitleContainerInline>{title}</PageTitleContainerInline>
    <PrimaryButtonTitleContainer>
      <Link to={`/${addressPage}`} style={{ color: "white" }}>
        <b>{buttonName}</b>
      </Link>
    </PrimaryButtonTitleContainer>
  </div>
);

export default PageTitleWithButton;
