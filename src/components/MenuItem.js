import React from "react";
import { Link } from "react-router-dom"

import MenuItemContainer from '../styles/MenuItemContainer'

export const MenuItem = ({ name, addressPage, iconName }) => (
    <MenuItemContainer>
        <i className="material-icons">{iconName}</i>
        <Link to={ `${addressPage}` } style={{ color: 'black' }}>{ name }</Link>
    </MenuItemContainer>
);
