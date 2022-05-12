import React from "react";
import PageTitleContainer from "../styles/PageTitleContainer";
import PageContentSectionContainer from "../styles/PageContentSectionContainer";

/**
 * Tela que irá permitir o cadastro, listagem, edição e exclusão de contas a pagar futuras por parte do administrador do grupo
 * @returns Componente contendo uma explicação de qual será o escopo desta página
 */
const FutureBills = () => (
  <div>
    <PageTitleContainer>Contas a pagar futuras</PageTitleContainer>
    <PageContentSectionContainer>
      <p>
        Esta página irá permitir o cadastro, listagem, edição e exclusão de
        contas a pagar futuras por parte do administrador do grupo. O intuito
        desta funcionalidade é auxiliar o usuário a não esquecer de pagar
        nenhuma conta, permitindo a configuração de lembretes de pagamento.
      </p>
    </PageContentSectionContainer>
  </div>
);

export default FutureBills;
