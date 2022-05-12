import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/**
 * Tela que irá permitir a visualização de relatórios de engajamento dos usuários por parte do administrador do sistema
 * @returns Componente contendo uma explicação de qual será o escopo desta página
 */
const UserEngagementReport = () => (
  <div>
    <PageTitleContainer>Engajamento dos usuários</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir a visualização de relatórios de engajamento dos
        usuários por parte do administrador do sistema (quantidade de grupos e
        usuários cadastrados).
      </p>
    </PageContentSectionContainer>
  </div>
);

export default UserEngagementReport;
