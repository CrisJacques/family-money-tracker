import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

export const SummaryReport = () => (
  <div>
    <PageTitleContainer>Relatório de Resumo</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá exibir o relatório de resumo de despesas e receitas para
        um período selecionado pelo usuário. Esta página estará disponível para
        todos os perfis de usuário do sistema.
      </p>
    </PageContentSectionContainer>
  </div>
);