import React from "react";
import { ToastContainer } from 'react-toastify';

import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

const Welcome = () => (
  <div>
    <PageTitleContainer>Início</PageTitleContainer>
    <ToastContainer />
    <PageContentSectionContainer>
      <p>
        Esta página irá exibir a tela de boas vindas do sistema, contendo um
        resumo de algumas informações relevantes sobre as transações recentes
        feitas pelo grupo. Esta tela estará disponível a todos os perfis de
        usuário do sistema.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default Welcome;