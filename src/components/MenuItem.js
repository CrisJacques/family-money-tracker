import React from "react";
import { Link } from "react-router-dom"
import styled from 'styled-components';

export const MenuItem = ({ name, addressPage, iconName }) => (
    <MenuItemContainer>
        <i className="material-icons">{iconName}</i>
        <Link to={ `${addressPage}` } style={{ color: 'black' }}>{ name }</Link>
    </MenuItemContainer>
);

const MenuItemContainer = styled.div`
    display: grid;
    grid-template-columns: 0.2fr 2fr;
    margin: 0.1rem;
`