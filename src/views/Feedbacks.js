import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/**
 * Tela que irá permitir ao administrador do sistema ler e responder aos feedbacks dos administradores de grupos
 * @returns Componente contendo uma explicação de qual será o escopo desta página
 */
const Feedbacks = () => (
  <div>
    <PageTitleContainer>Feedbacks</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir ao administrador do sistema ler e responder aos
        feedbacks dos administradores de grupos.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default Feedbacks;
