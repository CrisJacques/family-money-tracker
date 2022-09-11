import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/**
 * Tela que irá permitir a listagem, edição e remoção de despesas
 * @returns Componente contendo uma explicação de qual será o escopo desta página
 */
const ExpensesList = () => (
  <div>
    <PageTitleContainer>Lista de Despesas</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir a listagem, edição e remoção de despesas.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default ExpensesList;
