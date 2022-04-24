import React from "react";

/* Componente que tem a responsabilidade de exibir uma mensagem de campo obrigatório quando o usuário
deixa de preencher algum campo na tela de login */
const RequiredFieldAlert = () => (
  <div style={{ color: "red" }} role="alert">
    Este campo é obrigatório
  </div>
);

export default RequiredFieldAlert;
