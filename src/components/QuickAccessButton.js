import React from "react";
import { Link } from "react-router-dom";

import QuickAccessButtonContainer from "../styles/QuickAccessButtonContainer";

/**
 * Constrói os botões de acesso rápido da tela inicial
 * @param {String} name - Texto do botão
 * @param {String} addressPage - Endereço para o qual o usuário deve ser redirecionado quando clicar no botão
 * @param {String} iconName - Nome do ícone do Materialize CSS que ilustra o botão
 * @returns Componente que é um botão com ícone grande apontando para alguma página específica da aplicação
 */
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
