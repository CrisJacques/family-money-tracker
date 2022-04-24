import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/* Tela que irá permitir o cadastro, listagem, edição e exclusão de itens recorrentes (despesas e receitas que se repetem todo mês) */
const RecurringItems = () => (
  <div>
    <PageTitleContainer>Itens recorrentes</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir o cadastro, listagem, edição e exclusão de
        itens recorrentes (despesas e receitas que se repetem todo mês). O
        cadastro e listagem destes itens será permitido a todos os perfis de
        usuário, mas edição e exclusão só será permitida ao administrador do
        grupo.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default RecurringItems;
