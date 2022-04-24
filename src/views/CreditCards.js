import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/* Tela que irá permitir o cadastro, listagem, edição e exclusão de cartões de crédito por parte do administrador do grupo */
const CreditCards = () => (
  <div>
    <PageTitleContainer>Cartões de Crédito</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir o cadastro, listagem, edição e exclusão de
        cartões de crédito por parte do administrador do grupo. Estes cartões de
        crédito estarão disponíveis como forma de pagamento no formulário de
        cadastro de despesas.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default CreditCards;
