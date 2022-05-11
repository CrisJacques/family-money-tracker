import React from "react";

/**
 * Constrói uma mensagem de campo obrigatório na tela de login
 * @returns Componente que avisa ao usuário que algum campo obrigatório deixou de ser preenchido na tela de login, exibido logo abaixo do campo vazio
 */
const RequiredFieldAlert = () => (
  <div style={{ color: "red" }} role="alert">
    Este campo é obrigatório
  </div>
);

export default RequiredFieldAlert;
