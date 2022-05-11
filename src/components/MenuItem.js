import React from "react";
import { Link } from "react-router-dom";

import MenuItemContainer from "../styles/MenuItemContainer";

/**
 * Constrói cada item do menu lateral, que está sempre visível em todas as páginas da aplicação, exceto na tela de login
 * @param {String} name - Texto da opção do menu
 * @param {String} addressPage - Endereço para onde o usuário será redirecionado quando clicar na opção
 * @param {String} iconName - Nome do ícone do Materialize CSS que será usado para ilustrar a opção
 * @returns Componente estilizado que é um link para alguma página da aplicação
 */
const MenuItem = ({ name, addressPage, iconName }) => (
  <MenuItemContainer>
    <i className="material-icons">{iconName}</i>
    <Link to={`${addressPage}`} style={{ color: "black" }}>
      {name}
    </Link>
  </MenuItemContainer>
);

export default MenuItem;
