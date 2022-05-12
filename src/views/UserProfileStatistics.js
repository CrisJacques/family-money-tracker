import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/**
 * Tela que irá permitir a visualização de relatórios de estatísticas de perfil dos usuários (idade, profissão, sexo, escolaridade) por parte do admninistrador do sistema
 * @returns Componente contendo uma explicação de qual será o escopo desta página
 */
const UserProfileStatistics = () => (
  <div>
    <PageTitleContainer>Perfil dos usuários</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir a visualização de relatórios de estatísticas de
        perfil dos usuários (idade, profissão, sexo, escolaridade) por parte do
        admninistrador do sistema.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default UserProfileStatistics;
