import React from "react";

/**
 * Constrói o cabeçalho de todas as páginas da aplicação, exceto a de login
 * @returns Componente com a imagem de uma família contando dinheiro
 */
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
