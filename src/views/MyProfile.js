import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/* Tela que irá permitir o acesso e gerenciamento das informações do usuário que está logado no sistema */
const MyProfile = () => (
  <div>
    <PageTitleContainer>Meu perfil</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir o acesso e gerenciamento das informações do
        usuário que está logado no sistema.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default MyProfile;
