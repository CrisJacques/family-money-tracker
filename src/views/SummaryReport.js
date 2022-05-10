import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/* Tela que irá exibir o relatório de resumo de despesas e receitas para um período selecionado pelo usuário */
const SummaryReport = () => (
  <div>
    <PageTitleContainer>Relatório de Resumo</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá exibir o relatório de resumo de despesas e receitas para
        um período selecionado pelo usuário. Esta página estará disponível para
        usuários comuns e administradores de grupo.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default SummaryReport;
