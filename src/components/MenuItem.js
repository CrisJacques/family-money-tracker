import React from "react";
import { Link } from "react-router-dom";

import MenuItemContainer from "../styles/MenuItemContainer";

/* Componente que tem a responsabilidade de ser cada uma das opções do menu lateral, que está presente em todas as páginas da aplicação. */
const MenuItem = ({ name, addressPage, iconName }) => (
  <MenuItemContainer>
    <i className="material-icons">{iconName}</i>
    <Link to={`${addressPage}`} style={{ color: "black" }}>
      {name}
    </Link>
  </MenuItemContainer>
);

export default MenuItem;
