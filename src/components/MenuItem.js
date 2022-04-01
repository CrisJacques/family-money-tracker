import React from "react";
import { Link } from "react-router-dom"

export const MenuItem = ({ name, addressPage }) => (
    <li>
        <Link to={ `${addressPage}` }>{ name }</Link>
    </li>
);