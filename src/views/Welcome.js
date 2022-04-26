import React from "react";

import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/* Tela inicial da aplicação */
const Welcome = ({ userName, userProfile, groupName }) => (
  <div>
    <PageContentSectionContainer>
      <h4>Boa tarde, {userName}!</h4>
      <p>
        Perfil: {userProfile} | Nome do grupo: {groupName}
      </p>
    </PageContentSectionContainer>
  </div>
);

export default Welcome;
