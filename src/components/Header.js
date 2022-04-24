import React from "react";

/* Componente que tem a responsabilidade de ser o header de todas as páginas da aplicação, exceto a de login */
const Header = () => (
  <header>
    <div>
      <img
        className="responsive-img"
        src={require("../images/header.png")}
        alt="Foto de família contando dinheiro"
      />
    </div>
  </header>
);

export default Header;
