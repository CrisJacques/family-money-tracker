import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/* Tela que irá permitir o acesso ao tutorial com orientações de como utilizar o sistema */
const Help = () => (
  <div>
    <PageTitleContainer>Ajuda e feedback</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir o acesso ao tutorial com orientações de como
        utilizar o sistema. O administrador do grupo também poderá enviar
        feedbacks ao desenvolvedor da ferramenta através desta página.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default Help;
