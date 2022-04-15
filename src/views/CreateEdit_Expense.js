import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

export const CreateEdit_Expense = () => (
  <div>
    <PageTitleContainer>Despesas</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir o cadastro (e posteriormente listagem e edição)
        de despesas. Todos os perfis de usuário poderão acessar esta página.
      </p>
    </PageContentSectionContainer>
  </div>
);