import React from "react";
import { Link } from "react-router-dom";

import QuickAccessButtonContainer from "../styles/QuickAccessButtonContainer";

/* Componente que tem a responsabilidade de construir botões de acesso rápido, que contém ícones grandes e ficam na tela inicial da aplicação */
const QuickAccessButton = ({ name, addressPage, iconName }) => (
  <QuickAccessButtonContainer>
    <Link to={`${addressPage}`} style={{ color: "black" }}>
      <i className="medium material-icons" style={{ display: "block" }}>
        {iconName}
      </i>
      {name}
    </Link>
  </QuickAccessButtonContainer>
);

export default QuickAccessButton;
